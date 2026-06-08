import Cell from './Cell';

export default function Board({ board, onColumnClick }) {
  return (
    <div className="board">
      {board.map((row, rIdx) => 
        row.map((cell, cIdx) => (
          <Cell 
            key={`${rIdx}-${cIdx}`} 
            value={cell} 
            onClick={() => onColumnClick(cIdx)} 
          />
        ))
      )}
    </div>
  );
}