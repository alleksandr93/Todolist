import './App.css';
import {ThemeProvider} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import {RootState} from './store';
import {ThemeMode} from './app-reducer';
import {getTheme} from '../common/theme/theme';

import {useSelector} from 'react-redux';
import {Header} from '../Header';
import {Main} from '../Main';

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



//Todo Пересмотреть Видео занятие
function App() {
    const themeMode = useSelector<RootState, ThemeMode>(state => state.app.themeMode)
    const theme = getTheme(themeMode)
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Header/>
                <Main/>
            </ThemeProvider>
        </div>
    );
}

export default App;
