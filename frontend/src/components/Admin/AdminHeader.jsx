export default function AdminHeader({ onLogout }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h2>Admin Dashboard</h2>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}