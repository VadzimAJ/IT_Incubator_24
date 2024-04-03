import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TaskStatusType = {
    taskId: string
    newStatusValue: boolean
}

export type FilteredValuesType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
        { id: v1(), title: 'Redux', isDone: false },
        { id: v1(), title: 'Typescript', isDone: false },
        { id: v1(), title: 'RTK query', isDone: false },
    ])

    //ADD TASK

    const addTask = (title: string) => {
        const newTask = {
            id: v1(),
            title,
            isDone: false
        }

        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    //FILTER FUNCTIONS

    const [filter, setFilter] = useState<FilteredValuesType>('all')

    const changeFilter = (filter: FilteredValuesType) => {
        setFilter(filter)
    }

    //FILTERING BY ACTIVITY 

    let tasksForTodolist = tasks
    
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => !task.isDone)
    }

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone)
    }

    //REMOVE TASK

    const removeTask = (taskId: string) => {
        const filteredTasks = tasks.filter(task => {
            return task.id !== taskId
        })
        setTasks(filteredTasks)
    }

    //CHANGE TASK STATUS

    const changeTaskStatus = (taskId: string, newStatusValue: boolean) => {
        
        setTasks(
            tasks.map((task) =>
                task.id === taskId ? { ...task, isDone: newStatusValue } : task
            )
        );
    };

    return (
        <div className="App">
            <Todolist title="What to learn"
                filter={filter}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                date={'20.03.2024'}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
                addTask={addTask}
            //
            />

        </div>
    );

}

export default App;
