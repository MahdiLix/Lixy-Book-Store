import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Layout/Header";
import UsersTable from "../../components/Admin/UsersTable";
import AddUserForm from "../../components/Admin/AddUserForm";
import EditUserForm from "../../components/Admin/EditUserForm";
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

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    setLoading(true);
    try {
      const token = getAuthToken();
      const res = await getAllUsers(token);
      setUsers(res.users || res.data || []);
    } catch (err) {
      setType("error");
      setMessage(`Failed to load users: ${err.message}`);
      if (err.message === "UNAUTHORIZED") {
        clearAuthToken();
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleEditClick(user) {
    setEditingUser(user);
    setShowAddForm(false);
    setFormData({
      username: user.username,
      email: user.email,
      role: user.role,
      newPassword: "",
    });
  }

  async function handleUpdateSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const token = getAuthToken();
      const payload = {
        username: formData.username,
        email: formData.email,
        role: formData.role,
      };
      if (formData.newPassword) payload.newPassword = formData.newPassword;

      await updateUserProfile(editingUser._id, token, payload);
      setEditingUser(null);
      await loadUsers();
      setType("success");
      setMessage("User updated successfully.");
    } catch (err) {
      setType("error");
      setMessage(err.message);
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  }

  async function handleAddSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      setShowAddForm(false);
      await loadUsers();
      setType("success");
      setMessage("User added successfully.");
    } catch (err) {
      setType("error");
      setMessage(err.message);
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  }

  async function handleRemove(userId) {
    if (!window.confirm("Remove this user?")) return;
    try {
      setLoading(true);
      await deleteUser(userId, getAuthToken());
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      setType("success");
      setMessage("User removed.");
    } catch (err) {
      setType("error");
      setMessage(err.message);
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  }

  return (
    <main className={ui.page}>
      <Header logoutRedirectTo="/login" />
      <div className={ui.pageTopSpace}>
        <div className={ui.container}>
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className={ui.sectionTitle}>Users Management</h1>
              {!showAddForm && !editingUser && (
                <button
                  onClick={() => {
                    setShowAddForm(true);
                    setFormData({ username: "", email: "", password: "" });
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
              <EditUserForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleUpdateSubmit}
                onCancel={() => setEditingUser(null)}
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
