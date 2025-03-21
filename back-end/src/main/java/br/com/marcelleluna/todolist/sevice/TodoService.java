package br.com.marcelleluna.todolist.sevice;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import br.com.marcelleluna.todolist.entity.Todo;

import br.com.marcelleluna.todolist.repository.TodoRepository;

@Service
public class TodoService {
    private TodoRepository todoRepository;
    
    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> create(Todo todo){
        if (todo.getCreationDate() == null) {
            todo.setCreationDate(LocalDate.now());
        }

        todoRepository.save(todo);
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
}
