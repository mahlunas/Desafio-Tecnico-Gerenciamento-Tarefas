package br.com.marcelleluna.todolist.entity;

import br.com.marcelleluna.todolist.enums.StatusToDo;
import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDate;

@Entity
@Table(name = "todos")
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;

    @Enumerated(EnumType.ORDINAL)
    private StatusToDo status;

    @CreatedDate
    @Column(updatable = false)
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

    public StatusToDo getStatus() {

        return status;
    }

    public void setStatus(StatusToDo status) {

        this.status = status;
    }

    public LocalDate getEndDate() {

        return endDate;
    }

    public void setEndDate(LocalDate endDate) {

        this.endDate = endDate;
    }
}
