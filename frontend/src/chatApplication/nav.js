import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API requests
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import MessageIcon from "@mui/icons-material/Message";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useAuth } from "../routes/AuthContex";
const Navbar = () => {
  const navigate = useNavigate();
  const auth=useAuth();
  const [selected, setSelected] = useState(() => localStorage.getItem("selectedIcon") || "");
  const [user, setUser] = useState({ name: "", avatar: "" });

  // Fetch user data from backend
  useEffect(() => {
    console.log("use effect in nav",auth?.user?.id)
    const fetchUserData = async () => {
      try {
        console.log("fetch user data in nav");
        const response = await axios.get(`http://localhost:5000/get-form/${auth?.user?.id}`); // Replace with your actual API endpoint
        setUser({
          name: response?.data?.data?.name, // Extract name
          avatar: response?.data?.data?.image, // Extract Base64 image
        });
        console.log("use effect user:",user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedIcon", selected);
  }, [selected]);

  const handleIconClick = (icon, path) => {
    setSelected(icon);
    navigate(path);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#ff5722" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Brand Name */}
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          EternalBond
        </Typography>

        {/* Center Icons */}
        <Box sx={{ display: "flex", gap: 2.5 }}>
          {[
            { icon: <HomeIcon />, name: "home", path: "/Home" },
            { icon: <GroupIcon />, name: "group", path: "/Matches" },
            { icon: <MessageIcon />, name: "chat", path: "/chat" },
            { icon: <SearchIcon />, name: "search", path: "/Search" },
            { icon: <FavoriteBorderIcon />, name: "favorite", path: "/Favorites" },
            { icon: <NotificationsIcon />, name: "notifications", path: "/Notification" },
          ].map(({ icon, name, path }) => (
            <IconButton
              key={name}
              onClick={() => handleIconClick(name, path)}
              sx={{
                border: selected === name ? "2px solid black" : "none",
                borderRadius: "50%",
                backgroundColor: selected === name ? "rgba(0, 0, 0, 0.1)" : "transparent",
                width: "45px",
                height: "45px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {React.cloneElement(icon, { sx: { color: "#fff", fontSize: "24px" } })}
            </IconButton>
          ))}
        </Box>

        {/* Avatar Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body1" sx={{ color: "#fff", fontWeight: "bold" }}>
            {user.name || "Loading..."}
          </Typography>
          <Avatar
            src={user.avatar} // Base64 image from API response
            sx={{
              bgcolor: user.avatar ? "transparent" : "#ffcc80",
              cursor: "pointer",
              border: selected === "avatar" ? "2px solid black" : "none",
            }}
            onClick={() => handleIconClick("avatar", "/MyProfile")}
          >
            {!user.avatar ? user.name : null}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;