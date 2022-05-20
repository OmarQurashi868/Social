import { useState, useEffect } from "react";
import Card from "../../UI/Card";
import { Post as PostType } from "./PostList";
import styles from "./Post.module.css";
import TimeDisplay from "./TimeDisplay";

interface Children {
  postData: PostType;
}

const Post = ({ postData }: Children) => {
  return (
    <Card className={styles.Card}>
      <div className={styles.Title}>{postData.title}</div>
      <div className={styles.Subtitle}>
        <div>By {postData?.creator?.username ? postData.creator.username : "INVALID USER"}</div>
        <TimeDisplay givenDate={postData.creationDate} />
      </div>
      <div className={styles.Content}>{postData.content}</div>
    </Card>
  );
};

export default Post;
