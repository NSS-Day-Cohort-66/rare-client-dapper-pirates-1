export const getPostById = async (postId) => {
  const res = await fetch(`http://localhost:8000/posts/${postId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "token 37b69ea1095f8c6ad00eed0b06ce46a924fa864a",
    },
  });
  const postObj = res.json();
  return postObj;
};
