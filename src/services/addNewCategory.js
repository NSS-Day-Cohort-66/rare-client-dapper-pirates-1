export const addNewCategory = (category) => {
  return fetch("http://localhost:8000/categories", {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
};
