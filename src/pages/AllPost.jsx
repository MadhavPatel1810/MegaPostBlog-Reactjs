import { useState, useEffect, useContext } from "react";
import Container from "../components/container/Container";
import PostCard from "../components/post-form/PostCard";
import useService from "../appWrite/appWriteConfig";
import { useSelector } from "react-redux";
import UserContext from "../components/context/UserContext";

function AllPosts() {
  const service = useService();
  const [posts, setPosts] = useState([]);
  const { authStatus } = useSelector((state) => state.auth);
  const { databases } = useContext(UserContext);

  useEffect(() => {
    const fetchPosts = () => {
      service.getPosts([]).then((posts) => {
        if (posts && posts?.documents) {
          setPosts(posts.documents);
        }
      });
    };
    if (authStatus && databases) {
      fetchPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStatus, databases]);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts?.map((post) => (
            <div key={post?.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
export default AllPosts;
