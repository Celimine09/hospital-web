'use client'
import React, { PropsWithChildren, useEffect, useState } from "react";
import Navbar from "./navbar";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const Layout = ({ children }: PropsWithChildren) => {
    const [loggingIn, setLoggingIn] = useState(false);

    useEffect(() => {
        const loggedInState = sessionStorage.getItem('loggedIn');
        if (loggedInState === 'true') {
            setLoggingIn(true);
        }
    }, []);

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                {loggingIn && <Navbar />}
                {children}
            </ThemeProvider>
        </>
    );
};

export default Layout;
