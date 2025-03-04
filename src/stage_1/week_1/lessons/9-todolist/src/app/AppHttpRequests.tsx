
import Checkbox from '@mui/material/Checkbox'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { AddItemForm } from '../common/components/AddItemForm/AddItemForm'
import { EditableSpan } from '../common/components/EditableSpan/EditableSpan'
import axios from "axios";


export type Todolist = {
   "id": string
   "title": string
   "addedDate": string
   "order": number
}

export type Task = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type Response<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors?: []
    data: T
}

export type GetTaskResponse = {
    items: Task[]
    totalCount: number
    error: string | null
}





export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({})

    useEffect(() => {
        axios.get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
            headers: {
                Authorization: 'Bearer 32916b1d-c534-4644-b29a-6dfa78581dda',
                'API-KEY': 'f1382910-332f-4712-b1bd-a86fc652657a'
            }
        }).then(res=> {
            const todolists = res.data
            setTodolists(todolists)
            todolists.forEach(tl => {
                axios.get<GetTaskResponse>(`https://social-network.samuraijs.com/api/1.1//todo-lists/${tl.id}/tasks`, {
                    headers: {
                        Authorization: 'Bearer 32916b1d-c534-4644-b29a-6dfa78581dda',
                        'API-KEY': 'f1382910-332f-4712-b1bd-a86fc652657a'
                    }
                }).then(res=> {
                    setTasks({...tasks, [tl.id]: res.data.items})
                })
            })
        })
    }, [])

    const createTodolistHandler = (title: string) => {
        // create todolist
        axios.post<Response<{item: Todolist}>>('https://social-network.samuraijs.com/api/1.1/todo-lists',
            {title},
            {
            headers: {
                Authorization: 'Bearer 32916b1d-c534-4644-b29a-6dfa78581dda',
                'API-KEY': 'f1382910-332f-4712-b1bd-a86fc652657a'
            }
        }).then(res=> {
            const newTodolist = res.data.data.item
            setTodolists([newTodolist, ...todolists])
        })
    }

    const removeTodolistHandler = (id: string) => {
        // remove todolist
        axios.delete<Response>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
            {
                headers: {
                    Authorization: 'Bearer 32916b1d-c534-4644-b29a-6dfa78581dda',
                    'API-KEY': 'f1382910-332f-4712-b1bd-a86fc652657a'
                }
            }).then(res=> {
              setTodolists(todolists.filter(td => td.id !== id))
        })
    }

    const updateTodolistHandler = (id: string, title: string) => {
        // create todolist// update todolist title
        axios.put<Response>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
            {title},
            {
                headers: {
                    Authorization: 'Bearer 32916b1d-c534-4644-b29a-6dfa78581dda',
                    'API-KEY': 'f1382910-332f-4712-b1bd-a86fc652657a'
                }
            }).then(res=> {
                console.log(res.data)

                setTodolists(todolists.map (tl => tl.id === id ? {...tl, title} : tl))
            // setTodolists(todolists.map(tl => tl.id !== id ? tl : tl.title = title))
        })
    }

    const createTaskHandler = (title: string, todolistId: string) => {
        // create task
        axios.post<Response<{item: Task}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
            {title},
            {
                headers: {
                    Authorization: 'Bearer 32916b1d-c534-4644-b29a-6dfa78581dda',
                    'API-KEY': 'f1382910-332f-4712-b1bd-a86fc652657a'
                }
            }).then(res=> {
                console.log(res.data.data.item)
                const newTask = res.data.data.item
                setTasks({...tasks, [todolistId]: [newTask, ...(tasks[todolistId] || [])]})
        })

    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        axios.delete<Response>(`https://social-network.samuraijs.com/api/1.1//todo-lists/${todolistId}/tasks/${taskId}`,
            {
                headers: {
                    Authorization: 'Bearer 32916b1d-c534-4644-b29a-6dfa78581dda',
                    'API-KEY': 'f1382910-332f-4712-b1bd-a86fc652657a'
                }
            }).then(res=> {
            setTasks({[todolistId]: tasks[todolistId].filter(task => task.id !== taskId)} )
        })
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: any) => {
        // update task status
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
                            tasks[tl.id].map((task: any) => {
                                return (
                                    <div key={task.id}>
                                        <Checkbox
                                            checked={task.isDone}
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