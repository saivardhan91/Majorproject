const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Model/loginschema");
const OTP=require("../Model/otpschema")
const router = express.Router();
const nodemailer = require("nodemailer");

class UserController {
    constructor() {
        this.generateAccId = this.generateAccId.bind(this);
        this.Register = this.Register.bind(this);
    }

    async generateAccId() {
        try {
            const lastUser = await User.findOne().sort({ accId: -1 });

            if (!lastUser || !lastUser.accId) {
                return "T0000001"; // Start from T0000001 if no user exists
            }

            const lastAccId = lastUser.accId;
            const numericPart = parseInt(lastAccId.substring(1)) + 1;
            const newAccId = `T${numericPart.toString().padStart(7, "0")}`;

            return newAccId;
        } catch (error) {
            console.error("Error generating accId:", error);
            return "T0000001"; // Fallback if error occurs
        }
    }

    async Register(req, res) {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ error: "All fields are required" });
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ error: "Invalid email format" });
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: "Email already in use" });
            }

            // ✅ Fix: Use "this.generateAccId()"
            const accId = await this.generateAccId();
             console.log(accId);
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                accId
            });

            await newUser.save();

            const tokenPayload = {
                userId: newUser._id,
                email: newUser.email
            };

            const token = jwt.sign(tokenPayload, process.env.JSON_WEB_SIGN, { expiresIn: "24h" });

            res.json({
                message: "Registration successful",
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    accId: newUser.accId
                },
                token
            });
        } catch (err) {
            console.error("Error in Register:", err);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    
    async Login(req, res) {
        try {
            const { email, password } = req.body;

            // Input validation
            if (!email || !password) {
                return res.status(400).json({ error: "Email and password are required" });
            }

            // Email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ error: "Invalid email format" });
            }

            // Find user by email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ error: "Invalid credentials" });
            }

            // Compare passwords
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: "Invalid credentials" });
            }

            // Generate JWT Token
            const tokenPayload = {
                userId: user._id,
                email: user.email
            };
            
            const token = jwt.sign(
                tokenPayload,
                process.env.JSON_WEB_SIGN,
                { expiresIn: '24h' }
            );

            // Send response
            res.json({
                message: "Login successful",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                },
                token
            });
        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async ForgotPassword(req, res) {
        try {
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({ error: "Email is required" });
            }
    
            // Check if user exists
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
    
            // Generate a random 6-digit OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Convert to string
            // const otpExpiration = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 mins
    
            // Delete previous OTP if exists
            await OTP.deleteOne({ email });
    
            // Store or update OTP in OTP schema
            await OTP.create({ email, otp, createdAt: Date.now() });
    
            // Configure nodemailer
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });
    
            // Email content
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Your OTP for Password Reset",
                text: `Your OTP is ${otp}. It is valid for 10 minutes. Do not share it with anyone.`,
            };
    
            // Send OTP email
            await transporter.sendMail(mailOptions);
    
            res.json({ message: "OTP sent successfully" });
        } catch (error) {
            console.error("Error in ForgotPassword:", error);
            res.status(500).json({ error: "Server error" });
        }
    }
    async Changepassword(req, res) {
        try {
            const { email, otp, newPassword} = req.body;
            console.log(req.body)
            // Validate input
            if (!email || !otp || !newPassword ) {
                return res.status(400).json({ error: "All fields are required" });
            }
    
            // Check if OTP is valid
            const otpRecord = await OTP.findOne({ email, otp });
            if (!otpRecord) {
                return res.status(400).json({ error: "Invalid or expired OTP" });
            }
    
            // Hash new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
    
            // Update user's password in the database
            await User.findOneAndUpdate({ email }, { password: hashedPassword });
    
            // Delete the OTP after successful password reset
            await OTP.deleteOne({ email });
    
            res.json({ message: "Password changed successfully!" });
        } catch (err) {
            console.error("Error in Changepassword:", err);
            res.status(500).json({ error: "Server error" });
        }
    }
    
}

module.exports = new UserController();
