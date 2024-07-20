import axios, {AxiosRequestConfig} from "axios";

const config: AxiosRequestConfig = {
  withCredentials: true,
  headers: {
      'API-KEY': '01bf4acb-f3e9-4513-8766-774aca9b4f02'
  },

}

export const todolistAPI  = {
  getTodolist() {
    return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', config)
  },
  createTodloist() {
    return axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: 'MOBX'}, config)
  },
  deliteTodolist(todolistId: string) {
    return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, config)
  }

}