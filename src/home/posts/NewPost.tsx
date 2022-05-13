import { useRef, useState } from "react";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import styles from "../../UI/Form.module.css";
import verifyLogin from "../../auth/VerifyLogin";
import Cookie from "universal-cookie";

interface Props {
  refreshList: Function;
}

const NewPost = ({ refreshList }: Props) => {
  const cookie = new Cookie();
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [errorState, setErrorState] = useState([{ message: "e", key: "e" }]);
  const [isLoading, setIsLoading] = useState(false);

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

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const sessionIsValid = await verifyLogin(
      cookie.get("userId"),
      cookie.get("sessionId")
    );
    if (sessionIsValid) {
      let statusCode = 0;
      fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/newpost`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postData: {
            title: titleRef.current?.value,
            content: contentRef.current?.value,
            creatorId: cookie.get("userId"),
          },
        }),
      })
        .then((res) => {
          statusCode = res.status;
          setIsLoading(false);
          if (statusCode === 201) {
            setErrorState([{ message: "e", key: "e" }]);
          }
          return res.json();
        })
        .then((res) => {
          if (statusCode != 201) {
            if (res?.message?.errors) {
              let errors: { message: string; key: string }[] = [];
              for (const error in res.message.errors) {
                const errorData = {
                  message: res.message.errors[error].message,
                  key: error,
                };
                errors.push(errorData);
              }
              setErrorState(errors);
            }
          } else {
            if (titleRef.current?.value != undefined) {
              titleRef.current.value = "";
            }
            if (contentRef.current?.value != undefined) {
              contentRef.current.value = "";
            }
            refreshList();
          }
        });
    }
  };

  return (
    <Card>
      <form className={styles.Form} onSubmit={submitHandler}>
        {errorState[0].message != "e" &&
          errorState.map((e) => (
            <div className={styles.Error} key={e.key}>
              {e.message}
            </div>
          ))}
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
        <Button isLoading={isLoading} type="submit">
          Post
        </Button>
      </form>
    </Card>
  );
};

export default NewPost;
