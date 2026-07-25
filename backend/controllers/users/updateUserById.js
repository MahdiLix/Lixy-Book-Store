const createError = require("../../middlewares/errors/errorHandling");
const userModel = require("../../models/userModel");
const updateAdminByIdService = require("../../services/admins/updateAdminByIdService");

const VALID_ROLES = ["user", "admin", "superadmin"];

const authorizeUpdate = async (requester, targetId, updateData) => {
  const isSelfUpdate = requester.id === targetId;
  const { role: requesterRole } = requester;
  const { role: newRole } = updateData;

  //  ROLE VALIDATION
  if (newRole && !VALID_ROLES.includes(newRole)) {
    return createError(400, "Invalid role provided!");
  }

  if (requesterRole === "superadmin") {
    // Cannot demote themselves
    if (isSelfUpdate && newRole && newRole !== "superadmin") {
      return createError(403, "You cannot demote your own superadmin account!");
    }
    return null; // Allowed
  }
  if (requesterRole === "admin") {
    if (newRole) {
      if (newRole !== "user") {
        return createError(403, "Only superadmins can change roles!");
      }
      // if frontend send 'user' remove it
      delete updateData.role;
    }

    // If updating another user, they must be a regular user
    if (!isSelfUpdate) {
      const targetUser = await userModel.findById(targetId).select("role");

      if (!targetUser) {
        return createError(404, "User not found");
      }
      // admin cannot change other admins or superadmins
      if (targetUser.role !== "user") {
        return createError(403, "Admins can only update regular users!");
      }
    }
    return null; // Allowed
  }

  if (requesterRole === "user") {
    return createError(403, "You can only update your own profile!");
  }

  //  UNKNOWN ROLE
  return createError(403, "Invalid requester role!");
};

const updateAdminById = async (req, res, next) => {
  try {
    const targetId = req.params.id;
    const requester = req.user;
    const { username, email, role } = req.body;

    const updateData = {};
    if (username?.trim()) updateData.username = username.trim();
    if (email?.trim()) updateData.email = email.trim();
    if (role?.trim()) updateData.role = role.trim();

    if (Object.keys(updateData).length === 0) {
      return next(
        createError(400, "Provide username, email, or role to update"),
      );
    }

    const authError = await authorizeUpdate(requester, targetId, updateData);
    if (authError) {
      return next(authError);
    }

    //  Check if updateData became empty after authorization
    // (e.g. admin sent only { role: "user" } and it was deleted)
    if (Object.keys(updateData).length === 0) {
      return next(
        createError(400, "Provide username, email, or role to update"),
      );
    }

    const updatedUser = await updateAdminByIdService(targetId, updateData);
    if (!updatedUser) {
      return next(createError(404, "User not found"));
    }

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return next(createError(400, messages.join(", ")));
    }
    next(error);
  }
};

module.exports = updateAdminById;
