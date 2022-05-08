import React from "react";
import styles from "./Card.module.css";

interface Props {
  className?: string;
}

const Card: React.FC<Props> = (props) => {
  const classes = `${styles.Card} ${props.className}`;
  return <div className={classes}>{props.children}</div>;
};

export default Card;