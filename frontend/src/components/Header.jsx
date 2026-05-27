export default function Header({ title = "Book Library", onLogout }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h2>{title}</h2>
      {onLogout && <button onClick={onLogout}>Logout</button>}
    </div>
  );
}