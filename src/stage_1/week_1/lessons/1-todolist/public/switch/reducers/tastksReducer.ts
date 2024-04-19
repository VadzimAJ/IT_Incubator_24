import {TaskType} from "./App";

export  const tasksReducer=(state:TaskType[], action:ActionsTypes):TaskType[]=>{
    switch (action.type) {
        case "REMOVE-TASK":{
            return state
        }
        default:return  state
    }
}

type ActionsTypes=RemoveTaskActionType

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    payload: {
        id: string
    }
}
export const removeTaskAC=(id:string)=>{
    return{
        type:'REMOVE-TASK',
        payload:{
          id
        }
    } as const
}