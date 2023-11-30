import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchAllPosts } from "../managers/AuthManager";
import "../components/css/home.css"

export const Home = ({ token }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch all posts when the component mounts
    fetchAllPosts()
      .then((data) => {
        // Update state with the fetched posts
        setPosts(data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, [token]); // Include token in the dependency array to re-fetch posts when token changes

  return (
    <div className="kitty">
      <div className="cat">
        <div className="header">
          <h2 className="title1">Posts</h2>
          <Link to="/new-post" className="add-post-link">
            <div className="add-post-container">
            <span>Add Post</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 50 25"
                strokeWidth={1.2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
              </svg>
              
            </div>
          </Link>
        </div>
        {posts.map((post) => (
          <div key={post.id} className="post mb-4">
            <div className="container">
              <h3 className="title2">{post.title}</h3>
              <p className="contentDate">Published on: {post.publication_date}</p>
            </div>
            <div className="content">{post.content}</div>
            {post.image_url && (
              <img src={post.image_url} alt={post.title} className="Image" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


  