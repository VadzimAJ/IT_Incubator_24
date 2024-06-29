import {TasksStateType} from "../App";
import {v1} from "uuid";
import {RemoveTodolistActionType} from "./todolists-reducer";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    id: string,
    todolstId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    todolstId: string,
    title: string
}

type ActionsType =
    |RemoveTaskActionType
    |AddTaskActionType

export const taskReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy:TasksStateType = {...state};
            const todolistTasks = stateCopy[action.todolstId]

            stateCopy[action.todolstId] = todolistTasks.filter(stateCopy => stateCopy.id !== action.id)

            return stateCopy;
        }

        case 'ADD-TASK': {
            const stateCopy:TasksStateType = {...state};
            const todolistTasks = stateCopy[action.todolstId]
            const newTask = {
                id: v1(),
                title: action.title,
                isDone: false
            }

            stateCopy[action.todolstId] = [newTask, ...todolistTasks]

            return stateCopy


            return
        }

        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (id: string, todolstId: string) : RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', id: id, todolstId: todolstId};
}

export const addTaskAC = (title: string, todolstId: string) : AddTaskActionType => {
    return {type: 'ADD-TASK', todolstId: todolstId, title: title};
}