import { useEffect, useState } from "react";

const MultiSelect = ({ data, formData, setFormData, name, label }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    setSelectedItems(formData[name] || []);
  }, [formData, name]);

  const handleSelect = (e) => {
    const selectedId = e.target.value;

    if (selectedId && !selectedItems.includes(selectedId)) {
      setSelectedItems([...selectedItems, selectedId]);
      setFormData({ ...formData, [name]: [...selectedItems, selectedId] });
    }
  };

  const removeItem = (id) => {
    const updatedItems = selectedItems.filter((item) => item !== id);
    setSelectedItems(updatedItems);
    setFormData({ ...formData, [name]: updatedItems });
  };

  return (
    <div className="flex-1">
      <label htmlFor={`${name}Select`} className="block font-medium mb-1">
        {label}
      </label>

      {/* Dropdown chọn */}
      <div className="flex items-center gap-2">
        <select
          id={`${name}Select`}
          name={name}
          onChange={handleSelect}
          className="w-full p-2 border rounded-xl border-neutral-300 focus:border-neutral-400 focus:outline-none h-10"
        >
          <option value="">Chọn {label.toLowerCase()}</option>

          {data
            ? [...data]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))
            : null}
        </select>
      </div>

      {/* Danh sách mục đã chọn */}
      <div className="mt-3 flex flex-wrap gap-2">
        {selectedItems.map((id, index) => {
          const item = data.find((i) => i.id === id);
          return (
            <div
              key={`${id}-${index}`} // Thêm index để đảm bảo key là duy nhất
              className="px-3 py-1 bg-gray-200 rounded-lg flex items-center gap-2"
            >
              <span>{item?.name}</span>
              <button
                type="button"
                className="text-red-500 font-bold"
                onClick={() => removeItem(id)}
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultiSelect;
