import React from "react";
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import {useSelector} from "react-redux";
import {RootState} from "./store";
import {ThemeMode} from "./app-reducer";
import {getTheme} from "../common/theme/theme";
import {Header} from "../common/components/Header/Header";
import {Main} from "./Main";

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


function App() {

const themeMode = useSelector <RootState, ThemeMode> ((state) => state.app.themeMode)

	const theme = getTheme(themeMode)

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline/>
				<Header/>
				<Main/>
		</ThemeProvider>
	);
}

export default App;
