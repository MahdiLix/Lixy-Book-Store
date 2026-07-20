import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Layout/Header";
import UsersTable from "../../components/Admin/UsersTable";
import AddUserForm from "../../components/Admin/AddUserForm";
import EditUserForm from "../../components/Admin/EditUserForm";
import Loading from "../../components/Ui/Loading";
import FeedbackMessage from "../../components/Ui/FeedbackMessage";
import {
  getAllAdmins,
  deleteAdmin,
  updateAdminProfile,
  registerAdmin,
} from "../../api/adminApi";
import { clearAuthToken, getAuthToken } from "../../utils/auth";
import { ui } from "../../styles/ui";

export default function AdminsManagementPage() {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("notice");

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "admin",
    newPassword: "",
  });

  useEffect(() => {
    loadAdmins();
  }, []);

  async function loadAdmins() {
    setLoading(true);
    try {
      const res = await getAllAdmins(getAuthToken());
      setAdmins(res.admins || res.data || []);
    } catch (err) {
      setType("error");
      setMessage(err.message);
      if (err.message === "UNAUTHORIZED") {
        clearAuthToken();
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleEditClick(admin) {
    setEditingAdmin(admin);
    setFormData({
      username: admin.username,
      email: admin.email,
      role: admin.role,
      newPassword: "",
    });
  }

  async function handleUpdateSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        username: formData.username,
        email: formData.email,
        role: formData.role,
      };
      if (formData.newPassword) payload.newPassword = formData.newPassword;
      await updateAdminProfile(editingAdmin._id, getAuthToken(), payload);
      setEditingAdmin(null);
      await loadAdmins();
      setType("success");
      setMessage("Admin updated.");
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
      await registerAdmin(getAuthToken(), {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role || "admin",
      });
      setShowAddForm(false);
      await loadAdmins();
      setType("success");
      setMessage("Admin added.");
    } catch (err) {
      setType("error");
      setMessage(err.message);
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  }

  async function handleRemove(id) {
    if (!window.confirm("Remove this admin?")) return;
    try {
      setLoading(true);
      await deleteAdmin(id, getAuthToken());
      setAdmins((prev) => prev.filter((a) => a._id !== id));
      setType("success");
      setMessage("Admin removed.");
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
              <h1 className={ui.sectionTitle}>Admins Management</h1>
              {!showAddForm && !editingAdmin && (
                <button
                  onClick={() => {
                    setShowAddForm(true);
                    setFormData({
                      username: "",
                      email: "",
                      password: "",
                      role: "admin",
                    });
                  }}
                  className={ui.primaryBtn}
                >
                  + Add Admin
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

            {editingAdmin && (
              <EditUserForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleUpdateSubmit}
                onCancel={() => setEditingAdmin(null)}
              />
            )}

            {!loading && !showAddForm && !editingAdmin && (
              <UsersTable
                users={admins}
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
