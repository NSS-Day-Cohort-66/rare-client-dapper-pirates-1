export const getAllCategories = ({ token }) => {
  return fetch("http://localhost:8000/categories", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    },
  }).then((res) => res.json());
};
