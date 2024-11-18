import React from 'react';
import List from "@mui/material/List";
import {TasksStateType, TodolistType} from "../../../../../app/App";
import { useSelector} from "react-redux";
import {RootState} from "../../../../../app/store";
import {Task} from "./Task/Task";


type Prorps = {
    todolist: TodolistType
}
export const Tasks = ({todolist}: Prorps ) => {
    const tasks = useSelector<RootState, TasksStateType>((state) => state.tasks)
    const allTodolistTasks = tasks[todolist.id]

    let tasksForTodolist = allTodolistTasks

    if (todolist.filter === 'active') {
        tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
    }

    if (todolist.filter === 'completed') {
        tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
    }

    return (
        <>
            {
                tasksForTodolist.length === 0
                    ? <p>Тасок нет</p>
                    : <List>
                        {tasksForTodolist.map((task) => <Task key={task.id} task={task} todolist={todolist}/>)}
                    </List>
            }
        </>
    );
};

export default Tasks;