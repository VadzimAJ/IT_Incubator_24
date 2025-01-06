import Checkbox from '@mui/material/Checkbox'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { AddItemForm } from '../common/components/AddItemForm/AddItemForm'
import { EditableSpan } from '../common/components/EditableSpan/EditableSpan'
import axios from "axios";
import {token_} from "./token_";
import {apiKey_} from "./token_";


type Todolist = {
  id: string
  addedDate: string
  order: number
  title: string
}

type Task = {
    description: string | null
    title: string
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type FieldError = {
  error: string
  field: string
}



type GetTasksResponse = {
    totalCount: number
    error: string | null
    items: Task[]
}

type Response<T= {}> = {
    data: T
    resultCode: number
    fieldsErrors: FieldError[]
    messages: string[]
}

export type UpdateTaskModel = {
    title: string,
    description: string,
    status: number,
    priority: number,
    startDate: string,
    deadline: string,
}

const token = token_
const apiKey = apiKey_

const configs = {
  headers: {
    Authorization: `Bearer ${token}`,
    'API-KEY': apiKey,
  }
}

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<{[key: string] : Task[]}>({})

  useEffect(() => {
    axios.get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', configs)
        .then(res => {
          const todolists = res.data
          setTodolists((todolists))
            todolists.forEach(({id})=> {
                axios
                    .get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}/tasks`, configs)
                    .then(res => {
                        setTasks(tasks => ({...tasks, [id]: res.data.items}))
                    })
            })
        })
  }, [])

  const createTodolistHandler = (title: string) => {
    axios
        .post<Response<{item: Todolist}>>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title},configs)
        .then(res => {
          const newTodo = res.data.data.item
          setTodolists([newTodo, ...todolists])
        })
  }

  const removeTodolistHandler = (id: string) => {
    axios
        .delete<Response>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, configs)
        .then(res => {
          setTodolists(todolists.filter(tl => tl.id !== id))
        })
  }

  const updateTodolistHandler = (id: string, title: string) => {
      axios
          .put<Response<{item: Todolist}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title}, configs)
          .then(res => {
              setTodolists(todolists.map(tl => tl.id === id ? {...tl, title: title} : tl))
          })
  }

  const createTaskHandler = (title: string, todolistId: string) => {
      axios
          .post<Response<{item: Task}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, {title},configs)
          .then(res => {
              const newTask = res.data.data.item
              const todolistsTask = tasks[todolistId] || []
              setTasks({...tasks, [todolistId]: [newTask, ...todolistsTask]})
          })
      // create task
  }

  const removeTaskHandler = (taskId: string, todolistId: string) => {
      axios
          .delete<Response<{item: Task}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, configs)
          .then(res => {
              const newTask = res.data.data.item
              setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})

              console.log(newTask)
          })
      // remove task
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: Task) => {

      const model = {
          title: task.title,
          description: task.description,
          priority: task.priority,
          startDate: task.startDate,
          deadline: task.deadline,
          status: e.currentTarget.checked ? 2 : 0
      }

      axios
          .put<Response<{item: Task}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`, model, configs)
          .then(res => {
              const newTask = res.data.data.item
              setTasks({...tasks, [task.todoListId]: tasks[task.todoListId].map(t => t.id === task.id ? newTask : t)})
          });
  }

  const changeTaskTitleHandler = (title: string, task: any) => {

      // update task title
  }

  return (
      <div style={{ margin: '20px' }}>
        <AddItemForm addItem={createTodolistHandler} />

        {/* Todolists */}
        {todolists.map((tl: any) => {
          return (
              <div key={tl.id} style={todolist}>
                <div>
                  <EditableSpan
                      value={tl.title}
                      onChange={(title: string) => updateTodolistHandler(tl.id, title)}
                  />
                  <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
                </div>
                <AddItemForm addItem={title => createTaskHandler(title, tl.id)} />

                {/* Tasks */}
                {!!tasks[tl.id] &&
                    tasks[tl.id].map((task: Task) => {
                      return (
                          <div key={task.id}>
                            <Checkbox
                                checked={task.status === 2}
                                onChange={e => changeTaskStatusHandler(e, task)}
                            />
                            <EditableSpan
                                value={task.title}
                                onChange={title => changeTaskTitleHandler(title, task)}
                            />
                            <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                          </div>
                      )
                    })}
              </div>
          )
        })}
      </div>
  )
}

// Styles
const todolist: React.CSSProperties = {
  border: '1px solid black',
  margin: '20px 0',
  padding: '10px',
  width: '300px',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
}