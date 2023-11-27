import { useState } from "react";
import { addNewCategory } from "../services/addNewCategory";

export const Category = () => {
  const [newCategory, setNewCategory] = useState({
    label: "",
  });

  const handleNewCategoryInput = (e) => {
    const categoryCopy = { ...newCategory };
    categoryCopy[e.target.name] = e.target.value;
    setNewCategory(categoryCopy);
  };

  const handleSaveNewCategory = (e) => {
    e.preventDefault();

    const newCategoryItem = {
      label: newCategory.label,
    };

    addNewCategory(newCategoryItem).then(() => {
      setNewCategory({
        label: "",
      });
    });
  };

  return (
    <div className="fixed top-1/3 right-0 p-6 border-2 border-black rounded-lg transform -translate-y-1/3">
      <h1 className="text-xl font-bold text-center mb-4">
        Create a new category
      </h1>
      <form>
        <label>
          <input
            value={newCategory.label}
            type="text"
            name="label"
            placeholder="Add text"
            className="mt-2 border-2 border-black rounded-md p-3 block w-full"
            onChange={handleNewCategoryInput}
          />
        </label>

        <button
          onClick={handleSaveNewCategory}
          className="btn mt-4 bg-green-200 border-2 border-green-300 rounded-md p-3 block w-full font-semibold"
        >
          <span className="font-bold">Create</span>
        </button>
      </form>
    </div>
  );
};
