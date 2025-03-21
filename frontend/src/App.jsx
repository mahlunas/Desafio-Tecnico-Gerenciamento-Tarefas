import './App.css'
import TodoList from './components/TodoList'
import FormTodo from './components/FormTodo'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import './App.css'
import { useState } from 'react'
import EditTodo from './components/EditTodo'

const queryClient = new QueryClient();

function App() {
  const [showList, setShowList] = useState(true);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFDBA1]">
      <div className="w-full max-w-3xl p-8">
        {/* Botões de alternância - Agora fora do bloco principal */}
        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={() => {
              setShowList(true);
              setShowForm(false);
            }}
            className="bg-[#bdb2ff] text-black py-2 px-4 rounded-md"
          >
            Mostrar Lista
          </button>
          <button
            onClick={() => {
              setShowList(false);
              setShowForm(true);
            }}
            className="bg-[#caffbf] text-black py-2 px-4 rounded-md"
          >
            Nova Tarefa
          </button>
        </div>

        <div className="bg-[#fac1c0] p-8 rounded-lg shadow-lg h-[600px]">
          <QueryClientProvider client={queryClient}>
            {/* Exibe o TodoList ou o FormTodo com base nos estados */}
            {showList && <TodoList />}
            {showForm && <FormTodo />}
          </QueryClientProvider>
        </div>
      </div>
    </div>
  )
}

export default App
