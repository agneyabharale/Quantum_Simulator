# ⚛️ Quantum Circuit Simulator + Bloch Sphere Visualizer

An interactive, from-scratch quantum computing simulator that combines **mathematical transparency** with **3D visualization**.

---

## 🚀 What This Project Does

* Simulates **single-qubit quantum circuits**
* Applies quantum gates step-by-step
* Visualizes qubit state on a **3D Bloch sphere**
* Shows:

  * State vector (α, β)
  * Measurement probabilities
  * Real-time state evolution

---

## 🧠 Core Idea

A qubit is represented as:

|ψ⟩ = α|0⟩ + β|1⟩

* Quantum gates are **2×2 matrices**
* State evolves via **matrix multiplication**
* Each gate = **rotation on Bloch sphere**

👉 This project makes that evolution **visible and intuitive**

---

## 🏗️ Tech Stack

* **Backend:** FastAPI + NumPy
* **Frontend:** React (Vite)
* **3D Rendering:** React Three Fiber + Drei
* **State Management:** Zustand
* **Validation (optional):** Qiskit

---

## 📁 Project Structure

```
quantum_simulator/
│
├── backend/
│   ├── main.py
│   ├── simulator.py
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── store/
│   │   ├── api/
│   │   ├── App.jsx
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 🔹 Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install fastapi uvicorn numpy
uvicorn main:app --reload
```

Open:
👉 http://127.0.0.1:8000/docs

---

### 🔹 Frontend

```bash
cd frontend
npm install
npm run dev
```

Open:
👉 http://localhost:5173

---

## 🔗 API Endpoint

### POST `/simulate`

**Input:**

```json
{
  "gates": ["H", "X"]
}
```

**Output:**

```json
{
  "statevector": [...],
  "probabilities": {
    "p0": 0.5,
    "p1": 0.5
  },
  "bloch": {
    "x": 1,
    "y": 0,
    "z": 0
  }
}
```

---

## 👥 Team Roles

* **Core Logic & Integration:** Backend + Bloch sphere + debugging
* **UI Development:** Buttons, layout, styling
* **API Integration:** Connect frontend to backend
* **Testing & Documentation:** Validation, examples, demo prep

---

## 🎯 Features

* Step-by-step gate application
* Real-time Bloch sphere visualization
* Matrix-based simulation (no black-box libraries)
* Probability + phase understanding

---

## ⚡ MVP (Must Have)

* Apply gates
* Show Bloch sphere
* Display probabilities
* Backend ↔ frontend integration

---

## 🔮 Future Improvements

* Multi-qubit support (CNOT, entanglement)
* Noise simulation
* Qiskit comparison mode
* Circuit sharing

---

## 🧠 Why This Project?

Most tools either:

* Show results ❌
* Or show math ❌

👉 This project combines:
**Visualization + Math + Interactivity**

---

## 🏁 Final Goal

To transform quantum computing from abstract equations into a **visual, interactive learning experience**.

---
