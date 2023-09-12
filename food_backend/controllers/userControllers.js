const colors = require("colors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Import your user model from '../models/userModel'
const { userModel } = require("../models/userModel");

// User registration controller
const userRegisterController = async (req, res) => {
  const { name, phone, email, password } = req.body;
  try {
    // Check if the user already exists
    const isUserExist = await userModel.findOne({ email });

    if (isUserExist) {
      // User already exists, return a 409 Conflict status code
      return res.status(409).json({ error: "User Already Exists" });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record
    const newUser = new userModel({
      name,
      phone,
      email,
      password: hashedPassword,
    });

    // Save the user in the database
    await newUser.save();

    // Return a 201 Created status code on successful registration
    res.status(201).json({
      status: true,
      responsCode: 201,
      message: "User Registered Successfully",
      data: newUser,
    });
  } catch (error) {
    console.error(colors.red(`Error in user registration: ${error.message}`));
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// User login controller
const userLoginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      // User not found, return a 404 Not Found status code
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // Passwords do not match, return a 401 Unauthorized status code
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Return a 200 OK status code along with the token on successful login
    res.status(200).json({
      status: true,
      responsCode: 200,
      message: "User Logged In Successfully",
      data: user,
      token: token,
    });
  } catch (error) {
    console.error(colors.red(`Error in user login: ${error.message}`));
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  userRegisterController,
  userLoginController,
};
