import BooksHeader from "../Books/BooksHeader";
import LoginHeader from "./LoginHeader";

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
      <BooksHeader />
      <LoginHeader />

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