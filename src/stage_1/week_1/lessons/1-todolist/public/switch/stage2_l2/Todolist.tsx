import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent} from "react";
import {Button} from "./Button";
import { AddItemForm } from "./AddItemForm";
import { EditableTag } from "./EditableTag";

type PropsType = {
	title: string
	todolistId: string
	tasks: TaskType[]
	removeTask: (taskId: string, todolistId: string) => void
	changeFilter: (filter: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
	filter: FilterValuesType
	removeTodolist: (todolistId: string) => void
	updateTaskOrTodolist: (todolistId: string, title: string, taskId?: string ) => void
}

export const Todolist = (props: PropsType) => {
	const {
		title,
		tasks,
		filter,
		removeTask,
		changeFilter,
		addTask,
		changeTaskStatus,
		todolistId,
		removeTodolist,
		updateTaskOrTodolist
	} = props

	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		changeFilter(filter, todolistId)
	}

	const removeTodolistHandler = () => {
		removeTodolist(todolistId)
	}

	const addTaskCallback = (title:string) => {
		addTask(title, todolistId)
	}

	const changeTodolistTitleHandler = (title: string) => {
		updateTaskOrTodolist(todolistId,  title)
	}

	return (
		<div>
			<div className={"todolist-title-container"}>
				{/* <h3>{title}</h3> */}
				<EditableTag onChange={changeTodolistTitleHandler} value={title} tag ='h3'/>
				<Button title={'x'} onClick={removeTodolistHandler}/>
			</div>
			<AddItemForm addItem={addTaskCallback}/>
			<input type='checkbox'/>
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{tasks.map((task) => {

							const removeTaskHandler = () => {
								removeTask(task.id, todolistId)
							}

							const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
								const newStatusValue = e.currentTarget.checked
								changeTaskStatus(task.id, newStatusValue, todolistId)
							}
							
							const changeTaskTitleHandler = (title: string) => {
								updateTaskOrTodolist(todolistId, title, task.id)
							}

							return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
								<input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
								
								<EditableTag value={task.title} onChange={changeTaskTitleHandler} tag ='span'/>
								<Button onClick={removeTaskHandler} title={'x'}/>
							</li>
						})}
					</ul>
			}
			<div>
				<Button className={filter === 'all' ? 'active-filter' : ''} title={'All'}
				        onClick={() => changeFilterTasksHandler('all')}/>
				<Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'}
				        onClick={() => changeFilterTasksHandler('active')}/>
				<Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'}
				        onClick={() => changeFilterTasksHandler('completed')}/>
			</div>
		</div>
	)
}
