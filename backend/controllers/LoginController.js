const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Model/loginschema");

const router = express.Router();

class UserController {
    async Register(req, res) {
        try {
            const { name, email, password } = req.body;

            // Input validation
            if (!name || !email || !password) {
                return res.status(400).json({ error: "All fields are required" });
            }

            // Email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ error: "Invalid email format" });
            }

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: "Email already in use" });
            }

            // Hash the password before storing
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create new user
            const newUser = new User({
                name,
                email,
                password: hashedPassword
            });

            // Save user to database
            await newUser.save();

            const tokenPayload = {
                userId: newUser._id,
                email: newUser.email
            };
            
            const token = jwt.sign(
                tokenPayload,
                process.env.JSON_WEB_SIGN,
                { expiresIn: '24h' }
            );

            // Send response
            res.json({
                message: "Registration successful",
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email
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
