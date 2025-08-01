const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!(name && email && password)) return res.status(400).json({ error: 'Missing fields' });

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ error: 'Email already in use' });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ name, email, passwordHash });
  await user.save();

  res.status(201).json({ message: 'Registration successful' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ userId: user._id, email }, process.env.JWT_SECRET, { expiresIn: '3d' });
  res.json({ token, user: { name: user.name, email: user.email } });
};
