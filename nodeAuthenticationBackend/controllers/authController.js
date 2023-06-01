const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendWelcomeEmail = require('../utils/sendEmail');

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });

    await newUser.save();

    const token = jwt.sign({ email: newUser.email, id: newUser._id }, 'secret_key', { expiresIn: '1h' });
    
    await sendWelcomeEmail({
      to: email, 
      subject: 'Welcome to our club', 
      text: 'Thank you for registering. Enjoy!'
    });

    return res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ email: user.email, id: user._id }, 'secret_key', { expiresIn: '1h' });

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

function logout() {
    
    localStorage.removeItem('token');
  };

module.exports = {
  register,
  login,
  logout,
};