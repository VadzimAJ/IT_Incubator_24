import Checkbox from "@mui/material/Checkbox"
import React, { ChangeEvent, useEffect, useState } from "react"
import { AddItemForm } from "../common/components/AddItemForm/AddItemForm"
import { EditableSpan } from "../common/components/EditableSpan/EditableSpan"
import axios from "axios"
import type { GetTasksResponse, Task, UpdateTaskModel } from "../features/todolists/api/tasksApi.types"
import type { Todolist, BaseResponse } from "../features/todolists/api/todolistsApi.types"
import { todolistsApi } from "../features/todolists/api/todolistsApi"
import { TaskStatus } from "../features/todolists/lib/enams/enams"
import { tasksApi } from "../features/todolists/api/tasksApi"

export const configs = {
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
    "API-KEY": process.env.REACT_APP_API_KEY,
  },
}

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({})

  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      const todolists = res.data
      setTodolists(todolists)
      todolists.forEach(({ id }) => {
        tasksApi.getTasks({ id }).then((res) => {
          setTasks((tasks) => ({ ...tasks, [id]: res.data.items }))
        })
      })
    })
  }, [])

  const createTodolistHandler = (title: string) => {
    todolistsApi.createTodolist({ title }).then((res) => {
      const newTodo = res.data.data.item
      setTodolists([newTodo, ...todolists])
    })
  }

  const removeTodolistHandler = (id: string) => {
    todolistsApi.deliteTodlist({ id }).then((res) => {
      setTodolists(todolists.filter((tl) => tl.id !== id))
    })
  }

  const updateTodolistHandler = (id: string, title: string) => {
    todolistsApi.updateTodolist({ id, title }).then((res) => {
      setTodolists(todolists.map((tl) => (tl.id === id ? { ...tl, title: title } : tl)))
    })
  }

  const createTaskHandler = (title: string, todolistId: string) => {
    tasksApi.createTask({ title, todolistId }).then((res) => {
      const newTask = res.data.data.item
      const todolistsTask = tasks[todolistId] || []
      setTasks({ ...tasks, [todolistId]: [newTask, ...todolistsTask] })
    })
    // create task
  }

  const removeTaskHandler = (taskId: string, todolistId: string) => {
    axios
      .delete<
        BaseResponse<{
          item: Task
        }>
      >(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, configs)
      .then((res) => {
        setTasks({
          ...tasks,
          [todolistId]: tasks[todolistId].filter((task) => task.id !== taskId),
        })
      })
    // remove task
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: Task, todoListId: string) => {
    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    const model: UpdateTaskModel = {
      status,
      title: task.title,
      description: task.description, // if true responce 2 else false responce 0
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    }

    axios
      .put<
        BaseResponse<{
          item: Task
        }>
      >(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}/tasks/${task.id}`, model, configs)
      .then((res) => {
        const newTask = res.data.data.item
        setTasks({
          ...tasks,
          [todoListId]: tasks[todoListId].map((t) => (t.id === task.id ? newTask : t)),
        })
      })
  }

  const changeTaskTitleHandler = (title: string, task: Task, todoListId: string) => {
    const model: UpdateTaskModel = {
      title: title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    }

    axios
      .put<
        BaseResponse<{
          item: Task
        }>
      >(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}/tasks/${task.id}`, model, configs)
      .then((res) => {
        const newTask = { ...task, title: title }
        setTasks({
          ...tasks,
          [todoListId]: tasks[todoListId].map((t) => (t.id === task.id ? newTask : t)),
        })
        console.log(newTask)
      })
  }

  return (
    <div style={{ margin: "20px" }}>
      <AddItemForm addItem={createTodolistHandler} />

      {/* Todolists */}
      {todolists.map((tl: any) => {
        return (
          <div key={tl.id} style={todolist}>
            <div>
              <EditableSpan value={tl.title} onChange={(title: string) => updateTodolistHandler(tl.id, title)} />
              <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
            </div>
            <AddItemForm addItem={(title) => createTaskHandler(title, tl.id)} />

            {/* Tasks */}
            {!!tasks[tl.id] &&
              tasks[tl.id].map((task: Task) => {
                return (
                  <div key={task.id}>
                    <Checkbox checked={task.status === 2} onChange={(e) => changeTaskStatusHandler(e, task, tl.id)} />
                    <EditableSpan value={task.title} onChange={(title) => changeTaskTitleHandler(title, task, tl.id)} />
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
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
}
