// EditTodo.jsx
import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

const editTodo = async (id, updatedData) => {
  await api.put(`/todos/${id}`, updatedData);
};

const EditTodo = ({ todo, onCancel }) => {
  const [title, setTitle] = useState(todo.title);
  const [status, setStatus] = useState(todo.status);
  const [endDate, setEndDate] = useState(todo.endDate);
  
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (updatedTodo) => editTodo(todo.id, updatedTodo),
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      title,
      status,
      endDate,
    });
  };

  return (
    <div className="bg-[#fac1c0] p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Editar Tarefa</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300"
          >
            <option value="PENDENTE">Pendente</option>
            <option value="EM_ANDAMENTO">Em Andamento</option>
            <option value="CONCLUIDO">Concluído</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Data de Entrega</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-black py-2 px-4 rounded-md"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-[#bdb2ff] text-black py-2 px-4 rounded-md"
          >
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTodo;
