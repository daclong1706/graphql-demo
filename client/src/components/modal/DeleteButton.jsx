import { TrashIcon } from "@heroicons/react/24/outline";
import React from "react";

const DeleteModal = ({ isOpen, onClose, onDelete, itemName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Xác nhận xóa</h2>
        <p className="mb-6 text-gray-600">
          Bạn có chắc chắn muốn xóa{" "}
          <span className="font-semibold">"{itemName}"</span> không?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 transition"
          >
            Hủy
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

const DeleteButton = ({ itemName, onDelete }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);
  const handleConfirmDelete = () => {
    onDelete();
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="text-neutral-400 hover:text-red-400 cursor-pointer transition"
      >
        <TrashIcon className="size-6" />
      </button>
      <DeleteModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        onDelete={handleConfirmDelete}
        itemName={itemName}
      />
    </>
  );
};

export default DeleteButton;
