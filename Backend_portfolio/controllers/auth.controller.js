const jwt  = require('jsonwebtoken');
const User = require('../models/user.model');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (await User.findOne({ email })) {
    return res.status(422).json({ message: 'Email in use' });
  }
  const user = new User({ name, email, password });
  await user.save();
  res.status(201).json({ message: 'User created' });
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );
  res.json({ token, role: user.role, name: user.name });
};
