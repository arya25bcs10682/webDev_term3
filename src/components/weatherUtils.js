// conversion code
export function toF(c) {
  return Math.round((c * 9) / 5 + 32);
}

// temp display
export function displayTemp(tempC, unit) {
  return unit === "C" ? `${tempC}°C` : `${toF(tempC)}°F`;
}

// localStorage
export function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem("weather_history") || "[]");
  } catch {
    return [];
  }
}

// 5 city history
export function saveToHistory(cityName) {
  const prev = loadHistory();
  const updated = [
    cityName,
    ...prev.filter((c) => c.toLowerCase() !== cityName.toLowerCase()),
  ].slice(0, 5);
  localStorage.setItem("weather_history", JSON.stringify(updated));
  return updated;
}
