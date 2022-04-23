import React from "react";
import styles from "./ListFolder.module.css";
import axios from "axios";

const ListFolder = (props) => {
  const listClickHandler = () => {
    props.onSelectList(props.id);
    props.setListName(props.name);
  };

  const deleteHandler = () => {
    axios.post("http://localhost:4000/deleteList", {
      id: props.id,
    });
    props.updateLists();
  };

  return (
    <div className={styles.listFolderContainer}>
      <p className={styles.listFolder} onClick={listClickHandler}>
        🔗 {props.name}
      </p>
      <span
        onClick={deleteHandler}
        className={`${styles.deleteBtn} material-icons-outlined material-icons`}
      >
        delete
      </span>
    </div>
  );
};

export default ListFolder;
