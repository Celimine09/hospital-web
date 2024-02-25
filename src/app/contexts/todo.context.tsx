'use client'
import React, { Dispatch, SetStateAction, createContext, useState } from "react";

export interface ITodoContext
{
    // text: string
    // setText: Dispatch<SetStateAction<string>>
    
    todos: ITodo[]
    setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>

    addTodo: (text:string) => void
    removeTodo: (id: string) => void
    toggleTodo: (id: string) => void
}

const getInitialData = () => {
    // const str : string =  localStorage.getItem('todos') || "{}"
    // console.log(str)
    // // const str : string =  localStorage.getItem('todos') || "{}"
    // const data : ITodo[] = JSON.parse(str)
    // if (!data) return [];
    // return data;
}


export const TodoContext = createContext<ITodoContext>({
    // text : "default todo",
    // setText: (text:string) => {}
    // setText: () => {}
    todos: [],
    // todos: getInitialData(),
    setTodos: () => {},

    // setTodos: (prevTodos:ITodo[]) => {},

    addTodo: (text:string) => {},
    removeTodo: (id:string) => {},
    toggleTodo: (id:string) => {},
})

export const useTodoContext = () => React.useContext(TodoContext)

export const TodoFormProvider = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    const [todos, setTodos] = useState<ITodo[]>([]);

    const addTodo = (text: string) => {
        const newTodo : ITodo = {
            text: text,
            id: crypto.randomUUID(),
            completed: false
        }
        // console.log("AAA")
        // console.log(text)

        // setTodos((prevTodo:ITodo[]) => {
        setTodos(() => {
            return [...todos, newTodo]
        });
    };

    const removeTodo = (id: string) => {
        setTodos((prevTodos: ITodo[]) => {
            return prevTodos.filter((t: ITodo) => t.id !== id);
        });
    };

    const toggleTodo = (id: string) => {
        setTodos((prevTodos: ITodo[]) => {
            return prevTodos.map((todo: ITodo) => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed }
                } else {
                    return todo;
                }
            });
        });
    };



    // const [isOpen, setOpen] = React.useState(false);
    // const [username, setUsername] = useState<string | null>(null);
    return (
        <TodoContext.Provider value={{todos, setTodos, addTodo, removeTodo, toggleTodo}}>
            {children}
        </TodoContext.Provider>
    );
};