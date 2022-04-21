import React from "react";
import styles from "./Card.module.css";

const Card = (props) => {
  let classes = props.className
    ? `${props.className} ${styles.card}`
    : `${styles.card}`;
  return <div className={classes}>{props.children}</div>;
};

export default Card;
