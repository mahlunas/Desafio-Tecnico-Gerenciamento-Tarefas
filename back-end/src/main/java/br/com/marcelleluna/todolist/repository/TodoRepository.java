package br.com.marcelleluna.todolist.repository;

import br.com.marcelleluna.todolist.enums.StatusToDo;
import org.springframework.data.jpa.repository.JpaRepository;

import br.com.marcelleluna.todolist.entity.Todo;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long>{
    List<Todo> findByStatus(StatusToDo status);
}
