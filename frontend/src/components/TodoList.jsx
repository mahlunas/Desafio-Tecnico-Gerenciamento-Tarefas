import React, {useEffect, useState} from "react";
import api from "../services/api";

const TodoList = () =>{
const [todos, setTodos] = useState([]);

useEffect(() => {
  api.get("/todos")
    .then((response) => {
      console.log("Dados da API:", response.data);
      setTodos(response.data);
    })
    .catch((error) => console.error("Erro ao buscar tarefas:", error));
}, []);


  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
