import { useState, ChangeEvent, KeyboardEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";

type PropsType = {
	title: string
	tasks: TaskType[]
	removeTask: (taskId: string) => void
	changeFilter: (filter: FilterValuesType) => void
	addTask: (inputValue: string) => void
	changeCheckbox: (event: ChangeEvent<HTMLInputElement>, taskId: string) => void
}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTask, changeCheckbox}: PropsType) => {

	const [inputValue, setInputValue] = useState<string>('')


	const onChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.currentTarget.value)
		console.log(event.currentTarget.value.length)
	}
	

	const onKeyupHnadler = (event:KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			addTask(inputValue)
		}
		
	}

	const isDisabedInputButtonHandler = (inputValue: string) => {
		if (inputValue.length === 0) {
			return true
		} 
		return false
	}



	const errorHandler = (inputValue:string) => {
		if (inputValue.length > 8) {
			return ('error')
		} return ('')
	}

	const spanErrorCreater = (inputValue: string) => {
		if (inputValue.length > 8){
			return (<span style={{color:'green'}}>Title is so long </span>)
		} return (<span></span>)
	}
	

	return (
		<div>
			<h3>{title}</h3>
			<div>
				<input value={inputValue} 
							onChange={(event) => onChangeHandler(event)}
							onKeyUp={(event) => {onKeyupHnadler(event)}}
							className= {errorHandler(inputValue)}
				/>
				<Button disabled = {isDisabedInputButtonHandler(inputValue)} title={'+'} onClick={()=>{addTask(inputValue)}}/>
			</div>
			{spanErrorCreater(inputValue)}
			{inputValue.length > 8 ? <span style={{color:'red'}}>Title is so long 2</span> : null}
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{tasks.map(task => {
							return (
								<li key={task.id}>
									<input type="checkbox" checked={task.isDone} onChange={(event) => changeCheckbox(event, task.id)}/>
									<span>{task.title}</span>
									<Button title={'x'} onClick={() => removeTask(task.id)}/>
								</li>
							)
						})}
					</ul>
			}
			<div>
				<Button title={'All'} onClick={()=> changeFilter('all')}/>
				<Button title={'Active'} onClick={()=> changeFilter('active')}/>
				<Button title={'Completed'} onClick={()=> changeFilter('completed')}/>
			</div>
		</div>
	)
}
