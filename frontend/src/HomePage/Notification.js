import React, { useState } from "react";
import { Card, CardContent, Typography, Stack, Box, IconButton } from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import Navbar from "./Navbar";

const initialNotifications = [
  { id: 1, senderName: "Alice", isRead: false },
  { id: 2, senderName: "Bob", isRead: false },
  { id: 3, senderName: "Charlie", isRead: false },
  { id: 4, senderName: "Alice", isRead: false },
  { id: 5, senderName: "Bob", isRead: false },
  { id: 6, senderName: "Charlie", isRead: false },
];

const NotificationCard = ({ senderName, isRead, onAccept, onReject }) => {
  return (
    <Card sx={{ width: 600, p: 2, boxShadow: 3, mb: 2, bgcolor: isRead ? "white" : "#f0f8ff" }}>
      <CardContent>
        <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            {senderName} has sent you a request.
          </Typography>
          <IconButton color="primary" onClick={onAccept}>
            <CheckCircle />
          </IconButton>
          <IconButton color="secondary" onClick={onReject}>
            <Cancel />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

const NotificationList = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleAccept = (id) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    console.log(`Accepted request from ID ${id}`);
  };

  const handleReject = (id) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    console.log(`Rejected request from ID ${id}`);
  };

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Navbar />
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", mt: 5, p: 3, boxShadow: 3, bgcolor: "white", borderRadius: 2, width: 620 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Notifications</Typography>
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            senderName={notification.senderName}
            isRead={notification.isRead}
            onAccept={() => handleAccept(notification.id)}
            onReject={() => handleReject(notification.id)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default NotificationList;