import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../stage2_l4/App";

let todolistID1 = v1()
let todolistID2 = v1()


const initialState: TodolistType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        id: string
    }
}

export type AddTodoolistActionType = {
    type: 'ADD-TODOLIST',
    payload: {
        title: string
    }
}

export type ChangeTodoolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
        id: string,
        title: string
    }
}

export type ChangeTodoolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
        id: string,
        filter: FilterValuesType
    }
}


type ActionType =
    | RemoveTodolistActionType
    | AddTodoolistActionType
    | ChangeTodoolistTitleActionType
    | ChangeTodoolistFilterActionType


export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id);
        }

        case 'ADD-TODOLIST': {
            const todolistId = v1()
            const newTodolist: TodolistType = {id: todolistId, title: 'New Todolist', filter: 'all'};

            return ([...state, newTodolist])
        }

        case 'CHANGE-TODOLIST-TITLE' : {
            return state.map(tl => (tl.id === action.payload.id) ?
                {...tl, title: action.payload.title} : tl)
        }

        case 'CHANGE-TODOLIST-FILTER' : {
            return state.map(tl => tl.id === action.payload.id ?
                {...tl, filter: action.payload.filter}
                : tl
            )
        }

        //switch писать над default
        default:
            return state;
    }

}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', payload: {id: todolistId}} as const
}

export const addTodolistAC = (title: string): AddTodoolistActionType => {
    return {type: 'ADD-TODOLIST', payload: {title} } as const
}

export const changeTodolistTitleAC = (id:string, title: string): ChangeTodoolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', payload: {id, title}} as const
}

export const changeTodolistFilterAC = (id:string, filter: FilterValuesType): ChangeTodoolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', payload: {id, filter}} as const
}


