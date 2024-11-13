

import { TasksStateType } from '../app/App'
import {v1} from "uuid";
import type { AddTodolistActionType, RemoveTodolistActionType } from './todolists-reducer';

const initialState: TasksStateType = {}

 
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      return  {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)}
    }

    case 'ADD-TASK': {
      const newTask = {
        id: v1(),
        title: action.payload.title,
        isDone: false
      }

      return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
    }

    case 'CHANGE-TASK-STATUS': {
      return {...state, 
        [action.payload.todolistId]: state[action.payload.todolistId].map(
          tl => tl.id === action.payload.taskId
          ? {...tl, isDone: action.payload.isDone}
          : tl
        )
      }
    }

    case 'CHANGE-TASK-TITLE': {
      return {...state, 
        [action.payload.todolistId]: state[action.payload.todolistId].map(
          tl => tl.id === action.payload.taskId
          ? {...tl, title: action.payload.title}
          : tl
        )
      }
    }

    case 'ADD-TODOLIST': {
			return {...state, [action.payload.id]: []}
		}

    case 'REMOVE-TODOLIST': {
        const newState = {...state}
        delete newState[action.payload.id]
        return newState
    }
 
    default:
      return state
  }
}
 
// Action creators
export const removeTaskAC = (payload: {taskId:string, todolistId: string}) => {
  return { type: 'REMOVE-TASK', payload } as const
}

export const addTaskAC = (payload: {title: string, todolistId: string}) => {
  return {type: 'ADD-TASK', payload} as const
}

export const changeTaskStatusAC = (payload: {taskId: string, isDone: boolean, todolistId: string}) => {
  return {type: 'CHANGE-TASK-STATUS', payload} as const
}

export const changeTaskTitleAC = (payload: {taskId: string, title: string, todolistId: string}) => {
  return {type: 'CHANGE-TASK-TITLE', payload} as const
}



// Actions types

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = 
  RemoveTaskActionType | 
  AddTaskActionType |
  ChangeTaskStatusActionType |
  ChangeTaskTitleActionType |
  AddTodolistActionType |
  RemoveTodolistActionType