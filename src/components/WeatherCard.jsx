import { WEATHER_ICONS } from "./weatherConstants";
import { displayTemp } from "./weatherUtils";

export default function WeatherCard({ weather, unit, onToggleUnit }) {

  return (
    <div className="weather-card">

      {/* city + icon */}
      <div className="card-top">
        <div>
          <div className="city-name">{weather.city}</div>
          <div className="country-badge">{weather.country}</div>
        </div>
        <div>
          {weather.icon ? (
            <img
              className="openweather-icon"
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.condition}
            />
          ) : (
            <div className="weather-emoji">
              {WEATHER_ICONS[weather.condition] || WEATHER_ICONS.default}
            </div>
          )}
        </div>
      </div>

      {/* temperature */}
      <div className="temp-row">
        <div className="temp-big">{displayTemp(weather.tempC, unit)}</div>
      </div>
      <div className="feels-like">Feels like {displayTemp(weather.feelsLikeC, unit)}</div>
      <div className="condition-text">{weather.description}</div>

      <div className="divider"></div>

      {/* humidity + wind + visibility*/}
      <div className="stats-row">
      <div className="stat-box">
        <div className="stat-label">💧 Humidity</div>
        <div className="stat-value">{weather.humidity}%</div>
      </div>
      <div className="stat-box">
        <div className="stat-label">💨 Wind Speed</div>
        <div className="stat-value">{weather.wind} m/s</div>
      </div>
      <div className="stat-box"> 
        {/* maximum 10km hi allowed hai in this api 😭😭😭 */}
        <div className="stat-label">👁️ Visibility</div>
        <div className="stat-value">{weather.visibility} km</div>
      </div>
    </div>

      {/* toogle temp */}
      <button className="toggle-btn" onClick={onToggleUnit}>
        Switch to °{unit === "C" ? "F" : "C"} — Currently showing °{unit}
      </button>

    </div>
  );
}
