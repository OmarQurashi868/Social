import { useState, useEffect } from "react";
import Post from "./Post";
import NewPost from "../posts/NewPost";
import Card from "../../UI/Card";
import VerifyLogin from "../../auth/VerifyLogin";
import buttonStyles from "../../UI/Button.module.css";
import styles from "./PostList.module.css";

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
  const [scrollSwitch, setScrollSwitch] = useState(false);

  const [isFinal, setIsFinal] = useState(false);

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
    const autoRefresh = setInterval(() => {
      setRefreshSwitch((switcher) => !switcher);
    }, 5000);
    return () => {
      clearInterval(autoRefresh);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    try {
      VerifyLogin().then((res) => {
        if (res) {
          if (posts[0]._id != "Loading..." && posts[0]._id) {
            fetch(
              `${import.meta.env.VITE_BACKEND_URL}/posts/latest/${
                posts[0]._id
              }`,
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
                  if (res?.message != "Already on latest") {
                    if (isMounted) {
                      setPosts((prevPosts) => {
                        let newPosts: [Post] = [...prevPosts];
                        newPosts.unshift(...res);
                        return newPosts;
                      });
                    }
                  }
                }
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

  let statusCode2 = 0;

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
          statusCode2 = res.status;
          return res.json();
        })
        .then((res) => {
          if (statusCode2 == 200) {
            if (isMounted) {
              setPosts((prevPosts) => {
                if (prevPosts[0]._id == "Loading...") {
                  prevPosts.splice(0, 1);
                }
                let newPosts: [Post] = [...prevPosts];
                if (res[res.length - 1] == null) {
                  setIsFinal(true);
                }
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
  }, [scrollSwitch]);

  useEffect(() => {
  let isMounted = true;
  let isScrolled = false;
  window.addEventListener("scroll", () => {
    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 100
    ) {
      if (!isScrolled) {
        isScrolled = true;
        if (isMounted) {
          setScrollSwitch(!scrollSwitch);
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
    <div id="postList" className={styles.PostList}>
      <NewPost refreshList={refreshListHandler} onPost={newPostHandler} />
      {posts.map((post) => {
        return <Post postData={post} key={post._id} />;
      })}
      <Card>
        {!isFinal ? (
          <div className={buttonStyles.Loader}></div>
        ) : (
          "You've reached the end, congratulations!"
        )}
      </Card>
    </div>
  );
};

export default PostList;
