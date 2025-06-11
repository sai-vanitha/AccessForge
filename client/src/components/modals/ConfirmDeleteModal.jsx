import { useEffect, useRef } from "react";

const ConfirmDeleteModal = ({ user, onClose, onConfirm }) => {
  const modalRef = useRef();

  // Close on outside click
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Close on Escape key
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
      {/* 🔮 Abstract Gradient Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-blue-400 to-purple-500 opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-pink-400 opacity-20 rounded-full blur-3xl"></div>
      </div>

      <div
        ref={modalRef}
        className="bg-white p-6 rounded-xl shadow-lg w-96 z-10 space-y-4"
      >
        <h2 className="text-xl font-bold">Delete User</h2>
        <p>Are you sure you want to delete <strong>{user.name}</strong>?</p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
