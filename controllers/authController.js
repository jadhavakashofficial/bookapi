const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
  console.log('🟢 SIGNUP BODY:', req.body);

  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      console.log('❌ Missing fields');
      return res.status(400).json({ message: 'All fields are required' });
    }

    let user = await User.findOne({ email });
    if (user) {
      console.log('❌ User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    console.log('✅ User registered:', user._id);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('🔥 Signup Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  console.log('🟢 LOGIN BODY:', req.body);

  const { email, password } = req.body;

  try {
    if (!email || !password) {
      console.log('❌ Missing login fields');
      return res.status(400).json({ message: 'Email and password required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Incorrect password');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    console.log('✅ Login successful, Token:', token);
    res.json({ token });
  } catch (err) {
    console.error('🔥 Login Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

console.log('🔑 JWT_SECRET:', JWT_SECRET);
