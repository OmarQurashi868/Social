import { useState, useEffect } from "react";
import Card from "../../UI/Card";
import Post from "./Post";

export interface Post {
  _id: string;
  title: string;
  content: string;
  creationDate: Date;
  creatorId: string;
}
const PostList = () => {
  const [posts, setPosts] = useState<[Post]>([
    {
      _id: "Loading...",
      title: "Loading...",
      content: "Loading...",
      creationDate: new Date(),
      creatorId: "Loading...",
    },
  ]);

  let statusCode = 0;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/allposts`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        statusCode = res.status;
        return res.json();
      })
      .then((res) => {
        if (statusCode == 200) {
          setPosts(res);
        }
      });
  }, []);

  return (
    <div>
      {posts.map((e) => {
        return <Post postData={e} key={e._id}/>;
      })}
    </div>
  );
};

export default PostList;
