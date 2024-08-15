import react from 'react'
import { TaskType } from './App'

type TodolistPropsType = {
title: string,
task: TaskType[]
}

export const Todolist = (props: TodolistPropsType,  ) => {
    const {title, task} = props
    
    return (
            <div>
                <h3>{title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                {task.length === 0 ? (<h1>Sss</h1>) : (<h2>PPPp</h2>)}
                <ul>
                {task.map(task => {
                    return (
                    <li key = {task.id}>
                    <input type="checkbox" checked={task.isDone}/>
                       <span>{task.title}</span>
                    </li>)
                })}
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
    )
}
