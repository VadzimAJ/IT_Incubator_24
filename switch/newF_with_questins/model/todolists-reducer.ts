
import { Title } from '@mui/icons-material'
import { FilterValuesType, TodolistType } from '../App'
import { v1 } from 'uuid'


export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST'
  payload: {
    todolistId: string
  }
} 

export type AddTodolistActionType = {
  type: 'ADD-TODOLIST'
  payload: {
    todolistId: string
    title: string
  }
}

export type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE'
  payload: {
    todolistId:string
    title: string
  }
}

export type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER'
  payload: {
    todolistId:string
    filter: FilterValuesType
  }
} 

export type ActionsType = 
RemoveTodolistActionType
|AddTodolistActionType
|ChangeTodolistTitleActionType
|ChangeTodolistFilterActionType

export const todolistsReducer = (state: TodolistType[] , action: ActionsType): TodolistType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id !== action.payload.todolistId)
    }

    case 'ADD-TODOLIST': {
      //????????????????????????????
      //????????????????????????????
      //????????????????????????????
      //????????????????????????????
      const newTodoList = { id: action.payload.todolistId, title: action.payload.title, filter: 'all' as FilterValuesType}
      
      //????????????????????????????
      //????????????????????????????
      //????????????????????????????
      //????????????????????????????

      return [...state, newTodoList]
    }

    case 'CHANGE-TODOLIST-TITLE': {
      return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
    }

    case 'CHANGE-TODOLIST-FILTER': {
      return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)
    }
    default:
      throw new Error("I don't understand this type")
  }
}


export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return {type: 'REMOVE-TODOLIST', payload: {todolistId}} as const
}

export const AddTodolistAC = (title:string): AddTodolistActionType => {
  return {type: 'ADD-TODOLIST', payload: {todolistId: v1(), title}} as const
}

export const changeTodolistTitle = (todolistId: string, title: string) : ChangeTodolistTitleActionType => {
  return {type: 'CHANGE-TODOLIST-TITLE', payload: {todolistId, title}}  as const
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) : ChangeTodolistFilterActionType => {
  return {type: 'CHANGE-TODOLIST-FILTER', payload: {todolistId, filter}}
}