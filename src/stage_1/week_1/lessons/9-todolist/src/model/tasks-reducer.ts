import { TasksStateType } from '../App'

const initialState: TasksStateType = {
  todolistId1: [
    { id: '1', title: 'CSS', isDone: false },
    { id: '2', title: 'JS', isDone: true },
    { id: '3', title: 'React', isDone: false },
  ],
  todolistId2: [
    { id: '1', title: 'bread', isDone: false },
    { id: '2', title: 'milk', isDone: true },
    { id: '3', title: 'tea', isDone: false },
  ],
}

 
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      return  {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)}
    }
 
    default:
      throw new Error("I don't understand this type")
  }
}
 
// Action creators
export const removeTaskAC = (taskId:string, todolistId: string) => {
  return { type: 'REMOVE-TASK', payload: {taskId, todolistId} } as const
}
 
// Actions types
export type removeTaskACType = ReturnType<typeof removeTaskAC>
 
type ActionsType = removeTaskACType