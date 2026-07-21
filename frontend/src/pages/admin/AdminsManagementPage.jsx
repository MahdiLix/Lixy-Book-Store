import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Layout/Header";
import UsersTable from "../../components/Admin/UsersTable";
import AddUserForm from "../../components/Admin/AddUserForm";
import UpdateAccountForm from "../../components/Account/UpdateAccountForm";
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

  const isMounted = useRef(true);
  const messageTimeout = useRef(null);

  useEffect(() => {
    loadAdmins();
    return () => {
      isMounted.current = false;
      if (messageTimeout.current) clearTimeout(messageTimeout.current);
    };
  }, []);

  async function loadAdmins() {
    setLoading(true);
    try {
      const res = await getAllAdmins(getAuthToken());
      if (isMounted.current) {
        setAdmins(res.data || []);
      }
    } catch (err) {
      if (isMounted.current) {
        setType("error");
        setMessage(err.message);
        if (err.message === "UNAUTHORIZED") {
          clearAuthToken();
          navigate("/login");
        }
      }
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }

  function handleEditClick(adminId) {
    const admin = admins.find((a) => a._id === adminId);
    if (!admin) return;
    setEditingAdmin(admin);
    setShowAddForm(false);
    setFormData({
      username: admin.username || "",
      email: admin.email || "",
      role: admin.role || "admin",
      newPassword: "",
      password: "",
    });
  }

  async function handleUpdateSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        username: formData.username.trim(),
        email: formData.email.trim(),
        role: formData.role,
      };
      await updateAdminProfile(editingAdmin._id, getAuthToken(), payload);
      if (isMounted.current) {
        setEditingAdmin(null);
        await loadAdmins();
        setType("success");
        setMessage("Admin updated.");
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
      await registerAdmin(getAuthToken(), {
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role || "admin",
      });
      if (isMounted.current) {
        setShowAddForm(false);
        await loadAdmins();
        setType("success");
        setMessage("Admin added.");
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

  async function handleRemove(id) {
    if (!window.confirm("Remove this admin?")) return;
    setLoading(true);
    try {
      await deleteAdmin(id, getAuthToken());
      if (isMounted.current) {
        setAdmins((prev) => prev.filter((a) => a._id !== id));
        setType("success");
        setMessage("Admin removed.");
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
                      newPassword: "",
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
                submitButtonText="Update Admin"
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
