// 'use client'
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { InputAdornment } from '@mui/material';
import { IconButton } from "@mui/material";
import { ChangeEvent, ChangeEventHandler, DOMAttributes, FormEvent, FormEventHandler, useContext, useState } from "react";
import { TodoContext } from "../../contexts/todo.context";
import { DialogContext } from "@/app/contexts/dialog.context";

// export default function TodoForm({ addTodo } : any) {
export default function TodoForm() {
    const [text, setText] = useState('');
    const { addTodo } = useContext(TodoContext)
    const { setOpen } = useContext(DialogContext)


    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const s = event.target.value
        // console.log(s)
        setText(s)
    };

    // const a : 
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        // console.log("ADDED to todo ...")
        // console.log(text)
        e.preventDefault();
        addTodo(text);
        setText('');
        // * set todo dialog to close
        setOpen(false)

    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                sx={{
                    width: '470px'
                }}
                color='warning'
                id='outlined-basic'
                label='add task'
                variant='outlined'
                onChange={handleChange}
                value={text}
                InputProps={{
                    endAdornment:
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="create todo"
                                edge="end"
                                type="submit"
                            >
                                <CreateOutlinedIcon sx={{ color: '#eb5e28' }} />
                            </IconButton>
                        </InputAdornment>
                }}
            />
        </form>
    );
}