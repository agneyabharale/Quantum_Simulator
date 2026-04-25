import { create } from 'zustand';
import { simulateCircuit } from '../api/simulate';

/**
 * Zustand store for managing the Quantum Circuit state.
 * Handles the gate sequence, simulation results, and UI loading states.
 */
export const useCircuitStore = create((set, get) => ({
  // State: List of gate names (e.g., ["H", "X"])
  gates: [],
  
  // State: Result from the backend simulation
  simulation: null,
  
  // State: UI management
  isLoading: false,
  error: null,
  
  // --- Actions ---
  
  /**
   * Adds a new gate to the circuit and triggers a simulation.
   */
  addGate: async (gateName) => {
    const newGates = [...get().gates, gateName];
    set({ gates: newGates, isLoading: true, error: null });
    
    try {
      const result = await simulateCircuit(newGates);
      set({ simulation: result, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
  
  /**
   * Removes the last gate from the circuit.
   */
  undo: async () => {
    const { gates } = get();
    if (gates.length === 0) return;
    
    const newGates = gates.slice(0, -1);
    set({ gates: newGates, isLoading: true, error: null });
    
    try {
      const result = await simulateCircuit(newGates);
      set({ simulation: result, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
  
  /**
   * Clears the circuit and resets to ground state |0>.
   */
  reset: async () => {
    set({ gates: [], isLoading: true, error: null });
    try {
      // Simulate empty circuit to get |0> state data
      const result = await simulateCircuit([]);
      set({ simulation: result, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
  
  /**
   * Initial fetch to set the starting state.
   */
  initialize: async () => {
    if (get().simulation) return;
    set({ isLoading: true });
    try {
      const result = await simulateCircuit([]);
      set({ simulation: result, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  }
}));
