import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType={
	id: string
	title: string
	filter: FilterValuesType
}


function App() {
	let [todolists, setTodolists] = useState<TodolistType[]>([
		{ id: v1(), title: 'What to learn', filter: 'all' },
		{ id: v1(), title: 'What to buy', filter: 'all' },
	])


	const [tasks, setTasks] = useState<TaskType[]>([
		{id: v1(), title: 'HTML&CSS', isDone: true},
		{id: v1(), title: 'JS', isDone: true},
		{id: v1(), title: 'ReactJS', isDone: false},
	])

	//const [filter, setFilter] = useState<FilterValuesType>('all')

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

	const changeFilter = (todolistID:string,newFilter: FilterValuesType) => {
		// const curentTodolist=todolists.find(el=>el.id===todolistID)
		// if(curentTodolist){
		// 	curentTodolist.filter=newFilter
		// 	setTodolists([...todolists])//345
		// }

		setTodolists(todolists.map(el=>el.id===todolistID
			? {...el,filter:newFilter}
			:el)
		)
	}

	const prep={
		igor:true
	}


	const changeTaskStatus = (taskId: string, taskStatus: boolean) => {
		const newState = tasks.map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)
		setTasks(newState)
	}







	return (
		<div className="App">
			{todolists.map((el,index)=>{
				let tasksForTodolist = tasks
				if (el.filter === 'active') {
					tasksForTodolist = tasks.filter(task => !task.isDone)
				}
				if (el.filter === 'completed') {
					tasksForTodolist = tasks.filter(task => task.isDone)
				}
				return(
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
					/>
				)
			})}


		</div>
	);
}

export default App;
