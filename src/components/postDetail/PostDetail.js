import { useEffect, useState } from "react";
import { getPostById } from "../../services/postServices";
import { useParams } from "react-router-dom";

export const PostDetail = () => {
  const [post, setPost] = useState({});

  const { postId } = useParams();

  const getAndSetPost = async () => {
    const postObj = await getPostById(postId);
    setPost(postObj);
  };

  useEffect(() => {
    getAndSetPost();
  }, [postId]);

  return (
    <>
      <h1>Title</h1>
      <img
        alt="header chosen by author"
        src="https://images.unsplash.com/photo-1682685797743-3a7b6b8d8149?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8"
      />
      <div>
        <p>
          Lorem ipsum dolor sit amet. Et culpa officia in ratione consequatur in
          consequatur rerum. Ut dolor ipsum qui ratione consequuntur et nobis
          perspiciatis est natus necessitatibus est voluptas omnis eum soluta
          dolorem ut quisquam deserunt? Est quia velit qui voluptas maxime qui
          illo internos et dolorem sint hic maxime temporibus hic ipsum
          repudiandae sit iusto voluptatem? Ad ipsum nobis eos reiciendis
          asperiores et nesciunt consequatur sit magni nisi eum quia excepturi.
          Quo nobis quia vel sint ratione non quos saepe et autem facilis et
          numquam placeat in voluptate optio vel vitae quia. Cum modi laborum
          rem facilis voluptatum est omnis accusamus. Ea earum optio sit
          deserunt veritatis et sequi placeat et repellat doloribus et nihil
          reprehenderit ut veniam rerum nam suscipit expedita.{" "}
        </p>
        <p>
          Et nobis sunt et officia ducimus et consequatur sequi sit rerum magni
          et aliquid laborum. Est nisi saepe id ipsum aliquam quo dicta expedita
          eos laborum error est sequi consectetur ut distinctio beatae id eius
          temporibus. Ad adipisci dolor id veritatis eveniet 33 officiis
          asperiores eum corporis voluptates! Et quibusdam laboriosam aut
          laborum nulla hic laudantium provident est tempora omnis non culpa
          quos non cupiditate totam? Id earum quam qui repellendus consequuntur
          ad totam dolor quo dolorem consectetur ut omnis porro.{" "}
        </p>
        <p>
          33 ipsa molestiae et magnam aliquam vel incidunt sint ut rerum maxime
          id labore delectus sed optio numquam et consequatur rerum? Et iste
          repellat aut labore corrupti sit dolorum cupiditate quo ratione
          dolores et enim fugiat. Et Quis mollitia id enim dolorem sit dolore
          harum. Est ratione voluptatem et omnis illum ad facere tenetur non
          tempore fugiat sit Quis voluptatum sed accusamus itaque 33 dolore
          laborum! Est consectetur praesentium aut tempora quidem qui nemo quas
          At voluptatem sequi.{" "}
        </p>
      </div>
      <div>Published 11/20/23</div>
      <div>Author: Author's Name</div>
    </>
  );
};
