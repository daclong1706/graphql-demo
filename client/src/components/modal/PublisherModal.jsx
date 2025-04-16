import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import {
  ADD_PUBLISHER,
  GET_PUBLISHERS,
  UPDATE_PUBLISHER,
} from "../../graphql/publisher";

const PublisherModal = ({ isOpen, onClose, type = "add", publisher }) => {
  const [formData, setFormData] = useState({
    name: publisher?.name || "",
    location: publisher?.location || "",
  });

  const [addPublisher] = useMutation(ADD_PUBLISHER, {
    refetchQueries: [{ query: GET_PUBLISHERS }],
  });
  const [updatePublisher] = useMutation(UPDATE_PUBLISHER, {
    refetchQueries: [{ query: GET_PUBLISHERS }],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === "add") {
        await addPublisher({
          variables: { name: formData.name, location: formData.location },
        });
        toast.success("Thêm nhà xuất bản thành công!");
      } else if (type === "edit" && publisher) {
        await updatePublisher({
          variables: {
            id: publisher.id,
            name: formData.name,
            location: formData.location,
          },
        });
        toast.success("Cập nhật nhà xuất bản thành công!");
      }
      onClose();
    } catch {
      toast.error(
        `Lỗi khi ${type === "add" ? "thêm" : "cập nhật"} nhà xuất bản!`
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md isolate">
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          {type === "add" ? "Thêm Nhà Xuất Bản" : "Sửa Nhà Xuất Bản"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div>
            <label className="block font-medium mb-1 text-gray-800">
              Nhà Xuất Bản
            </label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded-xl border-neutral-300 focus:border-neutral-400 focus:border-2 focus:outline-none"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-800">
              Địa chỉ
            </label>
            <input
              type="text"
              name="location"
              className="w-full p-2 border rounded-xl border-neutral-300 focus:border-neutral-400 focus:border-2 focus:outline-none"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded"
            >
              {type === "add" ? "Thêm" : "Sửa"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublisherModal;
