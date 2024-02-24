const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET_KEY = "1234";

const authRoute = express.Router();


authRoute.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id : user._id, name : user.name }, JWT_SECRET_KEY);
        const returnUser = { ...user._doc }
        delete returnUser.password

        return res.status(200).json({ message: 'Sign-in successful', token: token, user: returnUser });
    } catch (error) {
        console.error('Error signing in:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});



authRoute.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    console.log(req.body);

    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }
    if (password.length < 4) {
        return res.status(400).json({ message: 'Password must be 4 charactor' });
    }


    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const returnValue = { ...newUser._doc }
        delete returnValue.password

        return res.status(201).json({ message: 'User created successfully', user: returnValue });
    } catch (error) {
        console.error('Error signing up:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

authRoute.post('/verify-token', (req, res) => {

    const token = req.body.token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }


    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }
        else{
            return res.status(200).json({ message: 'Token is valid', user: req.decoded });
        }
    });

});

module.exports = authRoute;