import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createComment } from "../../services/commentServices";

export const AddComment = ({ token }) => {
  const { postId } = useParams();
  const [comment, setComment] = useState({ postId: parseInt(postId) });

  const navigate = useNavigate();

  const handleSave = async (event) => {
    event.preventDefault();
    await createComment(comment, (token = { token }));
    navigate("../comments");
  };

  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <textarea
          id="comment"
          type="text"
          onChange={(event) => {
            const copy = { ...comment };
            copy.content = event.target.value;
            setComment(copy);
          }}
          value={comment.content}
          className="w-full h-40 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Type your comment here..."
        ></textarea>
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={handleSave}
      >
        Submit
      </button>
    </form>
  );
};
