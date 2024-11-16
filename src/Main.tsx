import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {AddItemForm} from './AddItemForm';
import {Todolists} from './Todolists';
import {addTodolistAC} from './module/todolist-reducer';
import {useDispatch} from 'react-redux';


export const Main = () => {
    const dispatch = useDispatch()
    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }
    return <Container fixed>
        <Grid container sx={{mb: '30px'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Todolists/>
    </Container>
};
