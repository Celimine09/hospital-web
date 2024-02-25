import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useTodoContext } from '@/app/contexts/todo.context';
import { Grid } from '@mui/material';


// export default function TodoItem ({ todo, remove, toggle }:any) {
// export default function TodoItem (todo : ITodo) {
interface ITodoItem
{
    todo: ITodo
}

export default function TodoItem ({todo }: ITodoItem) {
    const {removeTodo, toggleTodo} = useTodoContext()
    const labelId = `checkbox-list-label-${todo.id}`;

    const localRemoveTodo = () => {
        removeTodo(todo.id);
    };
    
    return (
        <Grid item xs={6}>
            <ListItem
                key={todo.id}
                secondaryAction={
                    <IconButton edge="end" aria-label="comments" onClick={localRemoveTodo}>
                        <DeleteOutlineIcon sx={{ color: '#eb5e28' }} />
                    </IconButton>
                }
                disablePadding
                style={{
                    backgroundColor: "white",
                    borderStyle: "double",
                    borderColor: "black",
                }}
            >
                <ListItemButton
                    role={undefined}
                    dense
                >
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={todo.completed}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                            // onChange={toggleTodo}
                            onChange={(e) => { toggleTodo(todo.id) }}
                            icon={<RadioButtonUncheckedIcon />}
                            checkedIcon={<CheckCircleOutlineIcon />}
                            color='warning'
                        />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={todo.text} style={{
                        color: 'black'
                    }}  />
                </ListItemButton>
            </ListItem>
        </Grid>
    );
}
