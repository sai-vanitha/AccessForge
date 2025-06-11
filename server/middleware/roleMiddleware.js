const User = require("../models/User");

exports.allowRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

// Prevent editor from updating/deleting admin users
exports.preventEditorFromEditingAdmins = async (req, res, next) => {
  try {
    if (req.user.role === "editor") {
      const targetUser = await User.findById(req.params.id);
      if (!targetUser) {
        return res.status(404).json({ message: "Target user not found" });
      }

      if (targetUser.role === "admin") {
        return res
          .status(403)
          .json({ message: "Editors cannot modify admins" });
      }
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Middleware error", error });
  }
};
