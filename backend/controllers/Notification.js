const express = require("express");
const mongoose = require("mongoose"); // Import mongoose
const Notf = require("../Model/NotificationSchema");

const router = express.Router();

class Notification {
    async createNotification(req, res)  {
        try {
          const { senderId, receiverId,senderName } = req.body;
      
          if (!senderId || !receiverId) {
            return res.status(400).json({ error: "Sender and receiver are required" });
          }
      
          const newNotification = new Notf({
            sender: senderId,
            receiver: receiverId,
            senderName:senderName,
            message: "Sent you an interest!",
          });
      
          await newNotification.save();
          res.status(201).json({ message: "Interest sent successfully!" });
        } catch (error) {
          res.status(500).json({ error: "Failed to send interest" });
        }
      }

      async AcceptNotification (req, res) {
        try {
          const { notificationId } = req.params;
          await Notf.findByIdAndUpdate(notificationId, { isRead: true });
          res.json({ message: "Notification marked as read" });
        } catch (error) {
          console.error("Error updating notification:", error);
          res.status(500).json({ error: "Failed to update notification" });
        }
      }

      async UserNotifications(req, res)  {
        try {
          const notifications = await Notf.find({ receiver: req.params.userId }).populate("sender", "name");
          res.json(notifications);
        } catch (error) {
          console.error("Error fetching notifications:", error);
          res.status(500).json({ error: "Failed to fetch notifications" });
        }
      }

      async DeleteNotification (req, res)  {
        try {
          const { notificationId } = req.params;
          await Notf.findByIdAndDelete(notificationId);
          res.json({ message: "Notification deleted successfully" });
        } catch (error) {
          console.error("Error deleting notification:", error);
          res.status(500).json({ error: "Failed to delete notification" });
        }
      }
}

module.exports = new Notification();