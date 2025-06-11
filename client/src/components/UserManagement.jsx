import { useState } from "react";
import UserFormModal from "./modals/UserFormModal";
import ConfirmDeleteModal from "./modals/ConfirmDeleteModal";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const UserManagement = ({ users, onRefresh }) => {
  const { user: currentUser } = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const submitEdit = async (updatedData) => {
    try {
      await api.put(`/users/${selectedUser._id}`, updatedData);
      toast.success("User updated successfully!");
      setEditModalOpen(false);
      onRefresh();
    } catch (err) {
      console.error("Error updating user:", err);
      toast.error("Failed to update user");
      alert("Edit failed");
    }
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/users/${selectedUser._id}`);
      toast.success("User deleted successfully!");
      setDeleteModalOpen(false);
      onRefresh();
    } catch (err) {
      alert("Delete failed");
      console.error("Error deleting user:", err);
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">All Users</h2>
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-purple-100 text-purple-900 font-semibold">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => {
              const isEditingAdmin = u.role === "admin";
              const canEdit = !(currentUser.role === "editor" && isEditingAdmin);
              const canDelete = !(currentUser.role === "editor" && isEditingAdmin);

              return (
                <tr key={u._id} className="hover:bg-purple-50 transition">
                  <td className="px-4 py-3">{u.name}</td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3 capitalize">{u.role}</td>
                  <td className="px-4 py-3 space-x-3">
                    {canEdit && (
                      <button
                        onClick={() => handleEdit(u)}
                        className="text-blue-600 hover:text-blue-800 font-semibold transition"
                      >
                        Edit
                      </button>
                    )}
                    {canDelete && (
                      <button
                        onClick={() => handleDelete(u)}
                        className="text-red-600 hover:text-red-800 font-semibold transition"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {editModalOpen && (
        <UserFormModal
          user={selectedUser}
          currentUser={currentUser}
          onClose={() => setEditModalOpen(false)}
          onSubmit={submitEdit}
        />
      )}

      {deleteModalOpen && (
        <ConfirmDeleteModal
          user={selectedUser}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default UserManagement;
