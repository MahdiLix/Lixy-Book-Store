import { useState, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/Layout/Header";
import Loading from "../components/Ui/Loading";
import FeedbackMessage from "../components/Ui/FeedbackMessage";
import UpdateAccountForm from "../components/Account/UpdateAccountForm";
import {
  updateUserProfile,
  updateUserPassword,
  getUserProfile,
} from "../api/userApi";
import {
  updateAdminProfile,
  updateAdminPassword,
  getAdminProfile,
} from "../api/adminApi";
import {
  isLoggedIn,
  getUserInfo,
  getAuthToken,
  saveUserInfo,
  getUserRole,
} from "../utils/auth";
import { ui } from "../styles/ui";

export default function UserUpdatePage() {
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

  const isMounted = useRef(true);
  const messageTimeout = useRef(null);

  useEffect(() => {
    return () => {
      isMounted.current = false;
      if (messageTimeout.current) clearTimeout(messageTimeout.current);
    };
  }, []);

  if (!loggedIn) return <Navigate to="/login" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (!username?.trim() || !email?.trim()) {
      setType("error");
      setMessage("Username and Email cannot be empty.");
      return;
    }

    if (
      (currentPassword && !newPassword?.trim()) ||
      (!currentPassword?.trim() && newPassword)
    ) {
      setType("error");
      setMessage("Please provide both Current Password and New Password.");
      return;
    }

    setLoading(true);

    try {
      const token = getAuthToken();
      const userId = currentUser._id;

      const profilePayload = {
        username: username.trim(),
        email: email.trim(),
        currentPassword: currentPassword,
      };

      if (role === "admin" || role === "superadmin") {
        await updateAdminProfile(userId, token, profilePayload);
      } else {
        await updateUserProfile(userId, token, profilePayload);
      }

      if (currentPassword && newPassword) {
        try {
          const passwordPayload = { currentPassword, newPassword };
          if (role === "admin" || role === "superadmin") {
            await updateAdminPassword(userId, token, passwordPayload);
          } else {
            await updateUserPassword(userId, token, passwordPayload);
          }
        } catch (passwordErr) {
          // Password update failed → re‑fetch profile from server to stay in sync
          let freshUser;
          if (role === "admin" || role === "superadmin") {
            const res = await getAdminProfile(userId, token);
            freshUser = res.data;
          } else {
            const res = await getUserProfile(userId, token);
            freshUser = res.data;
          }
          if (isMounted.current && freshUser) {
            saveUserInfo(freshUser);
            setUsername(freshUser.username || "");
            setEmail(freshUser.email || "");
            setType("error");
            setMessage(
              "Profile updated, but password change failed. Data re‑synced.",
            );
            setCurrentPassword("");
            setNewPassword("");
            return;
          }
          throw new Error("Failed to re‑sync profile after password error.");
        }
      }

      // Both operations succeeded → save local info
      const updatedUser = {
        ...currentUser,
        username: username.trim(),
        email: email.trim(),
      };
      if (isMounted.current) {
        saveUserInfo(updatedUser);
        setType("success");
        setMessage("Account updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
      }
    } catch (err) {
      if (isMounted.current) {
        setType("error");
        setMessage(
          err.message ||
            "Failed to update account. Check your current password.",
        );
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
        messageTimeout.current = setTimeout(() => {
          if (isMounted.current) setMessage("");
        }, 3000);
      }
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

            {loading && <Loading />}

            <UpdateAccountForm
              username={username}
              email={email}
              currentPassword={currentPassword}
              newPassword={newPassword}
              setUsername={setUsername}
              setEmail={setEmail}
              setCurrentPassword={setCurrentPassword}
              setNewPassword={setNewPassword}
              handleSubmit={handleSubmit}
              loading={loading}
              showRole={false}
              requireCurrentPassword={true}
              submitButtonText="Update Account"
            />

            <div className="mx-auto mt-4 w-full max-w-md">
              <FeedbackMessage message={message} type={type} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
