import React from "react";
import axios from "axios";

const FormTodo = ({onTaskAdded})  => {
    
    return (
        <div>
            <h1>New Task</h1>
            <form>
                <input type="text" placeholder="Enter the task"/>
                <input type="date" />
                <button type="submit">Add task</button>
                <button type="reset">Delete</button>
            </form>
        </div>
    )
}

export default FormTodo