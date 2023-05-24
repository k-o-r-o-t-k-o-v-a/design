const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

const User = require('../models/user');

dotenv.config();

const { JWT_SECRET } = process.env;
// console.log(JWT_SECRET);

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const {
            username,
            password,
            first_name,
            last_name,
            phone,
            email
        } = req.body;

        const salt = bcrypt.genSaltSync(8);
        const hash = bcrypt.hashSync(password, salt);

        await User.create({
            username,
            password: hash,
            first_name,
            last_name,
            phone,
            email
        });

        return res.status(201).json({ status: 'success' });
    } catch (err) {
        console.log(`err ${err}`);

        if (err.name === 'SequelizeValidationError') {
            const errors = err.errors.map((e) => ({ field: e.path, message: e.message }));
            return res.status(400).json({
                status: 'error',
                errors
            });
        }

        res.status(500).json({ status: 'error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Неверные данные авторизации',
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                status: 'error',
                message: 'Неверные данные авторизации',
            });
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET);

        return res.status(200).json({
            status: 'success',
            token,
        });
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            const errors = err.errors.map((e) => ({ field: e.path, message: e.message }));
            res.status(400).json({
                status: 'error',
                errors
            });
        }
        return res.status(500).json({ status: 'error' });
    }
});

module.exports = router;
