const express = require('express');
const router = express.Router();
const User = require('../modeuls/User'); // Fix typo in "modeuls" to "models"
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "helloitisbackend";

// Route 1: Create a User (POST: /api/auth/createUser)
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
    body("username", "Enter a valid username").isLength({ min: 3 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      const { username, name, email, password } = req.body;

      const userEmail = await User.findOne({ email });
      if (userEmail) {
        return res.status(400).json({ success, error: "Email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);

      const user = await User.create({
        username,
        name,
        email,
        password: secPass,
      });

      const data = { user: { id: user.id } };
      const jwtToken = jwt.sign(data, JWT_SECRET);

      success = true;
      res.status(201).json({ success, jwtToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
);

// Route 2: Authenticate a User (POST: /api/auth/loginUser)
router.post(
  '/loginUser',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, error: 'Invalid email or password' });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ success: false, error: 'Invalid email or password' });
      }

      const data = { user: { id: user.id } };
      const jwtToken = jwt.sign(data, JWT_SECRET);

      res.json({ success: true, jwtToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }
);

// Route 3: Get Logged-in User Details (POST: /api/auth/getUser)
router.post('/getUser', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    res.json({ success: true, user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;