import React from 'react';
import Button from "@mui/material/Button";
import {FilterValuesType, TodolistType} from "../../../../../../app/App";
import Box from "@mui/material/Box";
import {useDispatch} from "react-redux";
import {changeTodolistFilterAC} from "../../../../model/todolists-reducer";
import {filterButtonsContainerSx} from "./FilterTasksButtons.style";
import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch";


type Props = {
    todolist:TodolistType
}

export const FilterTasksButtons = ({todolist}: Props) => {
    const dispatch = useAppDispatch();

    const changeFilterTasksHandler = (filter:FilterValuesType) => {
        dispatch(changeTodolistFilterAC({id: todolist.id, filter}))
    }

    return (
            <Box sx={filterButtonsContainerSx}>
                <Button
                    variant={todolist.filter === 'all' ? 'outlined' : 'text'}
                    color={'inherit'}
                    onClick={() => changeFilterTasksHandler('all')}>
                    All
                </Button>
                <Button
                    variant={todolist.filter === 'active' ? 'outlined' : 'text'}
                    color={'primary'}
                    onClick={() => changeFilterTasksHandler('active')}>
                    Active
                </Button>
                <Button
                    variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
                    color={'secondary'}
                    onClick={() => changeFilterTasksHandler('completed')}>
                    Completed
                </Button>
            </Box>
    );
};

