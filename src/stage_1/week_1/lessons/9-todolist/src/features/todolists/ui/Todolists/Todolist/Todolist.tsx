import {TodolistType} from "../../../../../app/App";
import {AddItemForm} from "../../../../../common/components/AddItemForm/AddItemForm";
import {FilterTasksButtons} from "./FilterTasksButton/FilterTasksButtons";
import Tasks from "../Tasks/Tasks";
import {TodolistTitle} from "../TodolistTitle/TodolistTitle";
import {addTaskAC} from "../../../model/tasks-reducer";
import {useDispatch} from "react-redux";


type PropsType = {
	todolist:TodolistType
}

export const Todolist = ({todolist}: PropsType) => {

	const dispatch = useDispatch();

	const addTaskCallback = (title: string) => {
		dispatch(addTaskAC({title, todolistId: todolist.id}))
	}


	return (
		<div>
			<TodolistTitle todolist={todolist}/>
			<AddItemForm addItem={addTaskCallback}/>
			<Tasks todolist = {todolist}/>
			<FilterTasksButtons todolist={todolist}/>

		</div>
	)
}
