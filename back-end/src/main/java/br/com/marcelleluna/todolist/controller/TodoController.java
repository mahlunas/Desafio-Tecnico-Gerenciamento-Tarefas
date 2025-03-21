package br.com.marcelleluna.todolist.controller;

import java.util.List;

import br.com.marcelleluna.todolist.enums.StatusToDo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.marcelleluna.todolist.entity.Todo;
import br.com.marcelleluna.todolist.sevice.TodoService;

@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Todo", description = "Endpoints para Gerenciamento de tarefas")
public class TodoController {

    private TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @Operation(summary = "Create a new task", description = "Add a new task in database")
    @PostMapping
    List<Todo> create(@RequestBody Todo todo){
        return todoService.create(todo);
    }

    @Operation(summary = "List all tasks", description = "Returns a list of all registered tasks")
    @GetMapping
    List<Todo> list(){
        return todoService.list();
    }

    @Operation(summary = "Update a task", description = "Update a task in database")
    @PutMapping("/{id}")
    public ResponseEntity<Todo> update(@PathVariable Long id, @RequestBody Todo todo){
        todo.setId(id);
        Todo updatedTodo = todoService.save(todo);
        return ResponseEntity.ok(updatedTodo);
    }

    @Operation(summary = "Delete a task", description = "Delete a task by Id in database")
    @DeleteMapping("{id}")
    List<Todo> delete(@PathVariable("id") Long id){
        return todoService.delete(id);
    }

    @Operation(summary = "Change status")
    @PutMapping("/{id}/status")
    public ResponseEntity<Todo> markAsCompleted(@PathVariable Long id) {
        Todo todo = todoService.findById(id);
        if (todo == null) {
            return ResponseEntity.notFound().build();
        }
        todo.setStatus(StatusToDo.CONCLUIDO);
        Todo updatedTodo = todoService.save(todo);
        return ResponseEntity.ok(updatedTodo);
    }
}
