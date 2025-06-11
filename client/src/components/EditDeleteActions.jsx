const EditDeleteActions = ({ currentUser, targetUser, onEdit, onDelete }) => {
  const isEditingSelf = currentUser._id === targetUser._id;
  const isTargetAdmin = targetUser.role === "admin";

  const canEdit =
    currentUser.role === "admin" ||
    (currentUser.role === "editor" && !isTargetAdmin);

  const canDelete = currentUser.role === "admin" && !isEditingSelf;

  return (
    <div className="flex gap-2">
      {canEdit && (
        <button
          onClick={() => onEdit?.(targetUser)}
          className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
        >
          Edit
        </button>
      )}
      {canDelete && (
        <button
          onClick={() => onDelete?.(targetUser)}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default EditDeleteActions;
