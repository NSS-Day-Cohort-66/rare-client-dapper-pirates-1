import { useEffect, useState, useRef } from "react";
import { getAllCategories } from "../services/categoryServices";
import { addNewCategory } from "../services/addNewCategory";
import { Link } from "react-router-dom";

export const Category = ({ token }) => {
  const [editSingleCategory, setEditSingleCategory] = useState({});
  //the above useState({}) handles the edit category Modal/state
  const [categories, setCategories] = useState([]);
  //below handles visibility of delete modal 
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  //below keeps track of which modal to delete
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [newCategory, setNewCategory] = useState({
    label: "",
  });
  const editModal = useRef();

  useEffect(() => {
    getAllCategories({ token }).then((catArray) => {
      const alphaCatArray = catArray.sort((a, b) =>
        a.label.localeCompare(b.label)
      );
      setCategories(alphaCatArray);
    });
  }, [token, editSingleCategory]);

  const handleNewCategoryInput = (e) => {
    const categoryCopy = { ...newCategory };
    categoryCopy[e.target.name] = e.target.value;
    setNewCategory(categoryCopy);
  };

  const handleSaveNewCategory = (e) => {
    e.preventDefault();

    const isDuplicate = categories.some(
      (category) => category.label === newCategory.label
    );
    if (isDuplicate) {
      alert(
        "Category with this label already exists. Please enter a different label."
      );
      return;
    }

    const newCategoryItem = {
      label: newCategory.label,
    };

    addNewCategory(newCategoryItem)
      .then(() => {
        getAllCategories({ token }).then((catArray) => {
          const alphaCatArray = catArray.sort((a, b) =>
            a.label.localeCompare(b.label)
          );
          setCategories(alphaCatArray);
        });
      })
      .then(() => {
        setNewCategory({
          label: "",
        });
      });
  };

  //The following function (editCategory) handles editing the category inside a modal
  const editCategory = async (event, id) => {
    event.preventDefault();
    const finalValue = {
      label: editSingleCategory.label,
    };

    await fetch(`http://localhost:8000/categories/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalValue),
    });

    const updatedCategory = await getAllCategories({ token });
    setCategories(updatedCategory);
    editModal.current.close();
    setEditSingleCategory({ label: "" });
  };
  //Delete Toggle confirmation Modal
  const toggleConfirmationModal = (category) => {
    setCategoryToDelete(category);
    setShowConfirmationModal(!showConfirmationModal);
  };
  const handleDeleteCategory = async (id) => {
    await fetch(`http://localhost:8000/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
    });
  
    const updatedCategories = await getAllCategories({ token });
    setCategories(updatedCategories);
    setShowConfirmationModal(false);
  };
  return (
    <div>
      <h1 className="category_header text-4xl font-bold mt-10 ml-4">
        Categories
      </h1>
      {/* Edit Modal Designated Below*/}
      <dialog
        className="bg-white p-6 border-2 border-black rounded-lg fixed top-1/3 right-12 transform -translate-y-1/3"
        ref={editModal}
      >
        <button
          className="text-xl absolute top-2 right-2 cursor-pointer hover:text-red-500"
          onClick={() => editModal.current.close()}
          //This handles the X button (close button)
        >
          X
        </button>
        <h1 className="text-xl font-bold text-center mb-4">
          Edit this category
        </h1>
        <form
          className="flex flex-col gap-4 items-center"
          onSubmit={(event) => {
            event.preventDefault();
            // This prevents issues with the form when hitting cancel
          }}
        >
          <label>
            <input
              className="mt-2 border-2 border-black rounded-md p-3 block w-full"
              value={editSingleCategory.label || ""}
              onChange={(event) => {
                const copy = { ...editSingleCategory };
                copy.label = event.target.value;
                setEditSingleCategory(copy);
                //handles the INPUT field of the edited item. The reason you see a || "" (or empty string) is to handle the value never being undefined
              }}
            />
          </label>

          <div className="w-full">
            <button
              className="btn mt-4 bg-green-200 border-2 border-green-300 rounded-md p-3 w-full font-semibold hover:bg-green-300"
              onClick={(event) => {
                editCategory(event, editSingleCategory.id);
              }}
              //handles the Ok button after editing
            >
              Ok
            </button>
            <button
              className="btn bg-red-200 border-2 border-red-300 rounded-md p-3 w-full mt-2 font-semibold hover:bg-red-300"
              onClick={() => editModal.current.close()}
              //handles the cancel button
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
      <div className="category_list mt-10">
        {categories.map((catObj) => {
          return (
            <div key={catObj.id} className="category_list_container flex ml-6 ">
              <button
                onClick={() => {
                  setEditSingleCategory(catObj);
                  editModal.current.showModal();
                  //handles when you click the edit button/gear symbol. It then "activates" all the JSX code above.
                }}
                className="edit_btn basis-7"
              >
                <i className="fa-solid fa-gear"></i>
              </button>
              <button
                className="delete_btn basis-7"
                onClick={() => toggleConfirmationModal(catObj)}
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
              <Link to={`/category-manager/${catObj.id}`}>
                <div className="category-label border-4 border-emerald-300 rounded ml-10 mr-10 mt-2 mb-2 pl-10 pr-10 pt-2 pb-2">
                  {catObj.label}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      {/* Delete Confirmation Modal */}
        <dialog
          className="bg-white p-6 border-2 border-black rounded-lg fixed top-1/3 right-12 transform -translate-y-1/3"
          open={showConfirmationModal}
        >
        <h1 className="text-xl font-bold text-center mb-4">
          Delete this category?
        </h1>
          <button
            className="btn mt-4 bg-red-200 border-2 border-red-500 rounded-md hover:text-red-500 p-3 block w-full font-semibold"
            onClick={() => handleDeleteCategory(categoryToDelete.id)}
          >
            Delete
          </button>
          <button
            className="btn btn-green text-black-500  hover:text-green-500"
            onClick={() => toggleConfirmationModal(null)}
          >
            Cancel
          </button>
        </dialog>

        {/* ... (end Delete confirmation Modal) */}

      <div className="fixed top-1/3 right-12 p-6 border-2 border-black rounded-lg transform -translate-y-1/3">
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
