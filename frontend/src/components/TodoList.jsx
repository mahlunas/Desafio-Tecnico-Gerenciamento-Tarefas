import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

const fetchTodos = async () => {
  const response = await api.get("/todos");
  return response.data;
};

const TodoList = () =>{
  const { data: todos, isLoading, isError, error } = useQuery({
    queryKey: ["todos"], // Chave única para armazenar o cache
    queryFn: fetchTodos, // Função para buscar os dados
  });

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao buscar tarefas: {error.message}</p>;

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
