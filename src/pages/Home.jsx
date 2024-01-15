import { useContext, useEffect, useState } from "react";
import Container from "../components/container/Container";
import PostCard from "../components/post-form/PostCard";
import useService from "../appWrite/appWriteConfig";
import { useSelector } from "react-redux";
import UserContext from "../components/context/UserContext";

function Home() {
  const service = useService();
  const [posts, setPosts] = useState([]);
  const { databases } = useContext(UserContext);
  const { authStatus } = useSelector((state) => state.auth);

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

  return posts?.length > 0 ? (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  ) : (
    <div className="w-full py-8 mt-4 text-center">
      <Container>
        <div className="flex flex-wrap">
          <div className="p-2 w-full">
            <h1 className="text-2xl font-bold hover:text-gray-500">
              Login to read posts
            </h1>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
