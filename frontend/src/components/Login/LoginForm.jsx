import { ui } from "../../styles/ui";

export default function LoginForm({
  email,
  password,
  setEmail,
  setPassword,
  onSubmit,
  loading,
}) {
  return (
    <div className="w-full max-w-md">
      <div className={ui.card}>
        <div className={ui.cardBody}>
          <h1 className={ui.sectionTitle}>Admin Login</h1>
          <p className={ui.sectionSub}>Login to manage books.</p>

          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
            <input
              className={ui.input}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className={ui.input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className={ui.primaryBtn} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}