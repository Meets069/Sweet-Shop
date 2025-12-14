
const User = require('../models/User');
const generateToken = require('../utils/generateTokens');


exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ username, email, password });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // --- START OF DEVELOPMENT ADMIN BYPASS ---
  const DEV_ADMIN_EMAIL = process.env.DEV_ADMIN_EMAIL;
  const DEV_ADMIN_PASSWORD = process.env.DEV_ADMIN_PASSWORD;

  // Check if credentials match the hardcoded dev admin credentials
  if (email === DEV_ADMIN_EMAIL && password === DEV_ADMIN_PASSWORD) {
    // A placeholder ID is used since we are bypassing the database lookup
    const adminId = '60c41f6a1d8c1c4f5c9e2b1d'; 
    
    // Return a valid Admin JWT token immediately
    return res.json({
      _id: adminId,
      username: 'DevAdminShortcut',
      email: DEV_ADMIN_EMAIL,
      role: 'admin', // Crucially set the role to 'admin'
      token: generateToken(adminId, 'admin'),
    });
  }
  // --- END OF DEVELOPMENT ADMIN BYPASS ---
  
  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};