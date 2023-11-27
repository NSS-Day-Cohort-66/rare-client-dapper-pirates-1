import React, { useState } from "react";
import { CreateAPost } from "../../managers/AuthManager";
import { useNavigate } from "react-router-dom";
export const CreatePost = ({ token }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "",
        headerImageURL: "",
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Add logic for setting the current date and time, and other required fields
        const currentDate = new Date().toISOString();
    
        try {
          const response = await CreateAPost({
            ...formData,
            publication_date: currentDate,
            approved: true,
          });
    
          // Handle the response as needed
          console.log("Post created successfully", response);
    
          // Redirect to the new Post's details page (replace with your actual URL)
          // history.push(`/post-details/${response.id}`);
        } catch (error) {
          console.error("Error creating post:", error);
        }
      };
    
      return (
        <div>
          <h2>Create a New Post</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Content:
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Category:
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Header Image URL (optional):
              <input
                type="text"
                name="headerImageURL"
                value={formData.headerImageURL}
                onChange={handleChange}
              />
            </label>
            <br />
            <button type="submit">Save</button>
          </form>
        </div>
      );
    };