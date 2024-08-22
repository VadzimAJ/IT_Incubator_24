import axios, { AxiosRequestConfig } from 'axios'
import { title } from 'process'
import React, { useEffect, useState } from 'react'
import { todolistAPI } from '../api/todolist-api'

export default {
  title: 'API',
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistAPI.getTodolist()
    .then(res => {
      console.log(res.data)
      setState(res.data)
    })
  
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const title = 'GraphQL'
    todolistAPI.createTodolist(title)
    .then(res => {
      console.log(res.data)
      setState(res.data)
    })
    
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)

  const taskId = "f6c7047e-326f-4306-9146-29bed48be8a1"
  useEffect(() => {
    todolistAPI.deleteTodolist(taskId)
    .then(res => {
      console.log(res.data)
      setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  const taskId = "3a85b506-8fb3-4153-801b-eb10e99bfc73"
  const title = 'HTML'
  useEffect(() => {
    todolistAPI.updateTodolist(taskId, title)
    .then(res => {
      console.log(res.data)
      setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
