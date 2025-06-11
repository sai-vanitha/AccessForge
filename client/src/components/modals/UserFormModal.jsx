import { useState, useEffect, useRef } from "react";

const UserFormModal = ({ user, currentUser, onClose, onSubmit }) => {
  const modalRef = useRef();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Close on outside click
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
    >
      {/* 🔮 Blurred Gradient Shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-400 to-fuchsia-500 opacity-25 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-teal-400 opacity-20 rounded-full blur-3xl"></div>
      </div>

      <form
        ref={modalRef}
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl w-96 space-y-4 shadow-lg z-10"
      >
        <h2 className="text-xl font-bold">Edit User</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Email"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          {currentUser.role === "admin" && <option value="admin">Admin</option>}
          <option value="editor">Editor</option>
          <option value="user">User</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserFormModal;
