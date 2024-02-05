'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContext, IDialogContext, useDialogContext } from '../contexts/contexts';



// export const CustomDialogProvider: React.FC = ({children}) => {
export const CustomDialogProvider = ({children}:any) => {
    const [isOpen, setOpen] = React.useState(false);
    // const [username, setUsername] = useState<string | null>(null);
    return (
        <DialogContext.Provider value={{isOpen, setOpen}}>
            {children}
        </DialogContext.Provider>
    );
};


export default function CustomDialog() {
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
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Subscribe</DialogTitle>
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
                </DialogActions>
            </Dialog>
        </React.Fragment>


    );
}