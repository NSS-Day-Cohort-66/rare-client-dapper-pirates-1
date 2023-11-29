import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostsByCat } from "../services/postServices";
import "../components/postDetail/PostDetail.css";
import { getCategoryById } from "../services/categoryServices";

export const PostsByCategory = ({ token }) => {
  //get category id from browser url
  const { categoryId } = useParams();
  const [postsByCat, setPostsByCat] = useState([]);
  const [category, setCategory] = useState("");

  //get all posts that have the same category id as the category id in the browser url

  useEffect(() => {
    getPostsByCat(categoryId, { token }).then((postsByCatArray) => {
      //set the state of the postsByCat variable to the array of posts with matching category ids returned
      setPostsByCat(postsByCatArray);
    });
    getCategoryById(categoryId, { token }).then((category) => {
      setCategory(category.label);
    });
  }, [token, categoryId]); //when token and category id change i want the postsByCat variable state to be reset with the correct information

  return (
    <div>
      <h1 className="posts_by_cat_header text-4xl font-bold mt-4 ml-56 mb-16 border-b-4 border-emerald-300 inline-block">
        {category}
      </h1>
      {postsByCat.length > 0 ? (
        <div>
          {
            //get the name of the category that has the same id as the one in the browser url
          }

          <div className="posts_by_cat_container flex justify-center pb-10">
            {postsByCat.map((postObj) => {
              return (
                <div
                  key={`posts_by_cat ${postObj.id}`}
                  className="posts_by_cat_list w-2/4 border-2 border-gray-500 pt-4 relative"
                >
                  <h2 className="post_by_cat_title text-2xl text-center pb-8 font-bold">
                    {postObj?.title}
                  </h2>
                  <img
                    className="Image"
                    alt="header chosen by author"
                    src={postObj?.image_url}
                  />
                  <div className="content">{postObj?.content}</div>
                  <div className="contentDate pb-2">
                    Published: {postObj?.publication_date}
                  </div>
                  <div className="contentDate pb-8">
                    Author: {postObj?.user.author}
                  </div>
                  <div className="icon_container flex absolute bottom-0 right-0 mb-4 mr-4 flex-col">
                    <div className="reaction_count mb-2">Reaction Count #</div>
                    <div className="buttons flex justify-evenly">
                      <button className="edit_btn mb-2">
                        <i className="fa-solid fa-gear"></i>
                      </button>
                      {postObj.is_owner === true ? (
                        <button className="delete_btn mb-2">
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="no_posts text-center italic text-5xl">
          No posts for this category yet
        </div>
      )}
    </div>
  );
};
