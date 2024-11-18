import React from 'react';
import {EditableSpan} from "../../../../../common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TodolistType} from "../../../../../app/App";
import {useDispatch} from "react-redux";
import {changeTodolistTitleAC, removeTodolistAC} from "../../../model/todolists-reducer";
import styles from './TodolistTitle.module.css'

type  PropsType = {
    todolist: TodolistType
}

export const TodolistTitle = ({todolist}:PropsType) => {

    const dispatch = useDispatch()

    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(todolist.id))
    }

    const updateTodolistHandler = (title: string) => {

        dispatch(changeTodolistTitleAC({id: todolist.id, title: todolist.title}))
    }

    return (
        <div className={styles.container}>
            <h3><EditableSpan value={todolist.title} onChange={updateTodolistHandler}/></h3>
            <IconButton onClick={removeTodolistHandler}>
                <DeleteIcon/>
            </IconButton>
        </div>
    );
};
