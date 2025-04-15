import { useMutation } from "@apollo/client";

const useDelete = (DELETE_MUTATION, cacheField, type) => {
  const [deleteItem] = useMutation(DELETE_MUTATION, {
    update(cache, { data }) {
      const deletedItem = data?.[Object.keys(data)[0]]; // Lấy item đầu tiên từ mutation

      cache.modify({
        fields: {
          [cacheField](existingItems = []) {
            return existingItems.filter(
              (itemRef) => itemRef.__ref !== `${type}:${deletedItem.id}`
            );
          },
        },
      });
    },
  });

  const handleDelete = async (id) => {
    try {
      await deleteItem({ variables: { id } });
    } catch (error) {
      console.error(`Error deleting ${cacheField}:`, error);
    }
  };

  return { handleDelete };
};

export default useDelete;
