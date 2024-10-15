const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger'); // Import the logger

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the user's password
    const user = await User.create({ username, password: hashedPassword }); // Create a new user in the database

    // Log information about the new user registration
    logger.info(`New user registered: ${username}`, {
      userId: user.id,
      username,
      action: 'register',
    });

    res.status(201).json({ message: 'User created' });
  } catch (error) {
    // Log the error and pass it to the next middleware
    logger.error('Error in register', {
      error: error.message,
      action: 'register',
    });

    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      // Log a warning if the user does not exist
      logger.warn(`Login attempt with non-existent user: ${username}`, {
        username,
        action: 'login',
      });
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      // Log a warning if the password is incorrect
      logger.warn(`Incorrect password for user: ${username}`, {
        userId: user.id,
        username,
        action: 'login',
      });
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Log information about the successful login
    logger.info(`User ${username} logged in successfully`, {
      userId: user.id,
      username,
      action: 'login',
    });

    res.json({ token });
  } catch (error) {
    // Log the error and pass it to the next middleware
    logger.error('Error in login', {
      error: error.message,
      action: 'login',
    });

    next(error);
  }
};
