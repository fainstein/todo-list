import React, { useState } from "react";
import styles from "./AddItem.module.css";
import axios from "axios";

const AddItem = (props) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newItemName, setNewItemName] = useState("");

  const openFormHandler = () => {
    setIsAdding(true);
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    setNewItemName("");
    setIsAdding(false);
  };

  const addHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/addItem", {
      item: newItemName,
      listId: props.listId,
    });
    setNewItemName("");
    props.updateList(props.listId);
    setIsAdding(false);
  };

  const inputChangeHandler = (e) => {
    setNewItemName(e.target.value);
  };

  const addItemPreview = (
    <div className={styles.preview} onClick={openFormHandler}>
      <span className="material-icons-outlined material-icons">
        add_circle_outline
      </span>
      <p>Add new</p>
    </div>
  );
  const addItemForm = (
    <form className={styles.addItemForm}>
      <input
        value={newItemName}
        onChange={inputChangeHandler}
        name="newItem"
        type="text"
        placeholder="Buy snacks..."
      ></input>
      <div className={styles.buttons}>
        <button onClick={cancelHandler}>Cancel</button>
        <button onClick={addHandler}>Add Item</button>
      </div>
    </form>
  );
  return <>{isAdding ? addItemForm : addItemPreview}</>;
};

export default AddItem;
