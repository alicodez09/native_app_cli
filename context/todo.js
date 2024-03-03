import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

//context
const TodoContext = createContext();
const TodoProvider = ({ children }) => {
  //state
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);

  //get todos
  const getAllPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/todo/get-all-todo");
      setTodos([...data?.todos] || []); // Update this line
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // initial todos
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <TodoContext.Provider value={[todos, setTodos, getAllPosts]}>
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
