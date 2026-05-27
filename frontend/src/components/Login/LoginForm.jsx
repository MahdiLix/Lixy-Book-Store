export default function LoginForm({
  email,
  password,
  setEmail,
  setPassword,
  onSubmit,
  loading,
}) {
  return (
    <div id="adminFormContainer">
      <h2>Welcome to book library!</h2>
      <h3>Please login to your account</h3>

      <form id="adminForm" onSubmit={onSubmit}>
        <input
          type="email"
          id="email"
          placeholder="email *"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          placeholder="password *"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "logging in..." : "login"}
        </button>
      </form>
    </div>
  );
}