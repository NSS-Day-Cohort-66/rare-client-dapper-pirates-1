import React, { useState, useEffect } from "react";
import { CreateAPost, getCategories } from "../../managers/AuthManager";
import { useNavigate } from "react-router-dom";

export const CreatePost = ({ token }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image_url: "",
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories when the component mounts
    const fetchCategories = async () => {
      try {
        const response = await getCategories(token);
        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  //Array.find() to find an element in the categories array based on condition.
    const selectedCategory = categories.find(
      (category) => category.label === formData.category
    );
      
    if (!selectedCategory) {
      console.error("Selected category not found");
      return;
    }

    // Add logic for setting the current date and time, and other required fields
    const currentDate = new Date().toISOString();

    try {
      const response = await CreateAPost({
        ...formData,
        category: parseInt(selectedCategory.id),
        publication_date: currentDate,
        approved: true,
      });

      // Handle the response as needed
      console.log("Post created successfully", response);

      // Use navigate to navigate to the new Post's details page
      navigate(`/posts/${response.id}`);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="mx-auto text-center">
      <h2 className="font-bold text-3xl mb-4">New Post</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <label className="block mb-2">
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter the title"
            className="border border-gray-300 p-2 w-med"
            required
          />
        </label>
        <br />
        <label className="block mb-2">
          Content:
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Enter the content"
            className="border border-gray-300 p-2 w-med"
            required
          />
        </label>
        <br />
        <label className="block mb-2">
          Category:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-med"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.label}>
                {category.label}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label className="block mb-2">
          Header Image URL (optional):
          <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="Enter the header image URL"
            className="border border-gray-300 p-2 w-med"
          />
        </label>
        <br />
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Save
        </button>
      </form>
    </div>
  )}