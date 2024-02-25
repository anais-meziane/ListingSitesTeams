const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return next('Please login to access the data');
        }

        const token = authHeader.split(' ')[1];
        const verify = await jwt.verify(token, process.env.SECRET_KEY);
        req.user = await userModel.findById(verify.id);
        next();
    } catch (error) {
        return next(error);
    }
};

module.exports = isAuthenticated