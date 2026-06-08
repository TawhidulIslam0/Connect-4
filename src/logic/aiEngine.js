import * as tf from '@tensorflow/tfjs';
import { getAvailableRow, checkWin } from './gameRules';

const model = tf.sequential({
  layers: [
    tf.layers.dense({ inputShape: [42], units: 64, activation: 'relu' }),
    tf.layers.dense({ units: 64, activation: 'relu' }),
    tf.layers.dense({ units: 7, activation: 'softmax' })
  ]
});
model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy' });

// Store the previous move so we can "reward" or "punish" it later
let lastState = null;
let lastMove = null;

export const getBestMove = (board, player) => {
  // --- RULE 1 & 2: Instant Win/Block Logic (Keeps it professional) ---
  const opponent = player === 'red' ? 'yellow' : 'red';
  for (let col = 0; col < 7; col++) {
    const row = getAvailableRow(board, col);
    if (row !== -1) {
      let temp = board.map(r => [...r]); temp[row][col] = player;
      if (checkWin(temp, row, col, player)) return col;
    }
  }
  for (let col = 0; col < 7; col++) {
    const row = getAvailableRow(board, col);
    if (row !== -1) {
      let temp = board.map(r => [...r]); temp[row][col] = opponent;
      if (checkWin(temp, row, col, opponent)) return col;
    }
  }

  // --- RULE 3: Inference & Real-time Learning ---
  const flat = board.flat().map(c => (c === player ? 1 : c === null ? 0 : -1));
  
  // If we had a previous state, let's "train" based on what happened next
  if (lastState && lastMove !== null) {
    const target = tf.oneHot([lastMove], 7);
    model.fit(tf.tensor2d([lastState]), target, { epochs: 1, verbose: 0 });
    target.dispose();
  }

  const prediction = model.predict(tf.tensor2d([flat]));
  const probabilities = prediction.dataSync();
  
  let bestCol = -1;
  let maxProb = -Infinity;
  for (let col = 0; col < 7; col++) {
    if (getAvailableRow(board, col) !== -1 && probabilities[col] > maxProb) {
      maxProb = probabilities[col]; bestCol = col;
    }
  }

  lastState = flat;
  lastMove = bestCol;
  
  prediction.dispose();
  return bestCol !== -1 ? bestCol : 3;
};