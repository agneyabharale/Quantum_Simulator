import sys
import os

# Add project root to sys.path to allow running from any directory
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

try:
    from backend.schemas import SimulationRequest, SimulationResponse, BlochCoords
except ImportError:
    from schemas import SimulationRequest, SimulationResponse, BlochCoords

from simulator.core import QuantumCore
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import numpy as np

app = FastAPI(title="Quantum Simulator API")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the simulator core
simulator = QuantumCore()

def complex_to_list(c: complex) -> list[float]:
    """Helper to convert complex number to [real, imag] list."""
    return [float(c.real), float(c.imag)]

def matrix_to_list(matrix: np.ndarray) -> list[list[list[float]]]:
    """Helper to convert 2x2 complex matrix to nested list format."""
    return [
        [complex_to_list(matrix[0,0]), complex_to_list(matrix[0,1])],
        [complex_to_list(matrix[1,0]), complex_to_list(matrix[1,1])]
    ]

@app.get("/")
def root():
    return {"message": "Quantum Simulator Backend is running"}

@app.post("/simulate", response_model=SimulationResponse)
async def simulate(request: SimulationRequest):
    """
    Simulates a sequence of gates and returns the final state,
    trajectory, and math data for the UI.
    """
    try:
        state = simulator.get_initial_state()
        history = []
        
        # Helper to safely extract complex scalar for complex_to_list
        def to_list(val):
            if hasattr(val, 'item'):
                return complex_to_list(val.item())
            return complex_to_list(val)

        # Initial state (step -1 or step 0?)
        # Let's say history[0] is state after 1st gate
        
        last_matrix = simulator.I
        start_state_for_last = state.copy()
        
        for i, gate_name in enumerate(request.gates):
            prev_state = state.copy()
            state, matrix = simulator.apply_gate(state, gate_name)
            
            # Record this step
            step_metrics = simulator.get_metrics(state)
            step_bloch = simulator.state_to_bloch(state)
            
            # Calculate trajectory for THIS gate
            step_trajectory = simulator.get_rotation_trajectory(prev_state, gate_name)
            
            history.append({
                "gate": gate_name,
                "prev_state": [to_list(prev_state[0]), to_list(prev_state[1])],
                "statevector": [to_list(state[0]), to_list(state[1])],
                "matrix": matrix_to_list(matrix),
                "bloch": step_bloch,
                "probabilities": step_metrics["probabilities"],
                "phases": step_metrics["phases"],
                "trajectory": [BlochCoords(**p) for p in step_trajectory]
            })
            
            if i == len(request.gates) - 1:
                last_matrix = matrix
                start_state_for_last = prev_state

        # Final state data
        metrics = simulator.get_metrics(state)
        bloch = simulator.state_to_bloch(state)
        
        # Trajectory for the last gate
        if request.gates:
            trajectory_data = simulator.get_rotation_trajectory(start_state_for_last, request.gates[-1])
        else:
            trajectory_data = [simulator.state_to_bloch(state)]

        return SimulationResponse(
            statevector=[to_list(state[0]), to_list(state[1])],
            probabilities=metrics["probabilities"],
            phases=metrics["phases"],
            bloch=BlochCoords(**bloch),
            trajectory=[BlochCoords(**p) for p in trajectory_data],
            last_gate_matrix=matrix_to_list(last_matrix),
            previous_state=[to_list(start_state_for_last[0]), to_list(start_state_for_last[1])],
            history=history
        )
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))