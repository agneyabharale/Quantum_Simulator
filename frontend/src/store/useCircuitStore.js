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

  // State: For Step-through mode
  currentStep: -1, 

  // State: For Ghost Arrow preview
  previewGate: null,
  previewSimulation: null,
  
  // --- Actions ---
  
  setPreviewGate: async (gateName) => {
    if (!gateName) {
      set({ previewGate: null, previewSimulation: null });
      return;
    }
    
    set({ previewGate: gateName });
    const { gates } = get();
    try {
      const result = await simulateCircuit([...gates, gateName]);
      // Race condition fix: only set if we are still hovering over THIS gate
      if (get().previewGate === gateName) {
        set({ previewSimulation: result });
      }
    } catch (err) {
      console.error("Preview failed", err);
    }
  },
  
  /**
   * Adds a new gate to the circuit and triggers a simulation.
   */
  addGate: async (gateName) => {
    const newGates = [...get().gates, gateName];
    set({ gates: newGates, isLoading: true, error: null, currentStep: -1 });
    
    try {
      const result = await simulateCircuit(newGates);
      set({ simulation: result, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  setCurrentStep: (step) => {
    set({ currentStep: step });
  },

  nextStep: () => {
    const { gates, currentStep } = get();
    if (currentStep < gates.length - 1) {
      set({ currentStep: currentStep + 1 });
    }
  },

  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > -1) {
      set({ currentStep: currentStep - 1 });
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
