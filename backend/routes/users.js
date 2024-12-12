const express = require('express');
const router = express.Router();
const User = require('../models/User');

// User login 
router.post('/api/login', async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Username is required.' });
  }

  try {
    // Find or create the user
    let user = await User.findOne({ username });
    if (!user) {
      user = new User({ username });
      await user.save();
    }

    res.json({ username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

// User logout
router.post('/api/logout', (req, res) => {
  res.json({ message: 'Logged out successfully.' });
});

module.exports = router;
