from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class SimulationRequest(BaseModel):
    gates: List[str]

class BlochCoords(BaseModel):
    x: float
    y: float
    z: float

class StepResult(BaseModel):
    gate: str
    statevector: List[List[float]]
    bloch: BlochCoords
    probabilities: Dict[str, float]
    phases: Dict[str, float]
    trajectory: List[BlochCoords]
    matrix: List[List[List[float]]]
    prev_state: List[List[float]]

class SimulationResponse(BaseModel):
    # Statevector as [[real, imag], [real, imag]]
    statevector: List[List[float]]
    
    # Probabilities p0, p1
    probabilities: Dict[str, float]
    
    # Phases (angles in radians)
    phases: Dict[str, float]
    
    # Final Bloch coordinates
    bloch: BlochCoords
    
    # Trajectory points for the LAST gate applied
    trajectory: List[BlochCoords]
    
    # The matrix representation of the LAST gate applied
    # Format: [[[real, imag], [real, imag]], [[real, imag], [real, imag]]]
    last_gate_matrix: List[List[List[float]]]
    
    # The statevector BEFORE the last gate was applied
    previous_state: Optional[List[List[float]]] = None

    # History of every step in the circuit
    history: List[StepResult]
