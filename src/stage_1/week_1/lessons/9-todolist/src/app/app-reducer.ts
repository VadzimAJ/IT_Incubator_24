

import { TasksStateType} from '../app/App'
import {v1} from "uuid";

export type ThemeMode = 'dark' | 'light'

type InitialState = typeof initialState

const initialState = {
    themeMode: 'light' as ThemeMode

}


export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
    switch (action.type) {
        case 'SWITCH-TASK': {
            return  {...state, themeMode:action.payload.theme}
        }

        default:
            return state
    }
}

// Action creators
export const switchThemeAC = (theme: ThemeMode) => {
    return {
    type: 'SWITCH-TASK',
    payload: {theme}
    } as const
}




// Actions types

export type SwitchThemeType = ReturnType<typeof switchThemeAC>

type ActionsType =
    SwitchThemeType