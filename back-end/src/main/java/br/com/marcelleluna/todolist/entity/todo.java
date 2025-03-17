package br.com.marcelleluna.todolist.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import br.com.marcelleluna.todolist.model.StatusToDo;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table (name = "todos")
public class todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @CreatedDate
    private long id;
    private String title;
    private String description;
    private StatusToDo status;
    private LocalDate creationDate;
    private LocalDate endDate;

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public StatusToDo getStatus() {
        return status;
    }
    public void setStatus(StatusToDo status) {
        this.status = status;
    }
    public LocalDate getCreationDate() {
        return creationDate;
    }
    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }
    public LocalDate getEndDate() {
        return endDate;
    }
    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    
}