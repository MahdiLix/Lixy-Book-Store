import { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import Header from "../components/Layout/Header";
import LoginForm from "../components/Login/LoginForm";
import FeedbackMessage from "../components/Ui/FeedbackMessage";
import { loginUser } from "../api/userApi";
import {
  isLoggedIn,
  saveAuthToken,
  saveUserInfo,
  getUserRole,
} from "../utils/auth";
import { ui } from "../styles/ui";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("error");
  const [loading, setLoading] = useState(false);

  if (isLoggedIn()) {
    const role = getUserRole();
    return (
      <Navigate
        to={role === "admin" || role === "superadmin" ? "/admin/books" : "/"}
        replace
      />
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (!email?.trim() || !password?.trim()) {
      setType("error");
      setMessage("Provide Email and Password");
      return;
    }

    try {
      setLoading(true);
      const loginData = await loginUser({ email: email.trim(), password });

      saveAuthToken(loginData.token);

      if (loginData.data) {
        saveUserInfo(loginData.data);

        // Redirect based on role
        const role = loginData.data.role;
        if (role === "admin" || role === "superadmin") {
          navigate("/admin/books", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      } else {
        throw new Error(
          "Login succeeded but user data is missing from server response.",
        );
      }
    } catch (err) {
      setType("error");
      setMessage(err.message || "Login Failed! Check your credentials.");
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
                Login
              </h1>
              <LoginForm
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
                onSubmit={handleSubmit}
                loading={loading}
              />
              <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
                Don't have an account?{" "}
                <Link
                  to="/user/register"
                  className="text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  Register here
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
