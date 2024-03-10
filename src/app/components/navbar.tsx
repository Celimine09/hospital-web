import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Styles from '../styles/navbar.module.css';
import { IconButton, Typography } from "@mui/material";
import { LocalHospital, Menu } from "@mui/icons-material";
import Link from "next/link";

interface INavblock {
  blockName: string;
  url: string
}

const Navblock = (props: INavblock) => {
  return (
    <Button variant="outlined" className={Styles.navbarButton}>
    {/* // <div className={Styles.navbarButton}> */}
    {/* // <Button variant="outlined" > */}
      <Link href={props.url}>
        {props.blockName}
      </Link>
    </Button>
  );
};

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <AppBar position="static" sx={{ backgroundColor: '#1B3C73', height: '110px'}}>
        <Toolbar>
          <Navblock blockName="จัดการข้อมูลคนไข้" />
          <Navblock blockName="จัดการข้อมูลบุคลากร" />
          <Navblock blockName="ดูห้องว่าง" />
        </Toolbar>
      </AppBar> */}

      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <Menu/> */}
            <Link href={"/"}>
              <LocalHospital />
            </Link>
          </IconButton>
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography> */}
          <Navblock blockName="จัดการข้อมูลคนไข้" url="/"/>
          <Navblock blockName="จัดการข้อมูลบุคลากร" url="/"/>
          <Navblock blockName="ดูห้องว่าง" url="pages/room"/>

        </Toolbar>
      </AppBar>
    </Box>
  );
}



export function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
    </Box>
  );
}