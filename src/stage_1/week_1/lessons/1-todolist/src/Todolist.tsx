import React, {useState} from 'react';
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

export const Todolist = ({ title, tasks, date, removeTask, changeFilter, addTask }: PropsType) => {
  const [taskTile, setTaskTitle] = useState('')
  const adTaskHandler = () => {
    addTask(taskTile)
    setTaskTitle('')
  }

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input value={taskTile} 
                onChange={event => setTaskTitle(event.currentTarget.value)}/>
        <Button title='+' onClick={adTaskHandler} />
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