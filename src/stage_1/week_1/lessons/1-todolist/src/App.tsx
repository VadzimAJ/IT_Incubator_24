import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

	let [todolists, setTodolists] = useState<TodolistType[]> ([
		{id: v1(), title: 'What to learn', filter: 'all'},
		{id: v1(), title: 'What to buy', filter: 'all'}
	])

	const [tasks, setTasks] = useState<TaskType[]>([
		{id: v1(), title: 'HTML&CSS', isDone: true},
		{id: v1(), title: 'JS', isDone: true},
		{id: v1(), title: 'ReactJS', isDone: false},
	])

	// const [filter, setFilter] = useState<FilterValuesType>('all')

	const removeTask = (taskId: string) => {
		const filteredTasks = tasks.filter((task) => {
			return task.id !== taskId
		})
		setTasks(filteredTasks)
	}

	const addTask = (title: string) => {
		const newTask = {
			id: v1(),
			title: title,
			isDone: false
		}
		const newTasks = [newTask, ...tasks]
		setTasks(newTasks)
	}

	const changeFilter = (filter: FilterValuesType, todolistId: string) => {
		const newTodolists = todolists.map (tl => {
			return tl.id === todolistId ? {...tl, filter} : tl
		})
		setTodolists(newTodolists)
		// setFilter(filter)
	}

	const changeTaskStatus = (taskId: string, taskStatus: boolean) => {
		const newState = tasks.map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)
		setTasks(newState)
	}

	// let tasksForTodolist = tasks
	// if (filter === 'active') {
	// 	tasksForTodolist = tasks.filter(task => !task.isDone)
	// }

	// if (filter === 'completed') {
	// 	tasksForTodolist = tasks.filter(task => task.isDone)
	// }

	return (
		<div className="App">
			{todolists.map( tl => {

					let tasksForTodolist = tasks

					if (tl.filter === 'active') {
						tasksForTodolist = tasks.filter(task => !task.isDone)
					}
				
					if (tl.filter === 'completed') {
						tasksForTodolist = tasks.filter(task => task.isDone)
					}

				return (
					<Todolist
						key={tl.id}
						todolistId = {tl.id}
						title = {tl.title}
						tasks={tasksForTodolist}
						removeTask={removeTask}
						changeFilter={changeFilter}
						addTask={addTask}
						changeTaskStatus={changeTaskStatus}
						filter={tl.filter}
					/>
				)
			})}
			
		</div>
	);
}

export default App;
