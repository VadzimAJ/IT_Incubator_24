import React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./app/store";
import {TasksStateType, TodolistType} from "./app/App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./model/tasks-reducer";
import {changeTodolistTitleAC, removeTodolistAC} from "./model/todolists-reducer";

export const Todolists = () => {
    const tasks = useSelector<RootState, TasksStateType>((state) => state.tasks)
    const todolists = useSelector <RootState, TodolistType[]> ((state) => state.todolists)

    const dispatch = useDispatch();

    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC({taskId, todolistId}))

    }

    const addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC({title, todolistId}))
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC({taskId, todolistId, isDone:taskStatus}))
    }

    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }



    const updateTask = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId, title}))
    }

    const updateTodolist = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC({id:todolistId, title}))
    }

    return (
        <>
            {todolists.map((tl) => {

                const allTodolistTasks = tasks[tl.id]
                let tasksForTodolist = allTodolistTasks

                if (tl.filter === 'active') {
                    tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                }

                if (tl.filter === 'completed') {
                    tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                }

                return (
                    <Grid key={tl.id}>
                        <Paper sx={{p: '0 20px 20px 20px'}}>
                            <Todolist
                                todolist = {tl}
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                addTask={addTask}
                                changeTaskStatus={changeTaskStatus}
                                removeTodolist={removeTodolist}
                                updateTask={updateTask}
                                updateTodolist={updateTodolist}
                            />
                        </Paper>
                    </Grid>
                )
            })}
        </>
    );
};

