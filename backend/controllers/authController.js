const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

const User = require('../models/user');

dotenv.config();

const { JWT_SECRET } = process.env;

const register = async (req, res) => {
	try {
		const {
			username,
			password,
			first_name,
			last_name,
			phone,
			email
		} = req.body;

		if (!password) {
			return res.status(400).json({
				status: 'error',
				errors: [{ message: 'Укажите пароль' }]
			})
		} else if (password.length < 8 || password.length > 254) {
			return res.status(400).json({
				status: 'error',
				errors: [{ message: 'Пароль должен содержать от 8 до 254 символов' }]
			})
		} else if (!/^[a-zA-Z0-9_!@#$%^&]*$/.test(password)) {
			return res.status(400).json({
				status: 'error',
				errors: [{ message: 'Пароль может содержать латинские буквы, цифры и специальные символы' }]
			})
		}

		const user = await User.findOne({
			where: { username: username }
		})

		if (user) {
			return res.status(400).json({
				status: 'error',
				errors: [{ message: 'Имя пользователя уже занято' }]
			})
		}

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
		if (err.name === 'SequelizeValidationError') {
			const errors = err.errors.map((e) => ({ field: e.path, message: e.message }));
			return res.status(400).json({
				status: 'error',
				errors
			});
		}

		return res.status(500).json({
			status: 'error',
			message: 'Ошибка сервера'
		});
	}
};

const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ where: { username } });

		if (!user) {
			return res.status(401).json({
				status: 'error',
				errors: [{ message: 'Неверные данные авторизации' }]
			});
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (!isPasswordCorrect) {
			return res.status(401).json({
				status: 'error',
				errors: [{ message: 'Неверные данные авторизации' }]
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
		return res.status(500).json({
			status: 'error',
			message: 'Ошибка сервера'
		});
	}
}

module.exports = {
	register,
	login
};