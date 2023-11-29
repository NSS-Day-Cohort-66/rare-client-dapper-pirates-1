import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { Category } from "../category/Category";
import { Home } from "./Home";
import { PostDetail } from "../components/postDetail/PostDetail";
import { AddComment } from "../components/addComment/AddComment";
import { Comments } from "../components/comments/Comments";

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route element={<Authorized token={token} />}>
          <Route path="/" element={<Home />} />
          {/* Add Routes here */}
          <Route
            path="/category-manager"
            element={<Category token={token} />}
          />
          <Route path="posts">
            <Route path=":postId">
              <Route path="" element={<PostDetail token={token} />} />
              <Route path="AddComment" element={<AddComment token={token} />} />
              <Route path="comments" element={<Comments token={token} />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};
