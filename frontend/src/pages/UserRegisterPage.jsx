import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Layout/Header";
import FeedbackMessage from "../components/ui/FeedbackMessage";
import { registerUser, loginUser } from "../api/userApi";
import { saveAuthToken, saveUserInfo } from "../utils/auth";
import { ui } from "../styles/ui";

export default function UserRegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("error");
  const [loading, setLoading] = useState(false);

  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (isMounted.current) setMessage("");

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      if (isMounted.current) {
        setType("error");
        setMessage("Please fill in all fields");
      }
      return;
    }

    try {
      if (isMounted.current) setLoading(true);

      // Register the user
      await registerUser({
        username: name.trim(),
        email: email.trim(),
        password,
      });

      //  Automatically login the user
      const loginData = await loginUser({ email: email.trim(), password });

      if (loginData.token) {
        saveAuthToken(loginData.token);
      }
      if (loginData.data) {
        saveUserInfo(loginData.data);
      }

      navigate("/", { replace: true });
    } catch (err) {
      if (isMounted.current) {
        setType("error");

        setMessage(
          err.message ||
            "Registration succeeded, but auto-login failed. Please log in manually.",
        );
      }
    } finally {
      if (isMounted.current) setLoading(false);
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
                Create Your Account
              </h1>

              <form
                onSubmit={handleSubmit}
                className={`${ui.card} ${ui.cardBody} flex flex-col gap-4`}
              >
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Username
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={ui.input}
                    placeholder="Jackbavin"
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
                  {loading ? "Creating Account..." : "Register"}
                </button>
              </form>

              <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
                Already have an account?{" "}
                <Link
                  to="/login"
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
