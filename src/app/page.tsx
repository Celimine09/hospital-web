import Image from "next/image";
import styles from "./page.module.css";
import { Box, Button, Grid, TextField } from "@mui/material";
import { TodoCard } from "./components/TodoCard";
import CustomDialog from "./components/CustomDialog";


export default function Home() {
  return (
    <main className={styles.main}>
      {/* // <main className=""> */}
      <Box
        component="form"
        noValidate
        autoComplete="off"
      // sx={{flex}}
      >
        <CustomDialog />
        <TextField id="outlined-basic" label="Search me"
          variant="filled"
          fullWidth
          color="secondary"
        />
        <Button variant="contained" color="primary">
          button
        </Button>
      </Box>
      <Grid container spacing={6}>
        <TodoCard todoName="Go shop" todoDescription="descdesc"/>
        <TodoCard todoName="Enroll 42" 
          todoDescription=
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quo molestias recusandae laboriosam rem! Sapiente excepturi quibusdam deserunt quis ad. Quo sunt unde laudantium eius ipsa nulla pariatur odit eligendi. \
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quo molestias recusandae laboriosam rem! Sapiente excepturi quibusdam deserunt quis ad. Quo sunt unde laudantium eius ipsa nulla pariatur odit eligendi."
          />
      </Grid>


    </main>
  );
}
