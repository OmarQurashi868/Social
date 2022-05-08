import React from "react";
import styles from "./Button.module.css";

interface Props {
  className?: String;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: JSX.Element | String;
  type?: String;
  id?: String;
  isLoading?: Boolean;
}

const Button = (props: Props) => {
  const classes = `${styles.Button} ${props.className}`;
  return (
    <button className={classes} onClick={props.onClick}>
      {!props.isLoading ? props.children : <div className={styles.Loader}></div>}
    </button>
  );
};
export default Button;
