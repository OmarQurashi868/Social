import { useRef } from "react";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import styles from "../../UI/Form.module.css";

const NewPost = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  
  const textField = document.getElementById("content");
  if (textField != null) {
    textField.setAttribute(
      "style",
      `height:${textField?.scrollHeight}px;overflow-y:hidden;`
    );
  }

  const resizeField = () => {
    if (textField != null) {
      textField.style.height = "auto";
      textField.style.height = `${textField.scrollHeight}px`;
    }
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(titleRef.current?.value, contentRef.current?.value);
  };
  return (
    <Card>
      <form className={styles.Form} onSubmit={submitHandler}>
        <div className={styles.MiniContainer}>
          Title
          <input type="text" id="title" ref={titleRef} autoComplete="off" />
        </div>
        <div className={styles.MiniContainer}>
          Content
          <textarea
            id="content"
            onChange={resizeField}
            ref={contentRef}
            autoComplete="off"
          />
        </div>
        <Button type="submit">Post</Button>
      </form>
    </Card>
  );
};

export default NewPost;
