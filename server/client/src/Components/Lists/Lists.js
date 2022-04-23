import React, { useState } from "react";
import Card from "../UI/Card";
import ListFolder from "./ListFolder";
import AddList from "./AddList";
import List from "./List/List";
import axios from "axios";
import styles from './Lists.module.css'

const Lists = (props) => {
  const [isListSelected, setIsListSelected] = useState(false);
  const [listSelected, setListSelected] = useState([]);
  const [listIdSelected, setListIdSelected] = useState(0);
  const [listNameSelected, setListNameSelected] = useState("");

  const selectListHandler = async (listId) => {
    const response = await axios.get("http://localhost:4000/getList", {
      params: {
        id: listId,
      },
    });
    const data = response.data;
    setListSelected(data);
    setIsListSelected(true);
    setListIdSelected(listId);
  };

  let lists = (
    <Card className={styles.listsCard}>
      <h1>Your ToDo lists</h1>
      {props.listsArray.map((list) => {
        return (
          <ListFolder
            setListName={setListNameSelected}
            key={list.list_id}
            id={list.list_id}
            name={list.name}
            onSelectList={selectListHandler}
            updateLists={props.updateLists}
          ></ListFolder>
        );
      })}
      <AddList updateLists={props.updateLists} />
    </Card>
  );

  return (
    <>
      {isListSelected ? (
        <List
          updateList={selectListHandler}
          listId={listIdSelected}
          listData={listSelected}
          listName={listNameSelected}
          onReturn={setIsListSelected}
        ></List>
      ) : (
        lists
      )}
    </>
  );
};

export default Lists;
