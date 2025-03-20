import React, { useState } from "react";
import { List, ListItem, ListItemIcon, ListItemText, Box, Typography, Container } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import HelpIcon from "@mui/icons-material/Help";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LockIcon from "@mui/icons-material/Lock";
import Navbar from "./Navbar";
import DeleteAccount from "./DeleteAccount";
import ChangePassword from "./ChangePassword";
import Help from "./Help";
import Logout from "./Logout";

const Settings = () => {
  const [selected, setSelected] = useState("changePassword");

  const renderContent = () => {
    switch (selected) {
      case "deleteAccount":
        return <DeleteAccount />;
      case "help":
        return <Help />;
      case "logout":
        return <Logout />;
      case "changePassword":
        return <ChangePassword />;
      default:
        return <Typography variant="h5">Select an option from the sidebar</Typography>;
    }
  };

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ display: "flex", flexDirection: "row", mt: "0px",minHeight:"90vh" }}>
        
        {/* Sidebar (30%) */}
        <Box sx={{ flex: 2, bgcolor: "#ffffff", borderRight: "1px solid #ddd", p: 2 }}>
          <Typography fontSize={23} marginLeft={3} marginBottom={2}>Settings</Typography>
          <List>
            {[
              { key: "changePassword", icon: <LockIcon />, label: "Change Password" },
              { key: "deleteAccount", icon: <DeleteIcon />, label: "Delete Account" },
              { key: "help", icon: <HelpIcon />, label: "Help" },
              { key: "logout", icon: <ExitToAppIcon />, label: "Logout" },
            ].map(({ key, icon, label }) => (
              <ListItem
                key={key}
                button
                onClick={() => setSelected(key)}
                sx={{
                  cursor: "pointer",
                  bgcolor: selected === key ? "#d1e0ff" : "transparent",
                  borderRadius: "5px",
                  margin: "5px 10px",
                }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Main Content (70%) */}
        <Box sx={{ flex: 8, p: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Container>
            {renderContent()}
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;
