package br.com.marcelleluna.todolist.sevice;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import br.com.marcelleluna.todolist.entity.Todo;
import br.com.marcelleluna.todolist.enums.StatusToDo;

import br.com.marcelleluna.todolist.repository.TodoRepository;

@Service
public class TodoService {
    private TodoRepository todoRepository;
    
    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> create(Todo todo){

        return list();
    }

    public List<Todo> list(){
        Sort sort = Sort.by("title");
        return todoRepository.findAll(sort);
    }

    public List<Todo> update(Todo todo){
        todoRepository.save(todo);
        return list();        
    }

    public List<Todo> delete(Long id){
        todoRepository.deleteById(id);;
        return list();        
    }

    public Todo markAsCompleted(Long id) {
        Optional<Todo> todoOptional = todoRepository.findById(id);
        if (todoOptional.isPresent()) {
            Todo todo = todoOptional.get();
            todo.setStatus(StatusToDo.CONCLUIDO);
            return todoRepository.save(todo);
        }
        return null;
    }

    public Todo findById(Long id) {
        Optional<Todo> todo = todoRepository.findById(id);
        return todo.orElse(null);
    }

    public Todo save(Todo todo) {
        return todoRepository.save(todo);
    }
}
