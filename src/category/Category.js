import { useEffect, useState } from "react";
import { getAllCategories } from "../services/categoryServices";
import { addNewCategory } from "../services/addNewCategory";

export const Category = ({ token }) => {
  const [categories, setCategories] = useState([]);
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

  useEffect(() => {
    getAllCategories({ token }).then((catArray) => {
      const alphaCatArray = catArray.sort((a, b) =>
        a.label.localeCompare(b.label)
      );
      setCategories(alphaCatArray);
    });
  }, [token]);

  return (
    <div>
      <h1 className="category_header text-4xl font-bold mt-10 ml-4">
        Categories
      </h1>
      <div className="category_list mt-10">
        {categories.map((catObj) => {
          return (
            <div
              key={`category ${catObj.id}`}
              className="category_list_container flex ml-6 "
            >
              <button className="edit_btn basis-7">
                <i className="fa-solid fa-gear"></i>
              </button>
              <button className="delete_btn basis-7">
                <i className="fa-solid fa-trash-can"></i>
              </button>
              <div className="category-label border-4 border-emerald-300 rounded ml-10 mr-10 mt-2 mb-2 pl-10 pr-10 pt-2 pb-2">
                {catObj.label}
              </div>
            </div>
          );
        })}
      </div>
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
    </div>
  );
};
