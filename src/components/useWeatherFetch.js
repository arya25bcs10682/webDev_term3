import { useState, useEffect } from "react";
import { API_KEY } from "./weatherConstants";
import { saveToHistory } from "./weatherUtils";

// fetching
export function useWeatherFetch(query, setHistory) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query) return;

    const controller = new AbortController();

    async function fetchWeather() {
      setLoading(true);
      setError("");
      setWeather(null);

      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&appid=${API_KEY}&units=metric`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          if (res.status === 404) throw new Error("City not found. Check the spelling and try again.");
          if (res.status === 401) throw new Error("Invalid API key. Please replace YOUR_OPENWEATHERMAP_API_KEY.");
          throw new Error("Something went wrong. Please try again.");
        }

        const data = await res.json();

        const result = {
        city: data.name,
        country: data.sys.country,
        tempC: Math.round(data.main.temp),
        feelsLikeC: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        wind: data.wind.speed,
        visibility: (data.visibility / 1000).toFixed(1), // API gives metres, convert to km
        condition: data.weather[0].main,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      };

        setWeather(result);

        // saving to history
        const updated = saveToHistory(result.city);
        setHistory(updated);

      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
    return () => controller.abort();

  }, [query]);

  return { weather, loading, error };
}
