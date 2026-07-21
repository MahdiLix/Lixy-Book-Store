import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Layout/Header";
import UsersTable from "../../components/Admin/UsersTable";
import AddUserForm from "../../components/Admin/AddUserForm";
import UpdateAccountForm from "../../components/Account/UpdateAccountForm";
import Loading from "../../components/Ui/Loading";
import FeedbackMessage from "../../components/Ui/FeedbackMessage";
import {
  getAllUsers,
  deleteUser,
  updateUserProfile,
  registerUser,
} from "../../api/userApi";
import { clearAuthToken, getAuthToken } from "../../utils/auth";
import { ui } from "../../styles/ui";

export default function UsersManagementPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("notice");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
    newPassword: "",
  });

  const isMounted = useRef(true);
  const messageTimeout = useRef(null);

  useEffect(() => {
    loadUsers();
    return () => {
      isMounted.current = false;
      if (messageTimeout.current) clearTimeout(messageTimeout.current);
    };
  }, []);

  async function loadUsers() {
    setLoading(true);
    try {
      const token = getAuthToken();
      const res = await getAllUsers(token);
      if (isMounted.current) {
        setUsers(res.data || []);
      }
    } catch (err) {
      if (isMounted.current) {
        setType("error");
        setMessage(`Failed to load users: ${err.message}`);
        if (err.message === "UNAUTHORIZED") {
          clearAuthToken();
          navigate("/login");
        }
      }
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }

  function handleEditClick(userId) {
    const user = users.find((u) => u._id === userId);
    if (!user) return;
    setEditingUser(user);
    setShowAddForm(false);
    setFormData({
      username: user.username || "",
      email: user.email || "",
      role: user.role || "user",
      newPassword: "",
      password: "",
    });
  }

  async function handleUpdateSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const token = getAuthToken();
      const payload = {
        username: formData.username.trim(),
        email: formData.email.trim(),
        role: formData.role,
      };
      await updateUserProfile(editingUser._id, token, payload);
      if (isMounted.current) {
        setEditingUser(null);
        await loadUsers();
        setType("success");
        setMessage("User updated successfully.");
      }
    } catch (err) {
      if (isMounted.current) {
        setType("error");
        setMessage(err.message);
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

  async function handleAddSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser({
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });
      if (isMounted.current) {
        setShowAddForm(false);
        await loadUsers();
        setType("success");
        setMessage("User added successfully.");
      }
    } catch (err) {
      if (isMounted.current) {
        setType("error");
        setMessage(err.message);
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

  async function handleRemove(userId) {
    if (!window.confirm("Remove this user?")) return;
    setLoading(true);
    try {
      await deleteUser(userId, getAuthToken());
      if (isMounted.current) {
        setUsers((prev) => prev.filter((u) => u._id !== userId));
        setType("success");
        setMessage("User removed.");
      }
    } catch (err) {
      if (isMounted.current) {
        setType("error");
        setMessage(err.message);
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
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className={ui.sectionTitle}>Users Management</h1>
              {!showAddForm && !editingUser && (
                <button
                  onClick={() => {
                    setShowAddForm(true);
                    setFormData({
                      username: "",
                      email: "",
                      password: "",
                      role: "user",
                      newPassword: "",
                    });
                  }}
                  className={ui.primaryBtn}
                >
                  + Add User
                </button>
              )}
            </div>

            {loading && <Loading />}

            {showAddForm && (
              <AddUserForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleAddSubmit}
                onCancel={() => setShowAddForm(false)}
              />
            )}

            {editingUser && (
              <UpdateAccountForm
                username={formData.username}
                email={formData.email}
                role={formData.role}
                newPassword={formData.newPassword}
                setUsername={(val) =>
                  setFormData((prev) => ({ ...prev, username: val }))
                }
                setEmail={(val) =>
                  setFormData((prev) => ({ ...prev, email: val }))
                }
                setRole={(val) =>
                  setFormData((prev) => ({ ...prev, role: val }))
                }
                setNewPassword={(val) =>
                  setFormData((prev) => ({ ...prev, newPassword: val }))
                }
                handleSubmit={handleUpdateSubmit}
                loading={loading}
                showRole={true}
                requireCurrentPassword={false}
                submitButtonText="Update User"
              />
            )}

            {!loading && !showAddForm && !editingUser && (
              <UsersTable
                users={users}
                onRemove={handleRemove}
                onEdit={handleEditClick}
              />
            )}

            <FeedbackMessage message={message} type={type} />
          </div>
        </div>
      </div>
    </main>
  );
}
