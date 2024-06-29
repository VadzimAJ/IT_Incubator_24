import {TasksStateType, TodolistType} from './App'

export const todoReducer = (state: TodolistType[], action: any): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODO':
            return state
        default:
            return state
    }
}

export const removeToDoAC = (id: string): RemoveToDoActionType => {
    return {
        type: 'REMOVE-TODO',
        payload: {
            id: id
        }
    } as const
}

type RemoveToDoActionType = {
    type: 'REMOVE-TODO',
    payload: {
        id: string
    }
}

type ActionType = RemoveToDoActionType