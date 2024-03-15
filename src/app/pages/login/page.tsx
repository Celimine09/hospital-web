"use client"
import { baseHost } from "@/app/constants/URLs";
import { LockOutlined } from "@mui/icons-material";
import {
    Container,
    CssBaseline,
    Box,
    Avatar,
    Typography,
    TextField,
    Button,
    Grid,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        axios.post(`${baseHost}/api/login`, {
            username: username ,
            password: password,
        })
        .then(status => {
            if (status.data.status === true) { // ตรวจสอบสถานะของการเข้าสู่ระบบที่ส่งกลับจากเซิร์ฟเวอร์
                // หากล็อกอินสำเร็จให้ทำการ redirect ไปที่หน้า main
                window.location.href = "http://localhost:3000";
                logginIn(true)
                console.log(sessionStorage)
            } else {
                // หากล็อกอินไม่สำเร็จให้แสดงข้อความผิดพลาด
                alert("Login failed. Please check your username or password.");
            }
            console.log(status)
        })
        .catch(error => {
            console.error('Error:', error);
            // หากเกิดข้อผิดพลาดในการเชื่อมต่อกับ backend
            alert("An error occurred. Please try again later.");
        });
    };

    return (
        <>
            <Container maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        mt: 20,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
                        <LockOutlined />
                    </Avatar>
                    <Typography variant="h5">Login</Typography>
                    <Box sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default LoginPage

export async function logginIn(x: boolean) {
    if (x === true){
        sessionStorage.setItem('loggedIn','true');
    }
}