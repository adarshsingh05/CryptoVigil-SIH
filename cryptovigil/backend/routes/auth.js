const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const VALIDIP = require('../models/user');
const sendVerificationEmail = require('../utils/sendEmail');
const router = express.Router();





// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
  if (!token) {
    return res.status(403).json({ msg: 'Token is required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: 'Invalid token' });
    }
    req.userId = decoded.userId; // Add userId to the request object
    next();
  });
};
// Logout
// Logout
router.post('/logout', verifyToken, (req, res) => {
  try {
    // No need to do anything specific server-side, as the token is stateless
    res.json({ msg: 'Logged out successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server error' });
  }
});
// Route to fetch user details
router.get('/user', verifyToken, async (req, res) => {
  try {
    // Find the user by userId (from the decoded token)
    const user = await User.findById(req.userId).select('-password'); // Don't return password
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Return user details
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server error' });
  }
});


// Registration
router.post('/register', async (req, res) => {
  const {username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save user to DB
    await user.save();

    // Create verification token
    const verificationToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    user.verificationToken = verificationToken;
    await user.save();

    // Send email
    sendVerificationEmail(user.email, verificationToken);

    res.status(200).json({ msg: 'Registration successful. Please verify your email.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Email verification
// Email verification
router.get('/verify/:token', async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).send('<h1>User not found</h1>');
    }

    if (user.verified) {
      return res.status(400).send('<h1>User already verified</h1>');
    }

    // Mark user as verified
    user.verified = true;
    user.verificationToken = null; // Clear the verification token
    await user.save();

    // Redirect to login page
    
    res.redirect('http://localhost:3000/Login'); // Replace `/login` with your frontend login route
  } catch (error) {
    console.log(error);
    res.status(500).send('<h1>Invalid or expired token</h1>');
  }
});

router.post('/verifyip', async (req, res) => {
  const { ip } = req.body; // Extract IP from request body
  const allIPs = await VALIDIP.find({}, { ip: 1, _id: 0 });
  console.log("Received IP:", ip);

  try {
    // Normalize input (trim spaces)
    const trimmedIP = ip.trim();

    // Find the IP in the database
    const user = await VALIDIP.findOne({ ip: trimmedIP });

    if (!user) {
      console.log("Stored IPs in Database:", allIPs);
      console.log("IP not found in database.");
      return res.status(400).json({ msg: 'Invalid IP' });
    }
   
    console.log("IP found in database:", user.ip);
    return res.status(200).json({ msg: 'Valid IP' });
    

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ msg: 'Server error' });
  }
});







// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    if (!user.verified) {
      return res.status(400).json({ msg: 'Please verify your email first' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
