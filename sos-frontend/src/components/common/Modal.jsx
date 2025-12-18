export const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-4 w-full max-w-md">
        {children}
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="text-sm text-gray-600 hover:underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
