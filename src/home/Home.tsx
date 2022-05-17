import React from "react";
import PostList from "./posts/PostList";
import Navbar from "../UI/Navbar";
import styles from "./Home.module.css";

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.Content}>
        <PostList />
      </div>
    </div>
  );
};

export default Home;
