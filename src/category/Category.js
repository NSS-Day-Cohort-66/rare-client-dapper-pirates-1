import { useEffect, useState } from "react";
import { getAllCategories } from "../services/categoryServices";

export const Category = ({ token }) => {
  const [categories, setCategories] = useState([]);

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
    </div>
  );
};
