import React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import {useSelector} from "react-redux";
import {RootState} from "../../../../app/store";
import {TodolistType} from "../../../../app/App";

export const Todolists = () => {
    const todolists = useSelector <RootState, TodolistType[]> ((state) => state.todolists)

    return (
        <>
            {todolists.map((tl) => {
                return (
                    <Grid key={tl.id}>
                        <Paper sx={{p: '0 20px 20px 20px'}}>
                            <Todolist
                                key={tl.id}
                                todolist = {tl}
                            />
                        </Paper>
                    </Grid>
                )
            })}
        </>
    );
};

