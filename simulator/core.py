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
        # Identity Matrix (No change)
        self.I = np.array([[1, 0], [0, 1]], dtype=complex)
        
        # Pauli-X (NOT gate): Flips |0⟩ to |1⟩ and vice-versa.
        # Geometrically: 180° rotation around the X-axis.
        self.X = np.array([[0, 1], [1, 0]], dtype=complex)
        
        # Pauli-Y: 180° rotation around the Y-axis.
        self.Y = np.array([[0, -1j], [1j, 0]], dtype=complex)
        
        # Pauli-Z: Flips the phase of |1⟩. 
        # Geometrically: 180° rotation around the Z-axis.
        self.Z = np.array([[1, 0], [0, -1]], dtype=complex)
        
        # --- Common Quantum Gates ---
        # Hadamard Gate (H): Creates superposition.
        # It maps |0⟩ to (|0⟩+|1⟩)/√2 and |1⟩ to (|0⟩-|1⟩)/√2.
        # Geometrically: A 180° rotation around the (X+Z)/√2 axis.
        self.H = (1/np.sqrt(2)) * np.array([[1, 1], [1, -1]], dtype=complex)
        
        # S Gate (Phase gate): 90° rotation around the Z-axis.
        # S = √Z
        self.S = np.array([[1, 0], [0, 1j]], dtype=complex)
        
        # T Gate (π/8 gate): 45° rotation around the Z-axis.
        # T = √S
        self.T = np.array([[1, 0], [0, np.exp(1j * np.pi / 4)]], dtype=complex)
        
        # --- Rotation Gates ---
        def rx(theta):
            return np.array([[np.cos(theta/2), -1j*np.sin(theta/2)],
                           [-1j*np.sin(theta/2), np.cos(theta/2)]], dtype=complex)
        
        def ry(theta):
            return np.array([[np.cos(theta/2), -np.sin(theta/2)],
                           [np.sin(theta/2), np.cos(theta/2)]], dtype=complex)
        
        def rz(theta):
            return np.array([[np.exp(-1j*theta/2), 0],
                           [0, np.exp(1j*theta/2)]], dtype=complex)

        self.RX90 = rx(np.pi/2)
        self.RX_90 = rx(-np.pi/2)
        self.RY90 = ry(np.pi/2)
        self.RY_90 = ry(-np.pi/2)
        self.RZ90 = rz(np.pi/2)
        self.RZ_90 = rz(-np.pi/2)

        # Mapping strings to their matrix representations for easy API access
        self.gate_map = {
            "X": self.X, "Y": self.Y, "Z": self.Z,
            "H": self.H, "S": self.S, "T": self.T,
            "Rx(π/2)": self.RX90, "Rx(-π/2)": self.RX_90,
            "Ry(π/2)": self.RY90, "Ry(-π/2)": self.RY_90,
            "Rz(π/2)": self.RZ90, "Rz(-π/2)": self.RZ_90
        }

    def get_initial_state(self) -> np.ndarray:
        """
        Returns the ground state |0⟩.
        In vector form, this is [1, 0].
        """
        return np.array([1, 0], dtype=complex)

    def apply_gate(self, state: np.ndarray, gate_name: str) -> Tuple[np.ndarray, np.ndarray]:
        """
        Applies a quantum gate to the current state using matrix multiplication.
        Mathematically: |ψ_new⟩ = Matrix * |ψ_old⟩
        
        Args:
            state: Current complex vector [α, β]
            gate_name: Name of the gate to apply (e.g., 'H', 'X')
            
        Returns:
            Tuple of (New state vector, Matrix applied)
        """
        if gate_name not in self.gate_map:
            raise ValueError(f"Gate {gate_name} is not supported in this version.")
            
        matrix = self.gate_map[gate_name]
        
        # Matrix multiplication: U|ψ⟩
        new_state = np.dot(matrix, state)
        
        # Renormalize to fix any floating point precision errors
        norm = np.linalg.norm(new_state)
        return new_state / norm, matrix

    def state_to_bloch(self, state: np.ndarray) -> Dict[str, float]:
        """
        Converts the complex state vector to Cartesian coordinates on the Bloch Sphere.
        
        The Bloch Sphere coordinates (x, y, z) are derived from the expectation
        values of the Pauli operators:
        x = ⟨ψ|X|ψ⟩ = 2 * Real(α* * β)
        y = ⟨ψ|Y|ψ⟩ = 2 * Imag(α* * β)
        z = ⟨ψ|Z|ψ⟩ = |α|² - |β|²
        """
        alpha, beta = state[0], state[1]
        
        # α* is the complex conjugate of α
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
        
        - Probability: P(0) = |α|², P(1) = |β|²
        - Phase: The angle of the complex amplitude (arg(α) and arg(β))
        """
        p0 = np.abs(state[0])**2
        p1 = np.abs(state[1])**2
        
        # Phase angles in radians
        phase0 = np.angle(state[0])
        phase1 = np.angle(state[1])
        
        return {
            "probabilities": {"p0": float(p0), "p1": float(p1)},
            "phases": {"phase0": float(phase0), "phase1": float(phase1)}
        }

    def get_rotation_trajectory(self, start_state: np.ndarray, gate_name: str, steps: int = 30) -> List[Dict[str, float]]:
        """
        Calculates a smooth trajectory between the start and end state for a gate.
        This is used for the 'Glowing Arc' feature.
        
        It works by calculating the fractional power of the gate matrix (U^t) 
        where t goes from 0 to 1.
        """
        matrix = self.gate_map[gate_name]
        
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
