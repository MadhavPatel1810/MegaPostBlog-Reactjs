import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../components/container/Container";
import PostForm from "../components/post-form/PostForm";
import useService from "../appWrite/appWriteConfig";

function EditPost() {
  const service = useService();
  const [post, setPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      service.getPost({ slug }).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
