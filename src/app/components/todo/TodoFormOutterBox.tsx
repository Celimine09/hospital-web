// 'use client'
import List from '@mui/material/List';
import { useState, useEffect, useContext } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { Box, Typography, createTheme, ThemeProvider } from '@mui/material';
import FilterBtn from './FilterBtn';
import { TodoContext } from '../../contexts/todo.context';

const theme = createTheme({
    typography: {
        fontFamily: [
            'Montserrat',
            'sans-serif',
        ].join(','),
    },
});

const styles = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    m: 3,
    backgroundColor: 'white',
    paddingBottom: '40px',
    margin: '3rem 0 3rem 0',
    padding: '1rem',
    position: 'relative',
    webkitBoxShadow: '0px 15px 0px -5px #ef8257, 0px 30px 0px -10px #f39e7c, 5px 5px 15px 5px rgba(0,0,0,0)',
    boxShadow: '0px 14px 0px -5px #ef8257, 0px 28px 0px -10px #f39e7c, 5px 5px 15px 5px rgba(0,0,0,0)',
    border: '2px solid #252422',
    maxWidth: '38rem',
    marginLeft: 'auto',
    marginRight: 'auto'
}

const FILTER_MAP = {
    All: () => true,
    Active: (todo: ITodo) => !todo.completed,
    Completed: (todo: ITodo) => todo.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function TodoFormOutterBox() {
    // const [todos, setTodos] = useState(getInitialData);
    const { todos, setTodos } = useContext(TodoContext)
    const [filter, setFilter] = useState('All');

    const filterList = FILTER_NAMES.map((name) => (
        <FilterBtn
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
        />
    ))

    // * every time todo is updated -> update data in database 
    useEffect(() => {
        localStorage.setItem(
            'todos',
            JSON.stringify(todos)
        )
    }, [todos]);


    // const s = FILTER_MAP[filter]
    // const taskList = 
    //     todos
    //     // .filter(FILTER_MAP[filter])
    //     // .filter(s)
    //     .map((todo:ITodo) => (
    //         <TodoItem 
    //             todo={todo}
    //             key={todo.id}
    //             remove={removeTodo}
    //             toggle={() => toggleTodo(todo.id)}
    //         />
    //     ))

    return (
        <ThemeProvider theme={theme}>
            <Box
                className='TodoList'
                sx={styles}
            >

                <Box
                    sx={{
                        width: '100%',
                        maxWidth: 500,
                        bgcolor: 'background.paper',
                        fontFamily: 'inherit'
                    }}
                >
                    <Typography
                        variant='h5'
                        component='h4'
                        sx={{
                            color: '#eb5e28',
                            paddingBottom: '10px',
                            fontWeight: '500',
                            textAlign: 'center'
                        }}
                    >
                        Create Todo
                    </Typography>
                    <TodoForm />
                    <Typography
                        variant='h5'
                        component='h5'
                        sx={{
                            display: 'flex',
                            marginTop: '10px',
                            justifyContent: 'space-between'
                        }}
                    >
                        {todos.length} task{todos.length !== 1 && 's'} left
                        <span>
                            {filterList}
                        </span>
                    </Typography>


                </Box>
            </Box>
        </ThemeProvider>
    )
}