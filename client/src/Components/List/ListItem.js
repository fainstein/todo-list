import React, { useState } from "react";
import styles from "./ListItem.module.css";
import Hr from "../UI/Hr";
import axios from "axios";

const ListItem = (props) => {
  const [itemCompleted, setItemCompleted] = useState(props.completed);
  const [isEditing, setIsEditing] = useState(false);
  const [itemName, setItemName] = useState(props.name);

  const itemClickHandler = () => {
    axios.put("http://localhost:4000/completeItem", {
      completed: !itemCompleted,
      id: props.id,
    });
    props.updateList();
    setItemCompleted(!itemCompleted);
  };

  const editHandler = () => {
    setIsEditing(true);
  };

  const deleteHandler = () => {
    axios.post("http://localhost:4000/deleteItem", {
      id: props.id,
    });
    props.updateList();
  };

  const editConfirmHandler = (e) => {
    e.preventDefault();
    setIsEditing(false);
    axios.put("http://localhost:4000/editItem", {
      name: itemName,
      id: props.id,
    });
    props.updateList();
  };

  const itemNameChangeHandler = (e) => {
    setItemName(e.target.value);
  };

  const itemNameLabel = itemCompleted ? (
    <del>
      <p className={styles.itemName}>{itemName}</p>
    </del>
  ) : (
    <p className={styles.itemName}>{itemName}</p>
  );

  const itemDefaultDisplay = (
    <>
      <div className={styles.item}>
        <div className={styles.itemData} onClick={itemClickHandler}>
          <input
            checked={itemCompleted}
            onChange={itemClickHandler}
            type="checkbox"
          ></input>
          {itemNameLabel}
        </div>
        <div className={styles.controlers}>
          <span
            onClick={editHandler}
            className="material-icons-outlined material-icons"
          >
            edit
          </span>
          <span
            onClick={deleteHandler}
            className="material-icons-outlined material-icons"
          >
            delete
          </span>
        </div>
      </div>
    </>
  );

  const itemEditDisplay = (
    <form className={styles.editItemForm}>
      <input
        onChange={itemNameChangeHandler}
        type="text"
        value={itemName}
      ></input>
      <button onClick={editConfirmHandler}>Confirm</button>
    </form>
  );

  return (
    <>
      {isEditing ? itemEditDisplay : itemDefaultDisplay}
      <Hr />
    </>
  );
};

export default ListItem;
