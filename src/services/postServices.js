export const getPostById = async (postId, { token }) => {
  const res = await fetch(`http://localhost:8000/posts/${postId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    },
  });
  const postObj = res.json();
  return postObj;
};
