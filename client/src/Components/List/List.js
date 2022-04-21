import React from "react";
import Card from "../UI/Card";
import styles from "./List.module.css";
import ListItem from "./ListItem";
import AddItem from "./AddItem";

const List = (props) => {
  return (
    <Card className={styles.listCard}>
      <h1>Main list</h1>
      {props.listData.map((item) => {
        return (
          <ListItem
            key={item.item_id}
            id={item.item_id}
            name={item.name}
            completed={item.completed}
          ></ListItem>
        );
      })}
      <AddItem />
    </Card>
  );
};

export default List;
