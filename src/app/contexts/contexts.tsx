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