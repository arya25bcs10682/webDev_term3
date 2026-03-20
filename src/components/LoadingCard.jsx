// LoadingCard — shown while weather data is being fetched
export default function LoadingCard() {
  return (
    <div className="loading-card">
      <div className="spinner"></div>
      Fetching weather data...
    </div>
  );
}
