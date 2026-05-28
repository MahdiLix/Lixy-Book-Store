import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import LoginForm from "../components/Login/LoginForm";
import ErrorMessage from "../components/Shared/ErrorMessage";
import { loginAdmin } from "../api/authApi";
import { isLoggedIn, saveAuthToken } from "../utils/auth";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // loging controller
  if (isLoggedIn()) {
    return <Navigate to="/admin/books" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Provide Email and Password");
      return;
    }

    try {
      setLoading(true);
      const data = await loginAdmin({
        email: email.trim(),
        password,
      });

      saveAuthToken(data.token);
      navigate("/admin/books", { replace: true });
    } catch {
      setError("Login Failed!");
    } finally {
      setLoading(false);
    }
  }
 
  return (
    <main>
      <LoginForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        onSubmit={handleSubmit}
        loading={loading}
      />
      <ErrorMessage message={error} />
    </main>
  );
}