
import { debug } from "util";
import { TasksStateType } from "../App";
import { v1 } from "uuid";

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK',
  payload: {
    taskId: string,
    todolistId: string
  }
}

export type AddTaskActionType = {
  type: 'ADD-TASK',
  payload: {
    title: string,
    todolistId: string
  }
}

export type ChangeTaskStatusType = {
  type: 'CHANGE-TASK-STATUS',
  payload: {
    taskId: string,
    isDone: boolean,
    todolistId: string
  }
}

export type ChangeTaskTitileType = {
  type: 'CHANGE-TASK-TITLE',
  payload: {
    title: string,
    taskId: string,
    todolistId: string
  }
}

export type AddTodolistActionType = {
  type: 'ADD-TODOLIST',
  payload: {
    todolistId: string,
    title: string,
  }
}
export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST',
  payload: {
    todolistId: string
  }
}

export type TaskActionsType = 
RemoveTaskActionType
|AddTaskActionType
|ChangeTaskStatusType
|ChangeTaskTitileType
|AddTodolistActionType
|RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: TaskActionsType) : TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      const stateCopy = {...state}
      stateCopy[action.payload.todolistId] = state[action.payload.todolistId].filter( task => task.id !== action.payload.taskId)
      return stateCopy
    }

    case 'ADD-TASK': {
      const newTask = {
        id: v1(),
        title: action.payload.title,
        isDone: false
      }

      const stateCopy = {
        ...state,
        [action.payload.todolistId]:[newTask, ...state[action.payload.todolistId]]}
      return stateCopy
    }

    case 'CHANGE-TASK-STATUS': {

      const stateCopy = {...state}

      stateCopy[action.payload.todolistId] = state[action.payload.todolistId]
      .map (
        task => task.id === action.payload.taskId 
        ? {...task, isDone: action.payload.isDone }
        : task
      )
      return stateCopy
    }

    case 'CHANGE-TASK-TITLE': {
      const stateCopy = {...state}

      stateCopy[action.payload.todolistId] = state[action.payload.todolistId]
      .map(task => task.id === action.payload.taskId
        ? {...task, title: action.payload.title}
        : task
      )

      return stateCopy
    }

    case 'ADD-TODOLIST': {

      const newState = {...state, 
        [action.payload.todolistId]: []}
      return newState;
    }
    case 'REMOVE-TODOLIST': {

      const newState = {...state};
            delete newState[action.payload.todolistId];
            return newState;
    }

    default:
      throw new Error("I don't understand this type")
  }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return {type: 'REMOVE-TASK', payload: {taskId, todolistId}} as const
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
  return {type: 'ADD-TASK', payload: {title, todolistId}} as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusType => {
  return {type: 'CHANGE-TASK-STATUS', payload: {taskId, isDone, todolistId}} as const
}

export const changeTaskTitleAC = (title: string, todolistId: string, taskId: string): ChangeTaskTitileType => {
  return {type: 'CHANGE-TASK-TITLE', payload: {title, todolistId, taskId}} as const
}
