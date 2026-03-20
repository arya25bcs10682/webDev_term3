import { useRef } from "react";

// SearchBar — controlled input + search button
// Props: city, setCity, onSearch, history, showHistory, setShowHistory, onHistorySelect
export default function SearchBar({
  city,
  setCity,
  onSearch,
  history,
  showHistory,
  setShowHistory,
  onHistorySelect,
}) {
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSearch();
  };

  const handleChange = (e) => {
    setCity(e.target.value);
    setShowHistory(e.target.value === "" && history.length > 0);
  };

  const handleFocus = () => {
    setShowHistory(city === "" && history.length > 0);
  };

  const handleBlur = () => {
    // Small delay so onMouseDown on history items fires first
    setTimeout(() => setShowHistory(false), 150);
  };

  return (
    <div>
      {/* Input + Button Row */}
      <div className="search-wrap">
        <input
          ref={inputRef}
          className="search-input"
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
        <button className="search-btn" onClick={onSearch}>
          Search
        </button>
      </div>

      {/* Dropdown History */}
      {showHistory && history.length > 0 && (
        <div className="history-list">
          <div className="history-header">Recent Searches</div>
          {history.map((c, i) => (
            <div
              key={i}
              className="history-item"
              onMouseDown={() => onHistorySelect(c)}
            >
              🕐 {c}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
