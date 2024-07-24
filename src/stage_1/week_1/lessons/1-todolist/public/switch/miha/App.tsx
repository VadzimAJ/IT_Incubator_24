import { Todolist } from './Todolist';
import './App.css';
import { useState } from 'react';
import { v1 } from 'uuid';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValuesType = 'all'| 'active'|'complited'

export type TodolistsType = {
    [todolistId: string]: TaskType[]
}


function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState ([
        {id: todolistId1, title: "Whot to Learen", filter: 'all'},
        {id: todolistId2, title: 'Whot to Buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState ({
            [todolistId1]:[
                {id: v1(), title:'HTML&CSS', isDone:false},
                {id: v1(), title:'JS HUES&CSS', isDone:true},
                {id: v1(), title:'REACT', isDone:true}
                ],
            [todolistId2]:[
                {id: v1(), title:'Milk', isDone:false},
                {id: v1(), title:'JS Book', isDone:true},
                {id: v1(), title:'Bread', isDone:true}
                ]}
        )

    const task2 = [
        {id: 1, title:'MILK', isDone:true},
        
        {id: 2, title:'Patato', isDone:false},
        
        {id: 3, title:'Patato', isDone:false}
    ]

    const titleTodolist2 = 'Whot to Buy'

    // const [filter, setFilter] = useState('all')

    const removeTask = (taskId: string, todolistId: string) => {

        console.log (taskId, todolistId)
        
        setTasks (
            {...tasks, [todolistId]:tasks[todolistId].filter(task => task.id !== taskId)}
        )
    }

    const changeTaskStatus = (filter: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(tl => (tl.id === todolistId ? { ...tl, filter } : tl)))
        }

    return (

        
        <div className="App">
            {todolists.map (tl => {
            let tasksForTodolist = tasks[tl.id]
        
            if (tl.filter === 'active') {
            tasksForTodolist = tasks[tl.id].filter(el=> !el.isDone )
            // .filter(task => !task.isDone)
            }
        
            if (tl.filter === 'completed') {
                tasksForTodolist = tasks[tl.id].filter(el=> el.isDone )
            // .filter(task => task.isDone)
            }
                    
            return (<Todolist 
                key={tl.id}
                title = {tl.title}
                todolistId = {tl.id}
                task = {tasksForTodolist}
                changeTaskStatus = {changeTaskStatus}
                removeTask = {removeTask}
            />)}
            )}
            
            
        </div>
    );
}


export default App;
