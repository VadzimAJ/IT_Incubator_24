import './App.css';
import { Todolist } from "./Todolist";
import { useState } from "react";
import { v1 } from "uuid";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}
export type TaskStateType = {
	[key: string]: TaskType[]
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
	let todolistID1 = v1();
	let todolistID2 = v1();

	let [todolists, setTodolists] = useState<TodolistType[]>([
		{ id: todolistID1, title: 'What to learn', filter: 'all' },
		{ id: todolistID2, title: 'What to buy', filter: 'all' }
	])

	let [tasks, setTasks] = useState<TaskStateType>({
		[todolistID1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false }
		],
		[todolistID2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: true }
		]
	})

	const removeTask = (taskId: string, todolistId: string) => {
		const todolistTask = tasks[todolistId]
		const newTodolistTasks = todolistTask.filter(t => t.id !== taskId)

		tasks[todolistId] = newTodolistTasks

		setTasks({ ...tasks, newTodolistTasks })

	}

	const removeTodolist = (todolistId: string) => {
		const newTodolists = todolists.filter(tl => tl.id !== todolistId)
		setTodolists(newTodolists)
	}

	const addTask = (title: string, todolistId: string) => {
		const newTask = {
			id: v1(),
			title: title,
			isDone: false,
		}
		const newTodolistTasks = { ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] }
		setTasks(newTodolistTasks)
	}

	const changeFilter = (filter: FilterValuesType, todolistId: string) => {
		const newTodolists = todolists.map(tl => {
			return tl.id === todolistId ? { ...tl, filter } : tl
		})
		setTodolists(newTodolists)
		// setFilter(filter)
	}

	const changeTaskStatus = (taskId: string, todolistId: string, taskStatus: boolean) => {

		const todolistTask = tasks[todolistId]

		const newState = todolistTask.map(t => t.id == taskId ? { ...t, isDone: taskStatus } : t)

		tasks[todolistId] = newState

		setTasks({ ...tasks })

		// const newState = tasks.map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)
		// setTasks(newState)
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
			{todolists.length === 0
				? (<p>No todolists</p>)
				: (todolists.map(tl => {
							const allTodolistTasks = tasks[tl.id]
							let tasksForTodolist = allTodolistTasks

							if (tl.filter === 'active') {
								tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
							}

							if (tl.filter === 'completed') {
								tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
							}

							return (
								<Todolist
									key={tl.id}
									todolistId={tl.id}
									title={tl.title}
									todolists={todolists}
									tasks={tasksForTodolist}
									removeTodolist={removeTodolist}
									removeTask={removeTask}
									changeFilter={changeFilter}
									addTask={addTask}
									changeTaskStatus={changeTaskStatus}
									filter={tl.filter}
								/>
							)
						})
					)
				}

		</div>
	);
}

export default App;
