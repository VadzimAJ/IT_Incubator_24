import React, {ChangeEvent} from 'react';
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../../../../../../common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType, TodolistType} from "../../../../../../app/App";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../../../model/tasks-reducer";
import {getListItemSx} from "./Task.style";
import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch";


type Prorps = {
    task: TaskType
    todolist: TodolistType
}
export const Task = ({todolist, task}: Prorps ) => {

    const dispatch = useAppDispatch();

    const removeTaskHandler = () => {
        dispatch(removeTaskAC({taskId: task.id, todolistId: todolist.id}))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC({taskId: task.id, todolistId: todolist.id, isDone:newStatusValue}))
    }

    const changeTaskTitleHandler = (title: string) => {
        dispatch(changeTaskTitleAC({taskId: task.id, todolistId: todolist.id, title}))
    }

    return (
        <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
            </div>
            <IconButton onClick={removeTaskHandler}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    );
};