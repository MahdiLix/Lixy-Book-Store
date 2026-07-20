import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Layout/Header";
import FeedbackMessage from "../components/Ui/FeedbackMessage";
import { registerUser } from "../api/userApi";
import { ui } from "../styles/ui";

export default function UserRegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("error");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      setType("error");
      setMessage("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        username: name.trim(),
        email: email.trim(),
        password,
      });
      navigate("/user/login", { replace: true });
    } catch (err) {
      setType("error");
      setMessage(err.message || "Registration Failed!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={ui.page}>
      <Header />
      <div className={ui.pageTopSpace}>
        <div className={ui.container}>
          <div className="flex min-h-[calc(100vh-7rem)] items-center justify-center">
            <div className="w-full max-w-md">
              <h1 className={`${ui.sectionTitle} mb-6 text-center text-2xl`}>
                Create Account
              </h1>

              <form
                onSubmit={handleSubmit}
                className={`${ui.card} ${ui.cardBody} flex flex-col gap-4`}
              >
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={ui.input}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={ui.input}
                    placeholder="user@example.com"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={ui.input}
                    placeholder="******"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={ui.primaryBtn}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </form>

              <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
                Already have an account?{" "}
                <Link
                  to="/user/login"
                  className="text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>

          <div className="mx-auto mt-4 w-full max-w-md">
            <FeedbackMessage message={message} type={type} />
          </div>
        </div>
      </div>
    </main>
  );
}
