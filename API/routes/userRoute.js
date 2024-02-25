const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const isAuthenticated = require('../middleware/auth')
require('dotenv').config();

const route = express.Router()

const userModel = require('../models/userModel')

route.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.json({
                message: "Please enter all the details"
            })
        }

        const userExist = await userModel.findOne({ email: req.body.email })

        if (userExist) {
            return res.json({
                message: "User already exist with the given email"
            })
        }

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        const user = new userModel({ name, email, password: hashPassword });
        await user.save()
        const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE
        })
        return res.cookie({ 'token': token }).json({ success: true, message: 'User registered successfully', data: user })
    } catch (error) {
        res.status(500).json({ message: 'Error occurred', error: error });
    }
})

route.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.json({
                message: 'Please enter all the credentials'
            })
        }

        const userExist = await userModel.findOne({ email: req.body.email })

        if (!userExist) {
            return res.status(404).json({
                message: 'Wrong credentials pass'
            });
        }

        const isMatch = await bcrypt.compare(password, userExist.password);

        if (!isMatch) {
            return res.status(404).json({
                message: 'Wrong credentials pass'
            });
        }

        const token = await jwt.sign({ id: userExist._id }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE
        });

        res.json({ token: token, success: true, message: 'User login successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error occurred', error: error });
    }
});

route.get('/user', isAuthenticated, async (req, res) => {
    try {
        const user = await userModel.find();
        if (!user) {
            return res.json({
                message: 'No user found'
            })
        }
        return res.json({ user: user })
    } catch (error) {
        res.status(500).json({ message: 'Error occurred', error: error });
    }
});

module.exports = route;