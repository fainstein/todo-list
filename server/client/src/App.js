import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import List from "./Components/List/List";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const getList = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:4000/");
      if (!response.ok) {
        throw new Error("Something went wrong...");
      }
      const data = await response.json();
      setList(data);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getList();
  }, [getList]);

  let listDisplay;
  if (isLoading) {
    listDisplay = <p>Loading...</p>;
  } else if (error) {
    listDisplay = <p>Something went wrong...</p>;
  } else {
    listDisplay = <List listData={list} updateList={getList} />;
  }

  return <main>{listDisplay} </main>;
}

export default App;
