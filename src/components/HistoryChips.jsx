// HistoryChips — shows recent city searches as clickable chips
// Props: history, onSelect
export default function HistoryChips({ history, onSelect }) {
  if (!history.length) return null;

  return (
    <div className="history-chips">
      {history.map((city, i) => (
        <button key={i} className="chip" onClick={() => onSelect(city)}>
          {city}
        </button>
      ))}
    </div>
  );
}
