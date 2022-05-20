import { useState, useEffect } from "react";
import Post from "./Post";
import NewPost from "../posts/NewPost";

interface UserType {
  username: string;
  email: string;
  creationDate: Date;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  creationDate: Date;
  creator: UserType;
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
      creator: {
        username: "Loading...",
        email: "Loading...",
        creationDate: new Date(),
      },
    },
  ]);

  const stepCount = 15;
  let startCount = 0;
  if (posts.length > 1) startCount = posts.length;

  let statusCode = 0;

  useEffect(() => {
    let isMounted = true;
    try {
      fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/posts/limit/${startCount}/${stepCount}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((res) => {
          statusCode = res.status;
          return res.json();
        })
        .then((res) => {
          if (statusCode == 200) {
            if (isMounted) {
              setPosts((prevPosts) => {
                if (prevPosts[0]._id == "Loading...") {
                  prevPosts.splice(0, 1);
                }
                let newPosts: [Post] = [...prevPosts];
                newPosts.push(...res);
                let i = newPosts.length - 1;
                while (newPosts[i] == null && i > 0) {
                  newPosts.splice(i, 1);
                  i--;
                }
                return newPosts;
              });
            }
          }
        });
    } catch (err: any) {
      alert(`Error occured: ${err}`);
    }
    return () => {
      isMounted = false;
    };
  }, [refreshSwitch]);

  useEffect(() => {
    let isMounted = true;
    let isScrolled = false;
    window.addEventListener("scroll", () => {
      if (
        window.scrollY + window.innerHeight ==
        document.documentElement.scrollHeight
      ) {
        if (!isScrolled) {
          isScrolled = true;
          if (isMounted) {
            setRefreshSwitch(!refreshSwitch);
          }
        }
      } else if (isScrolled) {
        isScrolled = false;
      }
    });
    return () => {
      isMounted = false;
    };
  }, [posts]);

  const newPostHandler = (postData: Post) => {
    setPosts((prevPost) => {
      let newPosts: [Post] = [...prevPost];
      newPosts.unshift(postData);
      return newPosts;
    });
  };

  return (
    <div id="postList">
      <NewPost refreshList={refreshListHandler} onPost={newPostHandler} />
      {posts.map((post) => {
        return <Post postData={post} key={post._id} />;
      })}
      <span>You've reached the end, congratulations!</span>
    </div>
  );
};

export default PostList;
