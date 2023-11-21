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
        <h2 className="title1"> Posts</h2>
        {/* Render posts here */}
        {posts.map((post) => (
           <div key={post.id} className="mb-4">
           <div className="container">
             <h3 className="title2">{post.title}</h3>
             <p className="contentDate">Published on: {post.publication_date}</p>
           </div>
           <p className="content">{post.content}</p>
           {post.image_url && (
             <img
               src={post.image_url}
               alt={post.title}
               className="Image"
             />
           )}
          </div>
        ))}
      </div>
    </div>
  );
};


  