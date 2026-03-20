// ErrorCard — shown when the API returns an error (e.g., city not found)
// Props: message
export default function ErrorCard({ message }) {
  return (
    <div className="error-card">
      <span style={{ fontSize: "1.3rem" }}>⚠️</span>
      {message}
    </div>
  );
}
