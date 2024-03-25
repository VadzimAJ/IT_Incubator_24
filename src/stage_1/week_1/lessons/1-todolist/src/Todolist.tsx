import React from 'react';
import { useRef } from 'react';
import { FilteredValuesType, TaskType } from './App';
import { Button } from './Button';

type PropsType = {
  title: string
  tasks: TaskType[]
  removeTask: (taskId: string) => void
  changeFilter: (filter: FilteredValuesType) => void
  addTask: ( title: string ) => void
  date?: string
}

export const Todolist = ({ title, tasks, date, addTask, removeTask, changeFilter }: PropsType) => {
  const inputRef = useRef<HTMLInputElement>(null);
  console.log(useRef());

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input ref={inputRef} />
        <Button title='+' onClick={() => {
          if (inputRef.current){
          addTask(inputRef.current.value)
          inputRef.current.value = ''
          }
        }} />
      </div>

      <div>
        {tasks.length === 0 ? (
          <p> No Tasks</p>
        ) : (
          <ul>
            {tasks.map(task => {
              return (
                <li key={task.id}>
                  <input type="checkbox" checked={task.isDone} />
                  <span>{task.title}</span>
                  <Button title='х' onClick={() => removeTask(task.id)} />
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <div>
        <Button title='All' onClick={() => changeFilter('all')} />
        <Button title='Active' onClick={() => changeFilter('active')} />
        <Button title='Completed' onClick={() => changeFilter('completed')} />
      </div>

      <div>{date}</div>

    </div>
  )
}