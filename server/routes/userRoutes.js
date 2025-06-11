const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUserById,
  updateSelf,
  deleteUserById
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");
const { allowRoles, preventEditorFromEditingAdmins } = require("../middleware/roleMiddleware");

router.get("/", protect, allowRoles("admin", "editor"), getAllUsers);
router.get("/:id", protect, getUserById);
router.put("/me", protect, updateSelf);
router.put("/:id", protect, allowRoles("admin", "editor"), preventEditorFromEditingAdmins, updateUserById);
router.delete(
  "/:id",
  protect,
  allowRoles("admin", "editor"),
  preventEditorFromEditingAdmins,
  deleteUserById
);


module.exports = router;
