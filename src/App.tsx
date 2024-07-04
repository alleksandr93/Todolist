import './App.css';
import {Todolist} from './Todolist';
import {useState} from 'react';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {ButtonAppBar} from './ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {createTheme, ThemeProvider} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

export  type ThemeMode = 'dark' | 'light'

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
            {id: todolistID1, title: 'What to learn', filter: 'all'},
            {id: todolistID2, title: 'What to buy', filter: 'all'},
        ]
    )
    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},

        ],
    })

    const updateTodolist = (todolistID: string, title: string) => {
        setTodolists(todolists.map(el => el.id === todolistID
            // {id: todolistID2, title: 'What to buy', filter: 'all'}
            ? {...el, title: title}
            : el
        ))
    }

    const updateTask = (todolistID: string, taskID: string, title: string) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(el => el.id === taskID
                ? {...el, title}
                : el
            )
        })
    }
    const removeTask = (taskId: string, todolistId: string) => {
        const newTodolistTasks = {...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}
        setTasks(newTodolistTasks)
    }
    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        const newTodolistTasks = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)
        }
        setTasks(newTodolistTasks)
    }
    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        const newTodolists = todolists.map(tl => {
            return tl.id === todolistId ? {...tl, filter} : tl
        })
        setTodolists(newTodolists)
    }
    const removeTodolist = (todolistId: string) => {
        const newTodolists = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(newTodolists)

        delete tasks[todolistId]
        setTasks({...tasks})
    }
    const addTask = (title: string, todolistId: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        const newTodolistTasks = {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
        setTasks(newTodolistTasks)
    }

    const addTodolist = (title: string) => {
        const newId = v1()
        const newTodo: TodolistType = {id: newId, title: title, filter: 'all'}
        setTodolists([newTodo, ...todolists])
        setTasks({[newId]: [], ...tasks})
    }
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#4acaf6',
            },
        },
    })
    const changeModeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
            <CssBaseline/>
                <Container fixed>
                    <ButtonAppBar changeModeHandler={changeModeHandler}/>
                    <Grid container sx={{mb: '30px'}}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todolists.map((tl) => {

                            const allTodolistTasks = tasks[tl.id]
                            let tasksForTodolist = allTodolistTasks

                            if (tl.filter === 'active') {
                                tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                            }

                            if (tl.filter === 'completed') {
                                tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                            }

                            return (
                                <Grid item key={tl.id}>
                                    <Paper elevation={6} sx={{p: '30px', borderRadius: '5px'}}>
                                        <Todolist
                                            todolistId={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            updateTask={updateTask}
                                            updateTodolist={updateTodolist}/>
                                    </Paper>
                                </Grid>

                            )
                        })}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default App;
