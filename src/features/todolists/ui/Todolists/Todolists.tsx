import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {useAppSelector} from '../../../../common/hooks/useAppSelector';
import {Todolist} from './Todolist/Todolist';
import {selectTodolists} from '../../../../app/appSelectors';


export const Todolists = () => {
    const todolists=useAppSelector(selectTodolists);
    return <>
            {todolists.map((tl) => {
                return (
                    <Grid item key={tl.id}>
                        <Paper elevation={6} sx={{p: '30px', borderRadius: '5px'}}>
                            <Todolist
                                todolist={tl}/>
                        </Paper>
                    </Grid>

                )
            })}
    </>
};
