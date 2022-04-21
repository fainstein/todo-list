import React, { useState, useEffect } from "react";
import "./App.css";
import List from "./Components/List/List";
import axios from "axios";

function App() {
  // const DUMMY_TODO_LIST = [
  //   { id: 1, name: "Go to the store", completed: false },
  //   {
  //     id: 2,
  //     name: "Buy food, then cook it, and all necesary things to be feeded properly!",
  //     completed: false,
  //   },
  //   { id: 3, name: "Eat food", completed: false },
  // ];

  const [list, setList] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  const getList = () => {
    // setIsLoading(true);
    axios
      .get("http://localhost:4000/")
      .then((response) => response.data)
      .then((response) => {
        // setIsLoading(false);
        setList(response);
      })
      .catch((err) => {
        // setError(err);
        // setIsLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getList();
  }, [getList]);

  let listDisplay;
  // if (isLoading) {
  //   listDisplay = <p>Loading...</p>;
  // } else if (error) {
  //   listDisplay = <p>Something went wrong...</p>;
  // } else {
    listDisplay = <List listData={list} />;
  // }

  return <main>{listDisplay} </main>;
}

export default App;
