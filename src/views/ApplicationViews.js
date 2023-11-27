import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { Category } from "../category/Category";
import { Home } from "./Home";
import { PostDetail } from "../components/postDetail/PostDetail";

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
            <Route path=":postId" element={<PostDetail token={token} />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};
