import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import LoginForm from "../components/Login/LoginForm";
import FeedbackMessage from "../components/Shared/FeedbackMessage";
import { loginAdmin } from "../api/authApi";
import { isLoggedIn, saveAuthToken } from "../utils/auth";
import { ui } from "../styles/ui";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("error");
  const [loading, setLoading] = useState(false);

  if (isLoggedIn()) {
    return <Navigate to="/admin/books" replace />;
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
      const data = await loginAdmin({ email: email.trim(), password });
      saveAuthToken(data.token);
      navigate("/admin/books", { replace: true });
    } catch {
      setType("error");
      setMessage("Login Failed!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={ui.page}>
      {/* redirect to HomePage */}
      <Header subtitle="Admin Login" logoutRedirectTo="/" />
      <div className={ui.pageTopSpace}>
        <div className={ui.container}>
          <div className="flex min-h-[calc(100vh-7rem)] items-center justify-center">
            <LoginForm
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </div>

          <div className="mx-auto mt-4 w-full max-w-md">
            <FeedbackMessage message={message} type={type} />
          </div>
        </div>
      </div>
    </main>
  );
}
