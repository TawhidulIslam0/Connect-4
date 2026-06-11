# Connect 4: Intelligent AI Edition

A modern, interactive version of the classic Connect 4 game, built with React, featuring a responsive UI and an adaptive Reinforcement Learning AI.

## 🚀 Features
* **Adaptive AI Engine:** Uses TensorFlow.js for real-time reinforcement learning. Unlike static bots, this AI adjusts its strategy based on the specific patterns of the human player during the match.
* **Pro UI/UX:** An arcade-inspired interface with CSS grid, dynamic turn labels, and responsive feedback.
* **Game Modes:** * **Player vs Player (PvP):** Local multiplayer with clear turn-based messaging.
    * **Player vs AI (PvAI):** Challenge an adaptive opponent that learns as you play.
* **Robust Game Rules:** Full win and draw detection, with automated game reset flows.

## 🧠 The AI Engine: How it Learns
The AI core is built using a **Deep Neural Network** architecture designed for **Online Reinforcement Learning**.

1. **Inference:** At every turn, the current board state is mapped to a 42-element vector (representing the grid). The model uses a `softmax` activation to predict the best possible column to play.
2. **Real-time Training:** Instead of learning only once, the AI employs an **Online Learning** loop. After each turn, the model performs a "fitting" pass (`model.fit`) on its last decision. 
3. **Reward/Punishment:** The model is trained to minimize the loss against the objective of capturing a win, allowing it to "feel" which sequences of moves lead to better outcomes.
4. **Hybrid Logic:** To ensure the game remains competitive and "fair," the engine uses a **Priority Override System**. It first checks for immediate wins or blocks using a brute-force rules check, and only defers to the Neural Network's "brain" when no immediate tactical action is forced.



## 🛠 Tech Stack
* **Frontend:** React (Vite), JavaScript, CSS3
* **AI Logic:** TensorFlow.js
* **Build System:** Vite

## 🕹 How to Play
1. **Clone the repo:** `git clone [your-repo-url]`
2. **Install:** `npm install`
3. **Start:** `npm run dev`
4. **Select Mode:** Choose between local PvP or challenging the adaptive AI from the menu.

