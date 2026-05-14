const API_BASE_URL = 'http://localhost:8000';

/**
 * Sends a list of gates to the backend for simulation.
 * Returns the statevector, probabilities, bloch coords, and trajectory.
 */
export const simulateCircuit = async (gates, initialAngles = null) => {
  try {
    const response = await fetch(`${API_BASE_URL}/simulate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        gates,
        initial_angles: initialAngles 
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Simulation failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
