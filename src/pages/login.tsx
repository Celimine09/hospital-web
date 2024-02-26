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
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // ส่งข้อมูล email และ password ไปยัง backend
        fetch('your-login-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })

            //เว้นไว้รอเชื่อม back end
            // .then(response => response.json())
            // .then(data => {
            //     // ตรวจสอบการตอบกลับจาก backend และดำเนินการต่อไปตามต้องการ
            //     console.log(data);
            //     if (data.success) {
            //         // หากล็อคอินสำเร็จให้ redirect ไปที่หน้า main
            //         window.location.href = "/main";
            //     } else {
            //         // หากล็อคอินไม่สำเร็จให้แสดงข้อความผิดพลาด
            //         alert("Login failed. Please check your credentials.");
            //     }
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            //     // หากเกิดข้อผิดพลาดในการเชื่อมต่อกับ backend
            //     alert("An error occurred. Please try again later.");
            // });
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
                            id="email"
                            label="Email Address"
                            name="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        
                        {/* ตอนนี้ยังไม่ได้เชื่อม back end เลยทำให้กดแล้วเปลี่ยนหน้าเอา */}
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

export default Login;
