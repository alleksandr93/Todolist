import {RootState} from './app/store';
import {ButtonAppBar} from './ButtonAppBar';
import {switchThemeAC, ThemeMode} from './app/app-reducer';
import {useDispatch, useSelector} from 'react-redux';

export const Header = () => {
    const themeMode = useSelector<RootState, ThemeMode>(state => state.app.themeMode)


    const dispatch = useDispatch()

    const changeModeHandler = () => {
        dispatch(switchThemeAC(themeMode === 'light' ? 'dark' : 'light'))
    }
    return <ButtonAppBar changeModeHandler={changeModeHandler}/>
};
