'use client'
import { Button, ButtonGroup, Card, CardActions, CardContent, Grid, IconButton, Typography } from "@mui/material"
import React, { ElementType, useEffect, useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit } from "@mui/icons-material";
import { DialogContext } from "../contexts/contexts";


// const TodoCard : ElementType = (todoData:ITodoCard) => {
const TodoCard : ElementType<ITodoCard> = (todoData) => {
    // const descCharLenght : number = todoData.todoDescription.length
    const nSliced = 150
    // const shortenDesc : string = 
    const [shortenDesc, setShortenDesc] = useState<string>(todoData.todoDescription)
    const customDialogContext = React.useContext(DialogContext)


    useEffect(() => {
        // console.log(todoData.todoDescription.length )
        if (todoData.todoDescription.length > nSliced)
        {
            setShortenDesc(todoData.todoDescription.slice(0, nSliced) + "...")
        } 
        // console.log(shortenDesc)
    }, [])
    return (
        <Grid item>
            {/* <Card sx={{ minWidth: 275 }}> */}
            <Card sx={{
                // width: 275, height: 275 * 1.61
                width: 200, height: 200 * 1.61
            }}
            >
                <CardContent>
                    <Typography variant="h5" component="div">
                        {todoData.todoName}
                    </Typography>
                    <br />
                    <Typography variant="body2" color="text.secondary"
                        sx={{ wordBreak: "break-word" }}
                    >
                        {/* {todoData.todoDescription} */}
                        {shortenDesc}
                    </Typography>
                </CardContent>
                <CardActions>
                    <ButtonGroup sx={{
                        ml: "auto",
                        // mt: "100%",
                        // mb: "0"
                    }}>
                        <IconButton color="primary" onClick={() => {
                            customDialogContext.setOpen(true)
                        }}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton color="primary">
                            <Edit />
                        </IconButton>
                    </ButtonGroup>
                </CardActions>
            </Card>

        </Grid>

    )
}


export { TodoCard }