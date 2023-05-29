const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user');

const { JWT_SECRET } = process.env;

const authUserMiddleware = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({
			status: 'error',
			message: 'Неверные данные авторизации1',
		});
	}

	const [bearer, token] = authHeader.split(' ');

	if (bearer !== 'Bearer') {
		return res.status(401).json({
			status: 'error',
			message: 'Неверные данные авторизации2',
		});
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		req.id = decoded.id;
		next();
	} catch (err) {
		return res.status(401).json({
			status: 'error',
			message: 'Неверные данные авторизации3',
		});
	}
};

const authAdminMiddleware = (req, res, next) => {
	authUserMiddleware(req, res, async () => {
		try {
			const { id } = req;
			const user = await User.findOne({ where: { id } });

			if (!user) {
				return res.status(500).json({
					status: 'error',
					message: 'Неверные данные авторизации',
				});
			}

			if (user.role !== 'admin') {
				return res.status(403).json({
					status: 'error',
					message: 'Неверные данные авторизации',
				});
			}

			next();
		} catch (e) {
			return res.status(500).json({
				status: 'error',
				message: 'Неверные данные авторизации',
			});
		}
	});
};

module.exports = {
	authUserMiddleware,
	authAdminMiddleware,
};
