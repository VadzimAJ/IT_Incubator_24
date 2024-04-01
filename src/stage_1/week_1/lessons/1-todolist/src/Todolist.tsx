import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilteredValuesType, TaskType } from './App';
import { Button } from './Button';

type PropsType = {
  title: string
  tasks: TaskType[]
  filter: FilteredValuesType
  removeTask: (taskId: string) => void
  changeFilter: (filter: FilteredValuesType) => void
  changeTaskStatus: (taskId: string, newStatusValue: boolean) => void; 
  addTask: (title: string) => void
  date?: string
}

export const Todolist = ({ title, tasks, date, filter, removeTask, changeTaskStatus, changeFilter, addTask }: PropsType) => {
  //TASK TITLE 
  const [taskTile, setTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)


  //TASK HENDLER
  const addTaskHandler = () => {
    if (taskTile.trim() !== ''){
      addTask(taskTile.trim())
      setTaskTitle('')
    }else {
      setError("Title is required")
    }
  }

  const chngeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value)
  }

  const addTaskOnkeyEvent = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (event.key === 'Enter') {
      addTaskHandler()
    } 
  }

  const changeTaskStatusHandler = (taskId: string) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      const newStatusValue = e.currentTarget.checked;
      changeTaskStatus(taskId, newStatusValue);
    }
  };

  const removeTaskHandler = (taskId: string) => {
    removeTask(taskId)
  }

  

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input 
          className={error ? 'error' : ''}
          value={taskTile}
          onChange={chngeTaskTitleHandler}
          onKeyUp={addTaskOnkeyEvent}
        />
        <Button title='+' onClick={addTaskHandler} />
        {error && <div className={'error-message'}>{error}</div>}
      </div>

      <div>
        {tasks.length === 0 ? (
          <p> No Tasks</p>
        ) : (
          <ul>
            {tasks.map(task => {
              return (
                <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                  <input type="checkbox" 
                          checked={task.isDone} 
                          onChange={changeTaskStatusHandler(task.id)} />
                  <span>{task.title}</span>
                  <Button  onClick={() => removeTaskHandler(task.id)} title='х'/>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <div>
        <Button 
          className={filter === 'all' ? 'active-filter active-filter-font': ''}
          title='All' 
          onClick={() => changeFilter('all')} 
        />
        <Button 
        className={filter === 'active' ? 'active-filter active-filter-font': ''}
        title='Active' 
        onClick={() => changeFilter('active')} />
        <Button 
        className={filter === 'completed' ? 'active-filter active-filter-font': ''}
        title='Completed' 
        onClick={() => changeFilter('completed')} />
      </div>

      <div>{date}</div>

    </div>
  )
}