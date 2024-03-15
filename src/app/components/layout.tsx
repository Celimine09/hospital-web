'use client'
import React, { PropsWithChildren, useEffect, useState } from "react";
import Navbar from "./navbar";
import CssBaseline from '@mui/material/CssBaseline';
import { PaletteMode } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ColorModeContext } from "../contexts/theme.context";


const Layout = ({ children }: PropsWithChildren) => {
    const [mode, setMode] = React.useState<PaletteMode>('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );


    const [loggingIn, setLoggingIn] = useState(false);

    useEffect(() => {
        const loggedInState = sessionStorage.getItem('loggedIn');
        if (loggedInState === 'true') {
            setLoggingIn(true);
        }
    }, []);

    return (
        <>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {loggingIn && <Navbar />}
                    {children}
                </ThemeProvider>

            </ColorModeContext.Provider>
        </>
    );
};

export default Layout;
