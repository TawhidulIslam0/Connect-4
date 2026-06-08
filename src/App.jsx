import { useState, useEffect } from 'react';
import Board from './components/Board';
import { getAvailableRow, checkWin } from './logic/gameRules';
import { getBestMove } from './logic/aiEngine';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(6).fill(null).map(() => Array(7).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('red');
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [mode, setMode] = useState(null);
  const [gameState, setGameState] = useState('menu');

  // AI Turn Logic
  useEffect(() => {
    if (gameState === 'playing' && mode === 'PvAI' && currentPlayer === 'yellow' && !winner && !isDraw) {
      const timer = setTimeout(() => {
        const bestCol = getBestMove(board, 'yellow');
        handleColumnClick(bestCol);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameState, mode, winner, isDraw, board]);

  const handleColumnClick = (colIndex) => {
    if (winner || isDraw) return;

    const row = getAvailableRow(board, colIndex);
    if (row === -1) return;

    const newBoard = board.map((r) => [...r]);
    newBoard[row][colIndex] = currentPlayer;
    setBoard(newBoard);

    if (checkWin(newBoard, row, colIndex, currentPlayer)) {
      setWinner(currentPlayer);
    } else if (newBoard.flat().every(cell => cell !== null)) {
      setIsDraw(true);
      setTimeout(() => {
        resetGame();
        setGameState('menu');
        setIsDraw(false);
      }, 2000);
    } else {
      setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red');
    }
  };

  const resetGame = () => {
    setBoard(Array(6).fill(null).map(() => Array(7).fill(null)));
    setCurrentPlayer('red');
    setWinner(null);
    setIsDraw(false);
  };

  // Helper to determine labels
  const getDisplayStatus = () => {
    if (winner) {
      const playerLabel = mode === 'PvP' ? (winner === 'red' ? 'Player 1' : 'Player 2') : (winner === 'red' ? 'You' : 'AI');
      return `Winner: ${playerLabel}!`;
    }
    if (isDraw) return "It's a Draw!";
    
    // Turn Labels
    if (mode === 'PvP') {
      return currentPlayer === 'red' ? "Player 1 (Red) Turn" : "Player 2 (Yellow) Turn";
    } else {
      return currentPlayer === 'red' ? "Your (Red) Turn" : "AI (Yellow) Turn";
    }
  };

  if (gameState === 'menu') {
    return (
      <div className="game-container">
        <h1>Connect 4</h1>
        <div className="controls">
          <button onClick={() => { setMode('PvP'); setGameState('playing'); }}>Player vs Player</button>
          <button onClick={() => { setMode('PvAI'); setGameState('playing'); }}>Player vs AI</button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <h1>{getDisplayStatus()}</h1>
      <Board board={board} onColumnClick={handleColumnClick} />
      <div className="controls">
        <button onClick={() => { resetGame(); setGameState('menu'); }}>Back to Menu</button>
        <button onClick={resetGame}>Restart Game</button>
      </div>
    </div>
  );
}

export default App;