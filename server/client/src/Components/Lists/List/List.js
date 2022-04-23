import React from "react";
import Card from "../../UI/Card";
import styles from "./List.module.css";
import ListItem from "./ListItem";
import AddItem from "./AddItem";

const List = (props) => {

  const goBackHandler = () => {
    props.onReturn(false);
  }
  
  return (
    <Card className={styles.listCard}>
      <div>
        <span onClick={goBackHandler} className={`${styles.backBtn} material-symbols-outlined material-icons`}>arrow_back</span>
        <h1>{props.listName}</h1>
      </div>
      {props.listData.map((item) => {
        return (
          <ListItem
            key={item.item_id}
            id={item.item_id}
            name={item.name}
            completed={item.completed}
            updateList={props.updateList}
            listId={props.listId}
          ></ListItem>
        );
      })}
      <AddItem listId={props.listId} updateList={props.updateList} />
    </Card>
  );
};

export default List;
