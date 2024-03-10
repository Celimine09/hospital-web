import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Styles from '../styles/navbar.module.css';

interface INavblock {
  blockName: string;
}

const Navblock = (props: INavblock) => {
  return (
    <Button variant="contained" className={Styles.navbarButton}>
      {props.blockName}
    </Button>
  );
};

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#1B3C73', height: '110px'}}>
        <Toolbar>
          <Navblock blockName="จัดการข้อมูลคนไข้" />
          <Navblock blockName="จัดการข้อมูลบุคลากร" />
          <Navblock blockName="ดูห้องว่าง" />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
