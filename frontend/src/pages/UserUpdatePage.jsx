import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../components/Layout/Header";
import FeedbackMessage from "../components/Ui/FeedbackMessage";
import { updateUserProfile } from "../api/userApi";
import { updateAdminProfile } from "../api/adminApi";
import {
  isLoggedIn,
  getUserInfo,
  getAuthToken,
  saveUserInfo,
  getUserRole,
} from "../utils/auth";
import { ui } from "../styles/ui";

export default function UserUpdatePage() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const currentUser = getUserInfo();
  const role = getUserRole();

  const [username, setUsername] = useState(currentUser?.username || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState("");
  const [type, setType] = useState("error");
  const [loading, setLoading] = useState(false);

  if (!loggedIn) return <Navigate to="/login" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (!username?.trim() || !email?.trim()) {
      setType("error");
      setMessage("Username and Email cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      const token = getAuthToken();
      const userId = currentUser._id || currentUser.id;
      const payload = { username: username.trim(), email: email.trim() };

      // Only include password fields if the user typed something in
      if (currentPassword && newPassword) {
        payload.currentPassword = currentPassword;
        payload.newPassword = newPassword;
      }

      let updatedUserRes;
      if (role === "admin" || role === "superadmin") {
        updatedUserRes = await updateAdminProfile(userId, token, payload);
      } else {
        updatedUserRes = await updateUserProfile(userId, token, payload);
      }

      // Extract the updated user data from standard backend response shapes
      const updatedUserData =
        updatedUserRes.data?.user ||
        updatedUserRes.data ||
        updatedUserRes.user ||
        updatedUserRes;
      saveUserInfo(updatedUserData);

      setType("success");
      setMessage("Account updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setType("error");
      setMessage(
        err.message || "Failed to update account. Check your current password.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={ui.page}>
      <Header />
      <div className={ui.pageTopSpace}>
        <div className={ui.container}>
          <div className="mx-auto max-w-2xl">
            <h1 className={`${ui.sectionTitle} mb-6 text-2xl`}>
              Update Account
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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={ui.input}
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
                />
              </div>

              <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-800">
                <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  Change Password (Optional)
                </p>
                <div className="mb-4">
                  <label className="mb-1 block text-sm text-slate-500 dark:text-slate-400">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className={ui.input}
                    placeholder="******"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-slate-500 dark:text-slate-400">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={ui.input}
                    placeholder="******"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`${ui.primaryBtn} mt-4`}
              >
                {loading ? "Updating..." : "Update Account"}
              </button>
            </form>
            <div className="mx-auto mt-4 w-full max-w-md">
              <FeedbackMessage message={message} type={type} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
