import React, {useState} from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
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

    const [filter, setFilter] = useState<FilteredValuesType> ('all')

    const changeFilter = (filter: FilteredValuesType) => {
        setFilter(filter)
        console.log(tasks)
    }
    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => !task.isDone )
    }

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone)
    }

    const removeTask = (taskId: string) => {
        const filteredTasks = tasks.filter(task => {
            return task.id !== taskId
        })
        setTasks(filteredTasks)
        console.log(setTasks)
    }
    
    return (
        <div className="App">
            <Todolist title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                date={'20.03.2024'}
                changeFilter={changeFilter}
            //
            />

        </div>
    );
    
}

export default App;
