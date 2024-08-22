import { CreateTodolist } from './../stories/todolists-api.stories';
import axios, { AxiosRequestConfig } from 'axios'



const instance = axios.create({
  baseURL:"https://social-network.samuraijs.com/api/1.1",
  withCredentials: true,
  headers: {
    'API-KEY' : '01bf4acb-f3e9-4513-8766-774aca9b4f02'
  }
})

export const todolistAPI = {
  getTodolist() {
    const promise = instance.get<TodolistType>(
      '/todo-lists/'
    )
    return promise
  },
  createTodolist(title: string) {
  return instance.post<ResponseType>('/todo-lists/', {title})
  },
  updateTodolist(todolistId: string, title: string) {
    const promise = instance.put<ResponseType<{item:TodolistType}>>(
      `/todo-lists/${todolistId}`,
      { title: title }
    )
    return promise
  },
  deleteTodolist(todolistId: string) {
    const promise = instance.delete<ResponseType>(
      `/todo-lists/${todolistId}`
    )
    return promise
  }
}

type ResponseType<T = {}> = {
  "data": T
  "title": string
  "fieldsErrors": string[]
  "resultCode": number
  "messages": string[]
}

type TodolistType = {
  "id": string
  "title": string
  "addedDate": string
  "order": number
}