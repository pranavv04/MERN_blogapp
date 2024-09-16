const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { jwtAuthMiddleware, generateToken } = require('../jwt');

// Signup Route
router.post('/signup', async(req, res) => {
  try {
 // Check if all required fields are present
    const data = req.body
    const newUser =  User(data);
    const response = await newUser.save();
    console.log('New user added');

    const payload = {
      id: response.id,
      username: response.username,
    };
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token is " , token)
    res.status(200).json({response : response, token:token});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Login Route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(404).json({ error: 'Invalid username or password' });
    }

    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = generateToken(payload);
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Profile Route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log('User data', userData);

    const userId = userData.id;
    const user = await User.findById(userId);

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fetch All Users Route
router.get('/', async (req, res) => {
  try {
    const data = await User.find();
    console.log('User data fetched');
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fetch User by Username
router.get('/:name', async (req, res) => {
  try {
    const userName = req.params.name;
    if (userName) {
      const response = await User.find({ username: userName });  // Adjusted field to `username`
      if (response.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      console.log('User data fetched');
      res.status(200).json(response);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update User by ID
router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = req.body;
    const response = await User.findByIdAndUpdate(userId, updatedUser, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return res.status(404).json({ error: 'Failed to update user data' });
    }
    console.log('User data updated');
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete User by ID
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await User.findByIdAndDelete(userId);

    if (!response) {
      return res.status(404).json({ error: 'Failed to delete user data' });
    }
    console.log('User data deleted');
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
