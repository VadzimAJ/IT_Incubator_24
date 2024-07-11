import './App.css';
import {Todolist} from "./Todolist";
import React, {useReducer, useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from "@mui/material/Container";
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import {MenuButton} from "./MenuButton";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import CssBaseline from "@mui/material/CssBaseline";
import { TodoActionsType, AddTodolistAC, changeTodolistFilterAC, changeTodolistTitle, removeTodolistAC, todolistsReducer } from './model/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskActionsType, tasksReducer } from './model/tasks-reducer';

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[key: string]: TaskType[]
}

type ThemeMode = 'dark' | 'light'

function App() {

	let todolistID1 = v1()
	let todolistID2 = v1()

	let [todolists, dispatchToTodolits] = useReducer<React.Reducer<TodolistType[], TodoActionsType>>(todolistsReducer, [
		{id: todolistID1, title: 'What to learn', filter: 'all'},
		{id: todolistID2, title: 'What to buy', filter: 'all'},
	])

	let [tasks, dispatchToTask] = useReducer<React.Reducer<TasksStateType, TaskActionsType>>(tasksReducer, {
		[todolistID1]: [
			{id: v1(), title: 'HTML&CSS', isDone: true},
			{id: v1(), title: 'JS', isDone: true},
			{id: v1(), title: 'ReactJS', isDone: false},
		],
		[todolistID2]: [
			{id: v1(), title: 'Rest API', isDone: true},
			{id: v1(), title: 'GraphQL', isDone: false},
		],
	})

	const [themeMode, setThemeMode] = useState<ThemeMode>('light')

	const theme = createTheme({
		palette: {
			mode: themeMode === 'light' ? 'light' : 'dark',
			primary: {
				main: '#087EA4',
			},
		},
	});

	const removeTask = (taskId: string, todolistId: string) => {
		// const newTodolistTasks = {...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}
		// setTasks(newTodolistTasks)

		dispatchToTask(removeTaskAC(taskId, todolistId))
	}

	const addTask = (title: string, todolistId: string) => {
		// const newTask = {
		// 	id: v1(),
		// 	title: title,
		// 	isDone: false
		// }
		// const newTodolistTasks = {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
		// setTasks(newTodolistTasks)

		dispatchToTask(addTaskAC(title, todolistId))
	}

	const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
		// const newTodolistTasks = {
		// 	...tasks,
		// 	[todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: taskStatus} : t)
		// }
		// setTasks(newTodolistTasks)

		dispatchToTask(changeTaskStatusAC(taskId, taskStatus, todolistId))
	}

	const changeFilter = (filter: FilterValuesType, todolistId: string) => {
		dispatchToTodolits (changeTodolistFilterAC(todolistId, filter))
	}

	const removeTodolist = (todolistId: string) => {

		const action = removeTodolistAC(todolistId)

		dispatchToTodolits (action)
		// delete tasks[todolistId]
		// setTasks({...tasks})
		dispatchToTask (action)
	}

	const addTodolist = (title: string) => {
		const action = AddTodolistAC(title)

		dispatchToTodolits(action)
		dispatchToTask(action)

		//????????????????
		// setTasks ({...tasks, [action.payload.todolistId]:[]})

		
	}

	const updateTask = (todolistId: string, taskId: string, title: string) => {
		// const newTodolistTasks = {
		// 	...tasks,
		// 	[todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)
		// }
		// setTasks(newTodolistTasks)

		dispatchToTask(changeTaskTitleAC(todolistId, taskId, title))
	}

	const updateTodolist = (todolistId: string, title: string) => {

		dispatchToTodolits (changeTodolistTitle(todolistId, title))
		// const newTodolists = todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl)
		// setTodolists(newTodolists)
	}

	const changeModeHandler = () => {
		setThemeMode(themeMode === "light" ? "dark" : 'light')
	}

	return (
		
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<AppBar position="static" sx={{mb: '30px'}}>
				<Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
					<IconButton color="inherit">
						<MenuIcon/>
					</IconButton>
					<div>
						<MenuButton>Login</MenuButton>
						<MenuButton>Logout</MenuButton>
						<MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
						<Switch color={'default'} onChange={changeModeHandler}/>
					</div>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid container sx={{mb: '30px'}}>
					<AddItemForm addItem={addTodolist}/>
				</Grid>

				<Grid container spacing={4}>
					{todolists.map((tl) => {

						const allTodolistTasks = tasks[tl.id]
						let tasksForTodolist = allTodolistTasks

						if (tl.filter === 'active') {
							tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
						}

						if (tl.filter === 'completed') {
							tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
						}

						return (
							<Grid key={tl.id}>
								<Paper sx={{p: '0 20px 20px 20px'}}>
									<Todolist
										todolistId={tl.id}
										title={tl.title}
										tasks={tasksForTodolist}
										removeTask={removeTask}
										changeFilter={changeFilter}
										addTask={addTask}
										changeTaskStatus={changeTaskStatus}
										filter={tl.filter}
										removeTodolist={removeTodolist}
										updateTask={updateTask}
										updateTodolist={updateTodolist}
									/>
								</Paper>
							</Grid>
						)
					})}
				</Grid>
			</Container>
		</ThemeProvider>
	);
}

export default App;
