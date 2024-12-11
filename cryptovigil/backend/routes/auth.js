const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const VALIDIP = require('../models/Ip');
const sendVerificationEmail = require('../utils/sendEmail');
const router = express.Router();
const crypto = require('crypto');


// Encryption setup
const algorithm = 'aes-256-cbc';
const encryptionKey = crypto.randomBytes(32); // Replace this with a secure, fixed key
const iv = crypto.randomBytes(16); // Replace this with a secure, fixed IV

// Encrypt function
const encrypt = (text) => {
  if (!text) {
    throw new Error('Text to encrypt is undefined or null');
  }
  const cipher = crypto.createCipheriv(algorithm, encryptionKey, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return {
    encryptedData: encrypted,
    iv: iv.toString('hex'),
  };
};

// Decrypt function
const decrypt = (encryptedData, iv) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    encryptionKey,
    Buffer.from(iv, 'hex')
  );
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

// Registration route
router.post('/register', async (req, res) => {
  const { username, email, password, aadhaarId } = req.body;

  if (!aadhaarId) {
    return res.status(400).json({ msg: 'Aadhaar ID is required.' });
  }

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Encrypt Aadhaar ID
    const encryptedAadhaar = encrypt(aadhaarId);

    // Create new user
    user = new User({
      username,
      email,
      password: hashedPassword,
      aadhaar: encryptedAadhaar.encryptedData,
      iv: encryptedAadhaar.iv,
    });
      // Create verification token
      const verificationToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

    // Save user to database
    await user.save();

  
    user.verificationToken = verificationToken;
    await user.save();

    // Send verification email
    sendVerificationEmail(user.email, verificationToken);

    res.status(200).json({ msg: 'Registration successful. Please verify your email.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// View Aadhaar route
router.get('/view-aadhaar/:userId', async (req, res) => {
  const { userId } = req.params;
  const { passkey } = req.query;

  if (!passkey || passkey !== process.env.SECURE_PASSKEY) {
    return res.status(403).json({ msg: 'Invalid or missing passkey' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Decrypt Aadhaar ID
    const decryptedAadhaar = decrypt(user.aadhaar, user.iv);

    res.status(200).json({ aadhaarId: decryptedAadhaar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});







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




// Email verification
// Email verification
router.get('/verify/:token', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log(token)


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
   console.log(user)


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







// Login// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.verified) {
      return res.status(403).json({ message: 'User not verified. Please verify your email.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
