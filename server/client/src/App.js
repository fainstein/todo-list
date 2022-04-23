import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Lists from "./Components/Lists/Lists";

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

  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLists = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:4000/");
      if (!response.ok) {
        throw new Error("Something went wrong...");
      }
      const data = await response.json();
      setLists(data);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getLists();
  }, [getLists]);

  let listsDisplay;
  if (isLoading) {
    listsDisplay = <p>Loading...</p>;
  } else if (error) {
    listsDisplay = <p>Something went wrong...</p>;
  } else {
    listsDisplay = <Lists listsArray={lists} updateLists={getLists} />;
  }

  return <main>{listsDisplay}</main>;
}

export default App;
