const User = require("../models/User");
const bcrypt = require("bcrypt");

// Signup
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
    });

   res.status(201).json({
  message: "User registered successfully",
  user: {
    _id: user._id,
    email: user.email,
  },
});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser };