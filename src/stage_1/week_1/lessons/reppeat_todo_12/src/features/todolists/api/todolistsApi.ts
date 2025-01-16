import axios from "axios"
import { BaseResponse, Todolist } from "./todolistsApi.types"
import { instance } from "../../../common/components/instance/instance"

export const todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("todo-lists")
  },

  createTodolist(args: { title: string }) {
    const { title } = args

    return instance.post<BaseResponse<{ item: Todolist }>>("todo-lists", { title })
  },

  deliteTodlist(args: { id: string }) {
    const { id } = args

    return instance.delete<BaseResponse>(`todo-lists/${id}`)
  },

  updateTodolist(args: { id: string; title: string }) {
    const { id, title } = args

    return instance.put<BaseResponse<{ item: Todolist }>>(`todo-lists/${id}`, { title })
  },
}
