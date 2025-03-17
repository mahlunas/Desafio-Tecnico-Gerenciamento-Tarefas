package br.com.marcelleluna.todolist.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.marcelleluna.todolist.entity.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long>{
    
}
