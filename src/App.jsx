import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'

function useTodos(n) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  function getTodos() {
    axios
      .get("https://dummyjson.com/todos/random")
      .then((res) => {
        console.log(res.data)
        setTodos(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("error while fetching data", error);
      });
  }

  useEffect(() => {
    getTodos();

    const todoIntervalId = setInterval(() => {
      getTodos();
    }, n * 1000);

    return () => {
      clearInterval(todoIntervalId);
    };
  },[n]);
  return {
    todos: todos,
    loading: loading,
  };
}

function App() {
  const { todos, loading } = useTodos(6);
  if(loading){
    return <div>Loading...</div>
  }

  return (
    <>
      <h4>{todos.id}</h4>
      <h4>{todos.todo}</h4>
    </>
  );
}

export default App;
