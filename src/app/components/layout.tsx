'use client'
import React, { PropsWithChildren } from "react";
import Navbar from "./navbar";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
    palette: {
    mode: 'dark',
    },
});
const Layout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Navbar />
                {children}
            </ThemeProvider>
        </>
    );
};
export default Layout;