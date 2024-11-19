import {ChangeEvent, useState} from "react";


type Props = {
    oldTitle: string
    updateItem:(newTitle:string)=>void
};
export const EditableSpan = ({oldTitle,updateItem}: Props) => {
    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(oldTitle)

    const activateEditModeHandler=()=>{
        setEditMode(!editMode)
        if(editMode){
            addItemHandler()
        }

    }

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    const addItemHandler = () => {
        updateItem(newTitle)
    }

    return (

        editMode
            ?<input
                onChange={changeTitleHandler}
                type="text"
                value={newTitle}
                onBlur={activateEditModeHandler}
                autoFocus/>
            : <span
                onDoubleClick={activateEditModeHandler }>{oldTitle}</span>

    );
};