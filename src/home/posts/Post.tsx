import { useState, useEffect } from "react";
import Card from "../../UI/Card";
import { Post as PostType } from "./PostList";
import styles from "./Post.module.css";
import TimeDisplay from "./TimeDisplay";

interface Children {
  postData: PostType;
}

const Post = ({ postData }: Children) => {
  const [creatorName, setCreatorName] = useState("Loading...");

  useEffect(() => {
    let statusCode = 0;
    if (postData.creatorId != "Loading...") {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/getuserinfo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userData: {
            _id: postData.creatorId,
          },
        }),
      })
        .then((res) => {
          statusCode = res.status;
          return res.json();
        })
        .then((res) => {
          if (res?.userData?.username) {
            setCreatorName(res.userData.username);
          } else {
            setCreatorName("INVALID USER");
          }
        });
    }
  }, []);

  return (
    <Card className={styles.Card}>
      <div className={styles.Title}>{postData.title}</div>
      <div className={styles.Subtitle}>
        <div>By {creatorName}</div>
        <TimeDisplay givenDate={postData.creationDate} />
      </div>
      <div className={styles.Content}>{postData.content}</div>
    </Card>
  );
};

export default Post;
