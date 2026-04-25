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
        last_matrix = simulator.I # Default to identity
        
        # Apply all gates except the last one (to get the start state for the last trajectory)
        for i in range(len(request.gates) - 1):
            state, _ = simulator.apply_gate(state, request.gates[i])
        
        # Capture the starting state for the last gate's trajectory
        start_state_for_last = state.copy()
        
        # Apply the last gate if it exists
        if request.gates:
            last_gate_name = request.gates[-1]
            state, last_matrix = simulator.apply_gate(state, last_gate_name)
            trajectory_data = simulator.get_rotation_trajectory(start_state_for_last, last_gate_name)
        else:
            # If no gates, just return identity trajectory (the pole itself)
            trajectory_data = [simulator.state_to_bloch(state)]

        # Get final metrics
        metrics = simulator.get_metrics(state)
        bloch = simulator.state_to_bloch(state)
        
        return SimulationResponse(
            statevector=[complex_to_list(state[0]), complex_to_list(state[1])],
            probabilities=metrics["probabilities"],
            phases=metrics["phases"],
            bloch=BlochCoords(**bloch),
            trajectory=[BlochCoords(**p) for p in trajectory_data],
            last_gate_matrix=matrix_to_list(last_matrix)
        )
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))