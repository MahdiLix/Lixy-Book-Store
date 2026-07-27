const appError = require("../../../middlewares/error.js");
const User = require("../../../models/User.js");
const updateAdminService = require("../services/updateAdmin.js");

const VALID_ROLES = ["user", "admin", "superadmin"];

const authorizeUpdate = async (requester, targetId, updateData) => {
  //  Cast to String to prevent ObjectId vs String mismatch
  const isSelfUpdate = String(requester.id) === String(targetId);
  const { role: requesterRole } = requester;
  const { role: newRole } = updateData;

  //  ROLE VALIDATION
  if (newRole && !VALID_ROLES.includes(newRole)) {
    return appError(400, "Invalid role provided!");
  }

  // SUPERADMIN LOGIC
  if (requesterRole === "superadmin") {
    // Cannot demote themselves
    if (isSelfUpdate && newRole && newRole !== "superadmin") {
      return appError(403, "You cannot demote your own superadmin account!");
    }
    return null; // Allowed
  }

  //   ADMIN LOGIC
  if (requesterRole === "admin") {
    if (newRole) {
      // Admins cannot escalate roles
      if (newRole !== "user") {
        return appError(403, "Only superadmins can change roles!");
      }
      // If frontend sends DEFAULT 'user', silently remove it
      delete updateData.role;
    }

    // If updating another user, they must be a regular user
    if (!isSelfUpdate) {
      const targetUser = await User.findById(targetId).select("role");

      if (!targetUser) {
        return appError(404, "User not found");
      }
      // Admin cannot change other admins or superadmins
      if (targetUser.role !== "user") {
        return appError(403, "Admins can only update regular users!");
      }
    }
    return null; // Allowed
  }

  //  REGULAR USER LOGIC (Block access to admin endpoint)
  if (requesterRole === "user") {
    return appError(403, "You do not have permission to perform this action!");
  }

  // 5. UNKNOWN ROLE
  return appError(403, "Invalid requester role!");
};

const updateAdminController = async (req, res, next) => {
  try {
    const targetId = req.params.id;
    const requester = req.user;
    const { username, email, role } = req.body;

    const updateData = {};
    if (username?.trim()) updateData.username = username.trim();
    if (email?.trim()) updateData.email = email.trim();
    if (role?.trim()) updateData.role = role.trim();

    if (Object.keys(updateData).length === 0) {
      return next(appError(400, "Provide username, email, or role to update"));
    }

    const authError = await authorizeUpdate(requester, targetId, updateData);
    if (authError) {
      return next(authError);
    }

    // Check if updateData became empty after authorization
    // (e.g. admin sent only { role: "user" } and it was deleted)
    if (Object.keys(updateData).length === 0) {
      return next(appError(400, "Provide valid fields to update"));
    }

    const updatedUser = await updateAdminService(targetId, updateData);
    if (!updatedUser) {
      return next(appError(404, "User not found"));
    }

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return next(appError(400, messages.join(", ")));
    }
    next(error);
  }
};

module.exports = updateAdminController;
