import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { GlobalFrameHelper } from './GlobalFrameHalper';
import { v1 } from 'uuid';

export type TodolistType = {
    id: string;
    title: string;
    filter: FilteredValuesType;
};

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

export type FilteredValuesType = 'all' | 'active' | 'completed';

function App() {
    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: v1(), title: 'What to learn', filter:'all'},
        {id: v1(), title: 'What to byu', filter:'all'}
    ])

    const [tasks, setTasks] = useState<TaskType[]>([
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
        { id: v1(), title: 'Redux', isDone: false },
        { id: v1(), title: 'Typescript', isDone: false },
        { id: v1(), title: 'RTK query', isDone: false }
    ]);

    const addTask = (title: string) => {
        const newTask = {
            id: v1(),
            title,
            isDone: false
        };

        const newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    };

    // let [filter, setFilter] = useState<FilteredValuesType>('all');
    
    const changeFilter = (filter: FilteredValuesType, todolistId: string) => {
        setTodolists(todolists.map(tl => (tl.id === todolistId ? { ...tl, filter } : tl)))
    }

    // let tasksForTodolist = tasks;

    // if (filter === 'active') {
    //     tasksForTodolist = tasks.filter(task => !task.isDone);
    // }

    // if (filter === 'completed') {
    //     tasksForTodolist = tasks.filter(task => task.isDone);
    // }

    const removeTask = (taskId: string) => {
        const filteredTasks = tasks.filter(task => {
            return task.id !== taskId;
        });
        setTasks(filteredTasks);
    };

    const changeTaskStatus = (taskId: string, newStatusValue: boolean) => {
        setTasks(
            tasks.map(task =>
                task.id === taskId ? { ...task, isDone: newStatusValue } : task
            )
        );
    };

    return (
    <div className="App">
        {todolists.map((tl) => {
            let tasksForTodolist = tasks;

            if (tl.filter === 'active') {
                tasksForTodolist = tasks.filter(task => !task.isDone);
            }

            if (tl.filter === 'completed') {
                tasksForTodolist = tasks.filter(task => task.isDone);
            }

            return (
                <GlobalFrameHelper key={tl.id}>
                    <Todolist
                        todolistId={tl.id}
                        title={tl.title}
                        propsName="PropsType"
                        pathToProps="./Todolist"
                        componentName="Todolist"
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                    />
                </GlobalFrameHelper>
            );
        })}
    </div>
);
}

export default App;
