import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Forgot() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP & Password
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (setter) => (e) => {
        setter(e.target.value);
        setError(""); // Clear error when user types
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/Forgot-password", { email });
            toast.success(response.data.message || "OTP sent successfully! 🎉");
            setStep(2); // Move to OTP verification step
        } catch (err) {
            setError(err.response?.data?.error || "Failed to send OTP.");
            toast.error(err.response?.data?.error || "You are not a user! ❌");
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match!");
            toast.error("Passwords do not match! ❌");
            setLoading(false);
            return;
        }

        try {
            console.log("sending request")
            const response = await axios.put("http://localhost:5000/Update-password", {
                email,
                otp,
                newPassword,
            });
            toast.success(response.data.message || "Password reset successfully! 🎉");
            setStep(1); // Reset form after success
            setEmail("");
            setOtp("");
            setNewPassword("");
            setConfirmPassword("");
            navigate("/register")
        } catch (err) {
            setError(err.response?.data?.error || "Invalid OTP or failed to reset password.");
            toast.error(err.response?.data?.error || "Invalid OTP or failed to reset password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={step === 1 ? handleEmailSubmit : handleOtpSubmit}
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 350,
                bgcolor: "white",
                p: 4,
                borderRadius: 2,
                boxShadow: 3,
                textAlign: "center",
            }}
        >
            <Typography variant="h5" sx={{ mb: 2 }} color="textPrimary">
                {step === 1 ? "Forgot Password" : "Reset Password"}
            </Typography>

            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            {step === 1 ? (
                // Step 1: Enter Email to Receive OTP
                <>
                    <TextField
                        label="Enter your email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={email}
                        onChange={handleChange(setEmail)}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                        {loading ? "Sending OTP..." : "Send OTP"}
                    </Button>
                </>
            ) : (
                // Step 2: Enter OTP and New Password
                <>
                    <TextField
                        label="Enter OTP"
                        type="text"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={otp}
                        onChange={handleChange(setOtp)}
                        required
                    />
                    <TextField
                        label="New Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={newPassword}
                        onChange={handleChange(setNewPassword)}
                        required
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={confirmPassword}
                        onChange={handleChange(setConfirmPassword)}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                        {loading ? "Resetting Password..." : "Reset Password"}
                    </Button>
                </>
            )}
        </Box>
    );
}
