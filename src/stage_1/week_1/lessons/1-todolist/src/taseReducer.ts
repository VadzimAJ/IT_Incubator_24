import { TaskType } from './App'
import {v1} from "uuid";



type ActionsType =
    |RemoveTaskActionType
    |AddTaskActionType


export const tasksReducer = (state: TaskType[], action: ActionsType): TaskType[] => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return state.filter((task: TaskType) => task.id === action.payload.id)


        case 'ADD-TASK':
            const newTask = {
                id: v1(),
                title: action.payload.title,
                isDone: false
            }

            return [newTask, ...state]

        default:
            return state
    }
}

export const removeTaskAC = (id: string) : RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            id
        }
    } as const
}

type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    payload: {
        id: string
    }
}

export const addTaskAC = (title: string) : AddTaskActionType => {
    return {
        type: 'ADD-TASK',
        payload: {
            title
        }
    } as const
}


type AddTaskActionType = {
    type: 'ADD-TASK',
    payload: {
        title : string
    }
}
