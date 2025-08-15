const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

// Middleware to check if user is authenticated
const checkAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.redirect('/user/login');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.userId);
        
        if (!user) {
            res.clearCookie('token');
            return res.redirect('/user/login');
        }

        req.user = user;
        next();
    } catch (error) {
        res.clearCookie('token');
        return res.redirect('/user/login');
    }
};

router.get('/home', checkAuth, (req, res) => {
    res.render('home', { user: req.user });
});

router.get('/', (req, res) => {
    res.redirect('/user/login');
});

module.exports = router;