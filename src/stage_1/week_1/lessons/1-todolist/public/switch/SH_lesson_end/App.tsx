import './App.css';
import {Todolist} from "./Todolist";
import {useState, ChangeEvent} from "react";
import { v1 } from 'uuid';

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
	const [tasks, setTasks] = useState<TaskType[]>([
		{id: v1(), title: 'HTML&CSS', isDone: true},
		{id: v1(), title: 'JS', isDone: true},
		{id: v1(), title: 'ReactJS', isDone: false},
		{id: v1(), title: 'Redux', isDone: false},
		{id: v1(), title: 'Typescript', isDone: false},
		{id: v1(), title: 'RTK query', isDone: false},
	])

	const [filter, setFilter] = useState<FilterValuesType>('all')


	const changeCheckbox = (event: ChangeEvent<HTMLInputElement>, taskId: string) => {
		const newChecked = event.currentTarget.checked;
		console.log(newChecked, taskId)

		setTasks (tasks.map(elem => (elem.id === taskId ? {...elem, isDone: !elem.isDone} : elem)))
	}

	const addTask = (inputValue: string) => {
		const newTask = {id: v1(), title: inputValue, isDone: false}

		if (inputValue !== '') {
			setTasks ([...tasks, newTask])
		} 

		
	}

	const removeTask = (taskId: string) => {
		const filteredTasks = tasks.filter((task) => {
			return task.id !== taskId
		})
		setTasks(filteredTasks)
	}

	const changeFilter = (filter: FilterValuesType) => {
		setFilter(filter)
	}

	let tasksForTodolist = tasks
	if (filter === 'active') {
		tasksForTodolist = tasks.filter(task => !task.isDone)
	}

	if (filter === 'completed') {
		tasksForTodolist = tasks.filter(task => task.isDone)
	}

	return (
		<div className="App">
			<Todolist title="What to learn"
			          tasks={tasksForTodolist}
			          removeTask={removeTask}
			          changeFilter={changeFilter}
								addTask={addTask}
								changeCheckbox={changeCheckbox}/>
		</div>
	);
}

export default App;
