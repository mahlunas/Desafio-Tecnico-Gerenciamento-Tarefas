import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";

const FormTodo = ()  => {
    
    const [title, setTitle] = useState("");
    const [endDate, setEndDate] = useState("");

    //const currentDate = new Date().toISOString();

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
        <div>
            <h1>New Task</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter the task" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required/>
                <button type="submit" disabled={mutation.isLoading}>{mutation.isLoading ? "Adding" : "Add task"}</button>
                <button type="button">Delete</button>
                {mutation.isError && <p>Erro ao adicionar tarefa: {mutation.error.message}</p>}
            </form>
        </div>
    )
}

export default FormTodo