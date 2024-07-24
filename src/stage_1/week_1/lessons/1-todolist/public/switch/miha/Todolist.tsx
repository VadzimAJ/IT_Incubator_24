import React from 'react'
import { FilterValuesType, TaskType, TodolistsType } from './App'

type TodolistPropsType = {
  title: string
  task: TaskType[]
  todolistId : string
  changeTaskStatus: (filter: FilterValuesType, todolistId: string)=> void
  removeTask: (taskId: string, todolistId: string)=> void
}



export const Todolist = ( props: TodolistPropsType) => {

  const removeTaskHendler = (id: string) => {
    removeTask(id, todolistId)
  }

  const changeFilterHendler = (filter: FilterValuesType) => {
    changeTaskStatus (filter, todolistId)
  }

  const {title, task, todolistId, changeTaskStatus, removeTask,} = props
  
  return (
    
    <div>
    
      <h3> {title} </h3>
      <div>
          <input/>
          <button>+</button>
      </div>
      {task.length === 0 ? (
        <p>Тасок нет</p>) 
      : ( <ul>
          { task.map(task => {
            return (
              <li key = {task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span> 
                <button onClick={()=>removeTaskHendler(task.id)}>x</button>
              </li>
            )
          })}
      </ul>)}
    
      <div>
          <button onClick={() => {changeFilterHendler('all')}}>All</button>
          <button onClick={() => {changeFilterHendler('active')}}>Active</button>
          <button onClick={() => {changeFilterHendler('complited')}}>Completed</button>
      </div>
    </div>
  )
}
