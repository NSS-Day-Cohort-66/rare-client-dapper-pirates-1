import { useEffect, useState } from "react";
import { getPostById } from "../../services/postServices";
import { useParams, useNavigate } from "react-router-dom";
import "./PostDetail.css";

export const PostDetail = ({ token }) => {
  const [post, setPost] = useState({});

  const { postId } = useParams();
  const navigate = useNavigate();

  const getAndSetPost = async () => {
    const postObj = await getPostById(postId, (token = { token }));
    setPost(postObj);
  };

  useEffect(() => {
    getAndSetPost();
  }, [postId]);

  return (
    <>
      <h2 className="title1">{post.title}</h2>
      <img
        className="Image"
        alt="header chosen by author"
        src={post.image_url}
      />
      <div className="content">{post.content}</div>
      <div className="contentDate">Published: {post.publication_date}</div>
      <div className="contentDate">Author: {post.user?.author}</div>
      <button
        onClick={() => {
          navigate("AddComment");
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Comment
      </button>
    </>
  );
};
