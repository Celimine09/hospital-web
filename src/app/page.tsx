'use client'
import Image from "next/image";
import styles from "./styles/page.module.css";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
// import { TodoCard } from "./components/TodoCard";
// import CreateTodoDialog from "./components/CreateTodoDialog";
import TodoForm from "./components/todo/TodoForm";
import TodoList from "./components/todo/TodoFormOutterBox";
import React, { useContext } from "react";
import { TodoContext, useTodoContext } from "./contexts/todo.context";
import TodoItem from "./components/todo/TodoItem";
import CreateTodoDialog from "./components/dialog/CreateTodoDialog";
import MySearchBar from "./components/searchbar/MySearchBar";


export default function Home() {
  const {todos} = React.useContext(TodoContext)
  return (
    <main className={styles.main}>

      <CreateTodoDialog/>
      {/* <TodoList /> */}
      <MySearchBar />

      <Typography variant="h5">
        TODOs show here ...
      </Typography>
      <Grid container spacing={6}>
        {
          todos
          //.filter(FILTER_MAP[filter])
          .map((todo:ITodo) => (
              <TodoItem 
                  todo={todo}
                  key={todo.id}
              />
          ))
        }
      </Grid>


    </main>
  );
}
