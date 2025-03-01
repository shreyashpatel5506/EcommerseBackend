import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

// Send Message
router.post("/send-message", async (req, res) => {
  try {
    const { email, message } = req.body;

    if (!email || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const newMessage = new Message({ email, message });
    await newMessage.save();

    res
      .status(201)
      .json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error sending message" });
  }
});

export default router;
