import {TasksStateType, TaskType} from './App'

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            const {todolistId, taskId} = action.payload
            const updatedTask = {...state}
            updatedTask[todolistId] = updatedTask[todolistId].filter((task) => task.id !== taskId)
            return updatedTask
        default:
            return state
    }
}

export const removeTaskAC = ( todolistId: string, taskId: string) : RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        payload: {taskId,  todolistId}
    } as const
}

type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    payload: {
        todolistId: string,
        taskId: string
    }
}

type ActionType = RemoveTaskActionType