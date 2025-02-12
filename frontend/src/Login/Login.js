import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useAuth } from "../routes/AuthContex";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const { login } = useAuth();  // Destructure login from useAuth
    const navigate =useNavigate();
    const handleChange = (e) => {
        setError("");  // Clear error on input change
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
            component="form"  // Added form component
            onSubmit={handleSubmit}  // Moved to form submit
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
                type="password"
                fullWidth
                sx={{ mb: 2 }}
                onChange={handleChange}
                value={formData.password}
                required
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