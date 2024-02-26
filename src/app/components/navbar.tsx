import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Styles from '../styles/navbar.module.css';

interface INavblock {
  blockName: string;
}
const Navblock = (props: INavblock) => {
  return (
    <>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className={Styles.navbar}>
        {props.blockName}
      </Typography>
    </>
  );
};
export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Navblock blockName="จัดการข้อมูลคนไข้" />
          <Navblock blockName="จัดการข้อมูลบุคลากร" />
          <Navblock blockName="ดูห้องว่าง" />
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
