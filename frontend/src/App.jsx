import './App.css'
import TodoList from './components/TodoList'
import FormTodo from './components/FormTodo'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <TodoList/>
        <FormTodo/>
      </QueryClientProvider>
        
    </div>
  )
}

export default App
