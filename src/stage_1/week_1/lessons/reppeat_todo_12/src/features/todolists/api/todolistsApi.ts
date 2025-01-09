import axios from "axios";
import {Response, Todolist} from "./todolistsApi.types";


export const todolistsApi = {
    getTodolists (configs: {}) {
        const promise = axios
            .get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', configs);
       return  promise
    },

    createTodolist (args: { title: string, configs: {} }) {
        return (axios.post<Response<{item: Todolist}>>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: args.title}, args.configs))
    },

    deliteTodlist (args: { id: string, configs: {} }) {
        return (axios
            .delete<Response>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${args.id}`, args.configs))
    },

    updateTodolist (args: { id: string, title: string, configs: {} }) {
        return (axios
            .put<Response<{item: Todolist}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${args.id}`, {title: args.title}, args.configs))
    }
}