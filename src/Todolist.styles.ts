import {SxProps} from '@mui/material';

export const filterButtonsContainerSX: SxProps = {
    display: 'flex',
    justifyContent: 'space-between'
}
export const listItemSx = (isDone: boolean):SxProps => (
    {
        fontSize: 20,
        p: 0,
        justifyContent: 'space-between',
        opacity: isDone ? 0.5 : 1,
    }
)