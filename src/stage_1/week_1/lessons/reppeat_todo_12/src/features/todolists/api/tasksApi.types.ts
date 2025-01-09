export type Task = {
    description: string | null
    title: string
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
    id: string
    todoListId: string
    order: number
    addedDate: string
}



export type GetTasksResponse = {
    totalCount: number
    error: string | null
    items: Task[]
}


export type UpdateTaskModel = {
    title: string,
    description: string | null,
    status: number,
    priority: number,
    startDate: string | null,
    deadline: string | null,
}