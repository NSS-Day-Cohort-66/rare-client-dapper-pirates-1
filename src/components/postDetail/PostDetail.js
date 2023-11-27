import { useEffect, useState } from "react";
import { getPostById } from "../../services/postServices";
import { useParams } from "react-router-dom";

export const PostDetail = ({ token }) => {
  const [post, setPost] = useState({});

  const { postId } = useParams();

  const getAndSetPost = async () => {
    const postObj = await getPostById(postId, (token = { token }));
    setPost(postObj);
  };

  useEffect(() => {
    getAndSetPost();
  }, [postId]);

  return (
    <>
      <h1>{post.title}</h1>
      <img alt="header chosen by author" src={post.image_url} />
      <div>{post.content}</div>
      <div>Published: {post.publication_date}</div>
      <div>Author: {post.user?.author}</div>
    </>
  );
};
