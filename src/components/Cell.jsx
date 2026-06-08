// src/components/Cell.jsx
export default function Cell({ value, onClick }) {
  return (
    <div 
      className={`cell ${value || ''}`} 
      onClick={onClick}
    />
  );
}