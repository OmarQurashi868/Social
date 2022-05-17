import { useState, useEffect } from "react";
import Card from "../../UI/Card";
import Post from "./Post";
import NewPost from "../posts/NewPost";

export interface Post {
  _id: string;
  title: string;
  content: string;
  creationDate: Date;
  creatorId: string;
}

const PostList = () => {
  const [refreshSwitch, setRefreshSwitch] = useState(false);
  const refreshListHandler = () => {
    setRefreshSwitch(!refreshSwitch);
  };

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
    let isMounted = true;
    try {
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
            if (isMounted) setPosts(res);
          }
        });
    } catch (err: any) {
      alert(`Error occured: ${err}`);
    }
    return () => {
      isMounted = false;
    };
  }, [refreshSwitch]);

  const compare = (a: Post, b: Post): number => {
    if (a.creationDate >= b.creationDate) {
      return -1;
    } else {
      return 1;
    }
  };

  posts.sort(compare);

  return (
    <div>
      <NewPost refreshList={refreshListHandler} />
      {posts.map((e) => {
        return <Post postData={e} key={e._id} />;
      })}
    </div>
  );
};

export default PostList;
