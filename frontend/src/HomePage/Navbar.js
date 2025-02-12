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
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import MessageIcon from "@mui/icons-material/Message";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Navbar = () => {
  const navigate = useNavigate();

  // Load selected icon from localStorage or default to "home"
  const [selected, setSelected] = useState(() => localStorage.getItem("selectedIcon") || "home");

  useEffect(() => {
    localStorage.setItem("selectedIcon", selected); // Save selection
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
            { icon: <MessageIcon />, name: "message", path: "/messages" },
            { icon: <SearchIcon />, name: "search", path: "/Search" },
            { icon: <FavoriteBorderIcon />, name: "favorite", path: "/Favorites" },
            { icon: <NotificationsIcon />, name: "notifications", path: "/Notification" },
          ].map(({ icon, name, path }) => (
            <IconButton
              key={name}
              onClick={() => handleIconClick(name, path)}
              sx={{
                border: selected === name ? "2px solid black" : "none",
                borderRadius: "50%",  // Makes the icons circular
                backgroundColor: selected === name ? "rgba(0, 0, 0, 0.1)" : "transparent",
                width: "45px",  // Adjust size to maintain a circle
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
        <Box sx={{ display: "flex", gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: "#ffcc80",
              cursor: "pointer",
              border: selected === "avatar" ? "2px solid black" : "none",
            }}
            onClick={() => handleIconClick("avatar", "/MyProfile")}
          >
            G
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
