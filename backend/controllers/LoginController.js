const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Model/loginschema");

const router = express.Router();

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
}

module.exports = new UserController();
