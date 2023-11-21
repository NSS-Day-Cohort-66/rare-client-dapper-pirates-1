import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { Category } from "../category/Category";
import { PostDetail } from "../components/postDetail/PostDetail";

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route element={<Authorized token={token} />}>
          {/* Add Routes here */}
          <Route path="/categories" element={<Category token={token} />} />
          <Route path="posts">
            <Route path=":postId" element={<PostDetail token={token} />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};
