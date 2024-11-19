import React from "react";
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import {getTheme} from "../common/theme/theme";
import {Header} from "../common/components/Header/Header";
import {Main} from "./Main";
import {useAppSelector} from "../common/hooks/useAppSelector";
import {selectThemeMode} from "../features/todolists/model/appSelectors";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[key: string]: TaskType[]
}


export const App = ()=> {

const themeMode = useAppSelector(selectThemeMode)

	const theme = getTheme(themeMode)

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline/>
				<Header/>
				<Main/>
		</ThemeProvider>
	);
}

