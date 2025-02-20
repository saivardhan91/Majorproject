import React, { useState } from "react";
import { Box, Typography, TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../routes/AuthContex";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setError("");
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(formData);
            toast.success("Login Successful! 🎉");
            console.log("Login successful:", response);
            navigate('/Home');
        } catch (err) {
            toast.error("Login Failed! ❌");
            setError(err.toString());
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 300,
                backgroundColor: "white",
                padding: 4,
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            <Typography variant="h5" sx={{ mb: 2 }} color="textPrimary" align="center">
                Login
            </Typography>

            {error && (
                <Typography color="error" sx={{ mb: 2 }} align="center">
                    {error}
                </Typography>
            )}

            <TextField
                label="Email"
                name="email"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                onChange={handleChange}
                value={formData.email}
                required
            />

            <TextField
                label="Password"
                name="password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                fullWidth
                sx={{ mb: 2 }}
                onChange={handleChange}
                value={formData.password}
                required
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                {showPassword ? <Visibility />: <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <Typography
                variant="body2"
                align="left"
                sx={{ color: "primary.main", cursor: "pointer", mb: 2 }}
            >
                Forgot Password?
            </Typography>

            <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
            </Button>
        </Box>
    );
}
