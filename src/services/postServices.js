export const getPostById = async (postId) => {
  const res = await fetch(`http://localhost:8000/${postId}`);
  const postObj = res.json();
  return postObj;
};
