import './App.css';
import { Todolist } from "./Todolist";
import { useState } from "react";
import { v1 } from "uuid";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

type InTaskType = {
	data: TaskType[]
	filter: FilterValuesType
}

function App() {
	let todolistID1 = v1()
	let todolistID2 = v1()

	let [todolists, setTodolists] = useState<TodolistType[]>([
		{ id: todolistID1, title: 'What to learn', filter: 'all' },
		{ id: todolistID2, title: 'What to buy', filter: 'all' },
	])

	let [tasks, setTasks] = useState({
		[todolistID1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
		],
		[todolistID2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
	})

	const [filter, setFilter] = useState<FilterValuesType>('all')

	const removeTaskList = (todolistID: string) => {
		setTodolists(todolists.filter(todolist => todolist.id !== todolistID))
	}

	const removeTask = (todolistID: string, taskID: string) => {
		setTasks({...tasks, [todolistID]: tasks[todolistID].filter(task => task.id !== taskID)})
	}

	const addTask = (todolistID: string, title: string) => {

		const newTask = {
			id: v1(),
			title: title,
			isDone: false
		}



		setTasks({...tasks, [todolistID]: [...tasks[todolistID], newTask]})
		// const newTask = {
		// 	id: v1(),
		// 	title: title,
		// 	isDone: false
		// }
		// const newTasks = [newTask, ...tasks]
		// setTasks(newTasks)
	}

	const changeFilter = (todolistID: string, newFilter: FilterValuesType) => {
		// const curentTodolist=todolists.find(el=>el.id===todolistID)
		// if(curentTodolist){
		// 	curentTodolist.filter=newFilter
		// 	setTodolists([...todolists])//345
		// }

		// setTodolists(todolists.map(el => el.id === todolistID
		// 	? { ...el, filter: newFilter }
		// 	: el)
		// )
	}

	const prep = {
		igor: true
	}


	const changeTaskStatus = (todolistID: string,  taskId: string, taskStatus: boolean) => {
		setTasks({...tasks,[todolistID]:tasks[todolistID].map(el=>el.id===taskId ?{...el,isDone:taskStatus} :el)})
		// const newState = tasks.map(t => t.id == taskId ? { ...t, isDone: taskStatus } : t)
		// setTasks(newState)
	}


	return (
		<div className="App">
			
			{todolists.map((el) => {
				let tasksForTodolist = tasks[el.id].data
				if (tasks[el.id].filter === 'active') {
					tasksForTodolist = tasks[el.id].data.filter(task => !task.isDone)
				}
				if (el.filter === 'completed') {
					tasksForTodolist = tasks[el.id].data.filter(task => task.isDone)
				}

				return (
					<Todolist
						key={el.id}
						todolistID={el.id}
						title={el.title}
						tasks={tasksForTodolist}
						removeTask={removeTask}
						changeFilter={changeFilter}
						addTask={addTask}
						changeTaskStatus={changeTaskStatus}
						filter={el.filter}
						removeTaskList={removeTaskList}
					/>
				)
			})}


		</div>
	);
}

export default App;
