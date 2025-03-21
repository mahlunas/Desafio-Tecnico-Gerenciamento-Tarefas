import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";

const FormTodo = ()  => {
    
    const [title, setTitle] = useState("");
    const [endDate, setEndDate] = useState("");

    const queryClient = useQueryClient(); 

    const mutation = useMutation( {
        mutationFn: async (newTask) => {
            console.log("Enviando tarefa para API:", newTask);
            const response = await api.post("/todos", newTask);
            console.log("Resposta da API:", response.data);
            return response.data;
          },
          onSuccess: () => {
            queryClient.invalidateQueries(["todos"]);
            setTitle("");
            setEndDate("");
          },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({title, endDate, creationDate: new Date().toISOString().split("T")[0], status: "PENDENTE"});
    };

    return (
        <div className="bg-[#bcfbc5] p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-6 text-center">Nova Tarefa</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">Título da Tarefa</label>
          <input
            type="text"
            id="title"
            placeholder="Digite a tarefa"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block text-lg font-medium text-gray-700">Data de Conclusão</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            disabled={mutation.isLoading}
            className={`w-1/2 py-2 text-white font-semibold rounded-md focus:outline-none ${
              mutation.isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {mutation.isLoading ? "Adicionando..." : "Adicionar Tarefa"}
          </button>

          <button
            type="button"
            className="w-1/2 py-2 bg-red-500 text-white font-semibold rounded-md focus:outline-none hover:bg-red-600"
            onClick={() => {
              setTitle("");
              setEndDate("");
            }}
          >
            Limpar
          </button>
        </div>
      </form>

      {mutation.isError && (
        <p className="mt-4 text-red-500 text-center">
          Erro ao adicionar tarefa: {mutation.error.message}
        </p>
      )}
    </div>
    )
}

export default FormTodo