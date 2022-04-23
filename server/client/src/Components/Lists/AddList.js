import React, { useState } from "react";
import axios from "axios";
import styles from './List/AddItem.module.css';
const AddList = (props) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newListName, setNewListName] = useState("");

  const openFormHandler = () => {
    setIsAdding(true);
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    setNewListName("");
    setIsAdding(false);
  };

  const addHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/addList", {
      list: newListName,
    });
    setNewListName("");
    props.updateLists();
    setIsAdding(false);
  };

  const inputChangeHandler = (e) => {
    setNewListName(e.target.value);
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
        value={newListName}
        onChange={inputChangeHandler}
        name="newItem"
        type="text"
        placeholder="Movies 🍿"
      ></input>
      <div className={styles.buttons}>
        <button onClick={cancelHandler}>Cancel</button>
        <button onClick={addHandler}>Add Item</button>
      </div>
    </form>
  );
  return <>{isAdding ? addItemForm : addItemPreview}</>;
};

export default AddList;
