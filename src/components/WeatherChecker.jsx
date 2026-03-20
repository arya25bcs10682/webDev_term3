import { useState } from "react";
import { BG_GRADIENTS } from "./weatherConstants";
import { loadHistory } from "./weatherUtils";
import { useWeatherFetch } from "./useWeatherFetch";

import SearchBar from "./SearchBar";
import HistoryChips from "./HistoryChips";
import LoadingCard from "./LoadingCard";
import ErrorCard from "./ErrorCard";
import WeatherCard from "./WeatherCard";

import "./weather.css";

// manages state
export default function WeatherChecker() {
  const [city, setCity]             = useState("");
  const [query, setQuery]           = useState("");
  const [unit, setUnit]             = useState("C");
  const [history, setHistory]       = useState(loadHistory);
  const [showHistory, setShowHistory] = useState(false);

  // fetch weather
  const { weather, loading, error } = useWeatherFetch(query, setHistory);

  const handleSearch = () => {
    const trimmed = city.trim();
    if (!trimmed) return;
    setQuery(trimmed);
    setShowHistory(false);
  };

  const handleHistorySelect = (selectedCity) => {
    setCity(selectedCity);
    setQuery(selectedCity);
    setShowHistory(false);
  };

  const handleToggleUnit = () => {
    setUnit((u) => (u === "C" ? "F" : "C"));
  };

  // background changes
  const bg = weather
    ? BG_GRADIENTS[weather.condition] || BG_GRADIENTS.default
    : BG_GRADIENTS.default;

  // showing chips
  const showChips = !showHistory && !loading && !weather && !error && history.length > 0;

  return (
    <div className="weather-app-wrapper" style={{ background: bg }}>
      <div className="weather-app">

        <h1 className="title">Weather <br></br> Checker</h1>
        <p className="subtitle">Real-time forecasts for any city worldwide</p>

        <SearchBar
          city={city}
          setCity={setCity}
          onSearch={handleSearch}
          history={history}
          showHistory={showHistory}
          setShowHistory={setShowHistory}
          onHistorySelect={handleHistorySelect}
        />

        {showChips && (
          <HistoryChips history={history} onSelect={handleHistorySelect} />
        )}

        {loading && <LoadingCard />}

        {error && !loading && <ErrorCard message={error} />}

        {weather && !loading && (
          <WeatherCard
            weather={weather}
            unit={unit}
            onToggleUnit={handleToggleUnit}
          />
        )}

      </div>
    </div>
  );
}
