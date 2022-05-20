import React, {Fragment} from "react";
import PostList from "./posts/PostList";
import Navbar from "../UI/Navbar";
import styles from "./Home.module.css";

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <Fragment>
      <Navbar />
      <div className={styles.Content}>
        <PostList />
      </div>
    </Fragment>
  );
};

export default Home;
