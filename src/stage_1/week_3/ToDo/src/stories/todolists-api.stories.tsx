import React, {useEffect, useState} from 'react'
import axios, {AxiosRequestConfig} from "axios";

export default {
    title: 'API',
}

const config: AxiosRequestConfig = {
    withCredentials: true,
    headers: {
        'API-KEY': '01bf4acb-f3e9-4513-8766-774aca9b4f02'
    },

}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const promise =
            axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', config)

        promise.then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: 'MOBX'}, config)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

const todolistId = 'dfb1b938-2a9e-4837-b95c-0ad6b67b2133'

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
      axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, config)
      .then(res => {
        setState(res.data)
      })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    const todolistId = '21686d17-6cd3-49e4-aa7a-d905e2566f3b'
    const title = 'React'

    useEffect(() => {
      axios
      .put(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
        { title: title },
        config
      )
      .then(res => {
        setState(res.data)
      })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}