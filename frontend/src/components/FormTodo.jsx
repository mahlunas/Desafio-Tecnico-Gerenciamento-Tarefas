import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import { useState } from "react";
import EditTodo from "./EditTodo";

const fetchTodos = async () => {
  const response = await api.get("/todos");
  return response.data;
};

const deleteTodo = async (id) => {
  await api.delete(/todos/${id});
};

const markAsCompleted = async (id) => {
  console.log("ID sendo enviado para marcar como concluído: ", id);
  await api.put(http://localhost:8080/todos/${id}/status);
};

const updateTodo = async (id, updatedTodo) => {
  await api.put(/todos/${id}, updatedTodo);
};

const TodoList = () =>{

  const [filterStatus, setFilterStatus] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(4);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState(null);

  const handleEditClick = (todo) => {
    setTodoToEdit(todo);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setTodoToEdit(null);
  };

  const handleSaveEdit = (updatedTodo) => {
    updateMutation.mutate(
      { id: updatedTodo.id, updatedTodo }, 
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["todos"]);
          handleCloseEditModal();  // Fecha o modal após salvar
        },
      }
    );
  };

  const queryClient = useQueryClient();

  const { data: todos, isLoading, isError, error } = useQuery({
    queryKey: ["todos"], 
    queryFn: fetchTodos, 
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]); 
    },
  });

  const completeMutation = useMutation({
    mutationFn: (id) => markAsCompleted(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  })

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao buscar tarefas: {error.message}</p>;

  //filter of status, if no option was selected, all tasks will be shown
  const filteredTodos = filterStatus ? todos.filter(todo => todo.status === filterStatus) : todos;

  const sortedTodos = [...filteredTodos].sort((a, b) =>
    sortOrder === "asc"
      ? a.title.localeCompare(b.title) // Ordem crescente (A-Z)
      : b.title.localeCompare(a.title) // Ordem decrescente (Z-A)
  );

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedTodos.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(sortedTodos.length / tasksPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <h1 className="text-4xl font-semibold text-center mb-6">Lista de Tarefas</h1>
      
      <label className="block text-xl font-medium mb-2">Filtros</label>
      <div className="flex mb-4">
        <div className="w-1/2 mr-2">
          <select
            className="w-full p-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="PENDENTE">Pendente</option>
            <option value="EM_ANDAMENTO">Em Andamento</option>
            <option value="CONCLUIDO">Concluído</option>
          </select>
        </div>

        <div className="w-1/2 ml-2">
          <select
            className="w-full p-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {currentTasks.map((todo) => (
          <li key={todo.id} className="bg-white p-3 rounded-lg shadow-sm flex flex-col space-y-1">
            <div className="text-sm font-semibold truncate">{todo.title}</div>
            <div className="text-xs text-gray-600">
              <p>Data de Criação: {todo.creationDate}</p>
              <p>Data de Entrega: {todo.endDate}</p>
              <p>Status: {todo.status}</p>
            </div>
            <div>
              <button onClick={() => completeMutation.mutate(todo.id)} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700">Concluir</button>
              <button onClick={() => deleteMutation.mutate(todo.id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 ml-2">Excluir</button>
              <button onClick={() => handleEditClick(todo)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 ml-2">Editar</button>
            </div>
          </li>
        ))}
      </ul>
      
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="flex items-center justify-center text-lg font-medium">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          Próxima
        </button>
      </div>

      {isEditModalOpen && todoToEdit && (<EditTodo todo={todoToEdit} onClose={handleCloseEditModal} onSave={handleSaveEdit} />)}
    </div>
  );
};

export default TodoList;
