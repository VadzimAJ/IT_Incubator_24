import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import { AddTodolistActionType, RemoveTodolistActionType } from './todolists-reducer';

export type RemoveActionType = ReturnType <typeof removeTaskAC>
export type AddActionType =  ReturnType <typeof addTaskAC>
export type ChangeTaskStatusType =  ReturnType <typeof changeTaskStatusAC>

export type ChangeTaskTitleType =  ReturnType <typeof changeTaskTitleAC>

export type AddTodolistType =  ReturnType <typeof AddTodolistAC>

type ActionsType = RemoveActionType
                | AddActionType 
                | ChangeTaskStatusType
                | ChangeTaskTitleType
                | AddTodolistType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
  switch (action.type) {
      case 'REMOVE-TASK':{
        return {
          ...state,
          [action.todolistId]: state[action.todolistId]
            .filter (t => t.id !== action.taskId)
        }
      }

      case 'ADD-TASK': {
        const newTask = { id: v1(), title: action.title, isDone: false };
        return {
          ...state,
          [action.todolistId]: [newTask, ...state[action.todolistId]]
        }
      }

      case 'CHANGE-TASK-STATUS': {

        return {
          ...state,
          [action.todolistId]: state[action.todolistId]
            .map(t=> t.id === action.taskId ? {...t, isDone:action.isDone}:t)
          
        }
      }

      case 'CHANGE-TASK-TITLE': {

        return {
          ...state,
          [action.todolistId]: state[action.todolistId]
            .map(t=> t.id === action.taskId ? {...t, title:action.title}:t)
          
        }
      }

      case 'ADD-TODOLIST': {
        return {
          ...state,
          [action.todolistId]:[]
        }
      }

          
      default:
          throw new Error("I don't understand this type")
  }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
  return { type: 'REMOVE-TASK', taskId, todolistId} as const
}

export const addTaskAC = (title: string, todolistId: string) => {
  return { type: 'ADD-TASK', title, todolistId } as const;
}

export const changeTaskStatusAC = (taskId: string,  isDone: boolean, todolistId: string) => {
  return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId} as const;
}

export const changeTaskTitleAC = (taskId: string,  title: string, todolistId: string) => {
  return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId} as const;
}

export const AddTodolistAC = (title: string, todolistId: string) => {
  return {type: 'ADD-TODOLIST', title, todolistId } as const;
}