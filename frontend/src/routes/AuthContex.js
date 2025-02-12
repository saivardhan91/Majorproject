import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const signup = async (data) => {
        try {
            const response = await axios.post("http://localhost:5000/register", data);
            console.log(response.data);
            if (response.status === 200) {  // Changed to 201 for resource creation

                const { user, token } = response.data;
                setUser(user);
                setToken(token);
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                return response.data;
            }
        } catch (err) {
            console.error("Error signing up:", err.response?.data?.error || err.message);
            throw err.response?.data?.error || "Signup failed";
        }
    };

    const login = async (data) => {
        try {
            const response = await axios.post("http://localhost:5000/Login", data);
            if (response.status === 200) {
                const { user, token } = response.data;
                setUser(user);
                setToken(token);
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                return response.data;
            }
        } catch (err) {
            console.error("Error logging in:", err.response?.data?.error || err.message);
            throw err.response?.data?.error || "Login failed";
        }
    };

    const logout = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };