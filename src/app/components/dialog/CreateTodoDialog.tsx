'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContext, IDialogContext, useDialogContext } from '../../contexts/dialog.context';
import TodoList from '../todo/TodoFormOutterBox';





export default function CreateTodoDialog() {
    const {isOpen, setOpen} = useDialogContext()

    const handleClickOpen = () => {
        setOpen(true);
        // customDialogContext.setOpen(true)
    };

    const handleClose = () => {
        setOpen(false);
        // customDialogContext.setOpen(false)
    };


    return (
        // <DialogContext.Provider value={{isOpen: open, setOpen: setOpen}}>
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen}
                style={{
                    width: "300px",
                    height: "50px",
                    fontSize: 18
                }}
                color='success'
            >
                Create Todo
            </Button>

            <Dialog
                open={isOpen}
                // open={true}
                onClose={handleClose}
                PaperProps={{
                }}
            >
                {/* <DialogTitle>Create Todo</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Subscribe</Button>
                </DialogActions> */}
                <DialogContent>
                    <TodoList />

                </DialogContent>



            </Dialog>
        </React.Fragment>


    );
}