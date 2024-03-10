import { LockOutlined } from "@mui/icons-material";
import {
    Container,
    CssBaseline,
    Box,
    Avatar,
    Typography,
    TextField,
    Button,
} from "@mui/material";
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            // ส่งข้อมูล email และ password ไปยัง backend
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Name: email,
                    password: password,
                }),
            });

            // ตรวจสอบการตอบกลับจาก backend
            if (response.ok) {
                // แปลงข้อมูลที่ได้รับเป็น JSON
                const data = await response.json();
                console.log(data);
                if (data.success) {
                    // หากล็อคอินสำเร็จให้ redirect ไปที่หน้า main
                    window.location.href = "/main";
                } else {
                    // หากล็อคอินไม่สำเร็จให้แสดงข้อความผิดพลาด
                    alert("Login failed. Please check your credentials.");
                }
            } else {
                // หากเกิดข้อผิดพลาดในการเชื่อมต่อกับ backend
                console.error('Error:', response.status);
                alert("An error occurred. Please try again later.");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred. Please try again later.");
        }
    };

    return (
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
                        id="Name"
                        label="First Name"
                        name="name"
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
                        onChange={(e) => setPassword(e.target.value)}
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
    );
};

export default Login;
