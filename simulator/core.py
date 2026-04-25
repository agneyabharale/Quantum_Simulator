import numpy as np
from typing import List, Tuple, Dict, Any

class QuantumCore:
    """
    Pure NumPy implementation of a single-qubit simulator.
    Designed for pedagogy: every operation is mapped to its matrix counterpart.
    
    A qubit state is represented as a complex vector: |ψ⟩ = α|0⟩ + β|1⟩
    where α and β are complex numbers satisfying |α|² + |β|² = 1.
    """
    
    def __init__(self):
        # --- Standard Basis Matrices (Pauli Matrices) ---
        self.I = np.array([[1, 0], [0, 1]], dtype=complex)
        self.X = np.array([[0, 1], [1, 0]], dtype=complex)
        self.Y = np.array([[0, -1j], [1j, 0]], dtype=complex)
        self.Z = np.array([[1, 0], [0, -1]], dtype=complex)
        self.H = (1/np.sqrt(2)) * np.array([[1, 1], [1, -1]], dtype=complex)
        self.S = np.array([[1, 0], [0, 1j]], dtype=complex)
        self.T = np.array([[1, 0], [0, np.exp(1j * np.pi / 4)]], dtype=complex)
        
        # Mapping strings to their matrix representations
        self.gate_map = {
            "X": self.X, "Y": self.Y, "Z": self.Z,
            "H": self.H, "S": self.S, "T": self.T
        }

    def get_initial_state(self) -> np.ndarray:
        """Returns the ground state |0> = [[1], [0]]"""
        return np.array([[1], [0]], dtype=complex)

    def rx(self, theta):
        return np.array([[np.cos(theta/2), -1j*np.sin(theta/2)],
                       [-1j*np.sin(theta/2), np.cos(theta/2)]], dtype=complex)
    
    def ry(self, theta):
        return np.array([[np.cos(theta/2), -np.sin(theta/2)],
                       [np.sin(theta/2), np.cos(theta/2)]], dtype=complex)
    
    def rz(self, theta):
        return np.array([[np.exp(-1j*theta/2), 0],
                       [0, np.exp(1j*theta/2)]], dtype=complex)

    def get_gate_matrix(self, gate_name: str) -> np.ndarray:
        """Helper to get the matrix for a gate name, including parameterized ones."""
        # Check for parameterized gates: Rx(1.5), Ry(3.14), etc.
        if '(' in gate_name and ')' in gate_name:
            try:
                base_gate = gate_name.split('(')[0]
                theta_str = gate_name.split('(')[1].replace(')', '')
                theta = float(theta_str)
                if base_gate == 'Rx': return self.rx(theta)
                elif base_gate == 'Ry': return self.ry(theta)
                elif base_gate == 'Rz': return self.rz(theta)
            except (ValueError, IndexError):
                pass

        # Special mappings for UI-friendly names
        specials = {
            "Rx(π/2)": self.rx(np.pi/2), "Rx(-π/2)": self.rx(-np.pi/2),
            "Ry(π/2)": self.ry(np.pi/2), "Ry(-π/2)": self.ry(-np.pi/2),
            "Rz(π/2)": self.rz(np.pi/2), "Rz(-π/2)": self.rz(-np.pi/2)
        }
        if gate_name in specials:
            return specials[gate_name]

        if gate_name not in self.gate_map:
            raise ValueError(f"Gate {gate_name} is not supported.")
        
        return self.gate_map[gate_name]

    def apply_gate(self, state: np.ndarray, gate_name: str) -> Tuple[np.ndarray, np.ndarray]:
        """
        Applies a quantum gate to the current state using matrix multiplication.
        """
        matrix = self.get_gate_matrix(gate_name)
        
        # Matrix multiplication: U|ψ⟩
        new_state = np.dot(matrix, state)
        
        # Renormalize to fix any floating point precision errors
        norm = np.linalg.norm(new_state)
        return new_state / norm, matrix

    def state_to_bloch(self, state: np.ndarray) -> Dict[str, float]:
        """
        Converts the complex state vector to Cartesian coordinates on the Bloch Sphere.
        """
        s = state.flatten()
        alpha, beta = s[0], s[1]
        alpha_conj = np.conj(alpha)
        
        x = 2 * np.real(alpha_conj * beta)
        y = 2 * np.imag(alpha_conj * beta)
        z = np.abs(alpha)**2 - np.abs(beta)**2
        
        return {
            "x": float(np.round(x, 10)),
            "y": float(np.round(y, 10)),
            "z": float(np.round(z, 10))
        }

    def get_metrics(self, state: np.ndarray) -> Dict[str, Any]:
        """
        Computes probabilities and phase information for UI bars and rings.
        """
        s = state.flatten()
        p0 = np.abs(s[0])**2
        p1 = np.abs(s[1])**2
        phase0 = np.angle(s[0])
        phase1 = np.angle(s[1])
        
        return {
            "probabilities": {"p0": float(p0), "p1": float(p1)},
            "phases": {"phase0": float(phase0), "phase1": float(phase1)}
        }

    def get_rotation_trajectory(self, start_state: np.ndarray, gate_name: str, steps: int = 30) -> List[Dict[str, float]]:
        """
        Calculates a smooth trajectory between the start and end state for a gate.
        """
        matrix = self.get_gate_matrix(gate_name)
        
        # Eigendecomposition: U = V * D * V⁻¹
        # Then U^t = V * D^t * V⁻¹
        evals, evecs = np.linalg.eig(matrix)
        inv_evecs = np.linalg.inv(evecs)
        
        trajectory = []
        for i in range(steps + 1):
            t = i / steps
            # Raise the diagonal matrix of eigenvalues to the power of t
            d_t = np.diag(evals**t)
            # Reconstruct the fractional matrix
            frac_matrix = evecs @ d_t @ inv_evecs
            
            # Apply fractional rotation to start state
            inter_state = np.dot(frac_matrix, start_state)
            trajectory.append(self.state_to_bloch(inter_state))
            
        return trajectory
