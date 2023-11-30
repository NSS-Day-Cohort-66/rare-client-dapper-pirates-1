export const createComment = async (comment, { token }) => {
  await fetch("http://localhost:8000/comments", {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
};
