// 'use client'
import React, { createContext, useState } from "react";

export interface IDialogContext
{
    isOpen : boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const DialogContext = createContext<IDialogContext>({
    isOpen : false,
    setOpen: () => { return false}
})

export const useDialogContext = () => React.useContext(DialogContext)

// export const CustomDialogProvider: React.FC = ({children}) => {
export const TodoDialogProvider = ({children}:any) => {
    const [isOpen, setOpen] = React.useState(false);
    // const [username, setUsername] = useState<string | null>(null);
    return (
        <DialogContext.Provider value={{isOpen, setOpen}}>
            {children}
        </DialogContext.Provider>
    );
};