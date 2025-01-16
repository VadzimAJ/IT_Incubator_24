import { instance } from "common/components/instance/instance"
import type { GetTasksResponse } from "./tasksApi.types"

export const tasksApi = {
  getTasks(args: { id: string }) {
    const { id } = args
    return instance.get<GetTasksResponse>(`todo-lists/${id}/tasks`)
  },
  createTask(args: { title: string; todolistId: string }) {
    const { title, todolistId } = args
    return instance.post(`todo-lists/${todolistId}/tasks`, { title })
  },
}
