const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const BaseColors = require('../models/baseColors');
const Workspace = require('../models/workspace');
const WorkspaceMember = require('../models/workspaceMember');

const updateUser = async (req, res) => {
	try {
		const { id } = req;
		const {
			username,
			password,
			first_name,
			last_name,
			phone,
			email
		} = req.body;

		let hash = undefined;
		if (password) {
			if (password.length < 8 || password.length > 254) {
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
			const salt = bcrypt.genSaltSync(8);
			hash = bcrypt.hashSync(password, salt);
		}

		const user = await User.findOne({
			where: {
				id: { [Op.ne]: id },
				username,
			}
		})

		if (user) {
			return res.status(400).json({
				status: 'error',
				errors: [{ message: 'Имя пользователя уже занято' }]
			})
		}

		const userUpdate = await User.findOne({
			where: { id }
		})

		userUpdate.update({
			username,
			password: hash,
			first_name,
			last_name,
			phone,
			email
		});

	} catch (err) {
		console.log(err)
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
};

const getUserData = async (req, res) => {
	try {
		const { id } = req;

		const user = await User.findOne({
			where: { id },
			include: [{
				model: Workspace,
				through: WorkspaceMember,
				as: 'workspaces',
			}, {
				model: BaseColors
			},
			],
			attributes: { exclude: ['password', 'role'] }
		});

		const { baseColor, lastWorkspace, workspaces } = user;

		return res.status(200).json({
			status: 'success',
			data: {
				user: {
					id: user.id,
					username: user.username,
					first_name: user.first_name,
					last_name: user.last_name,
					phone: user.phone,
					email: user.email,
					avatar: user.avatar
				},
				baseColors: baseColor,
				workspace: lastWorkspace,
				workspaces,
			}
		});
	} catch (err) {
		if (err.name === 'SequelizeValidationError') {
			const errors = err.errors.map((e) => ({ field: e.path, message: e.message }));
			return res.status(400).json({
				status: 'error',
				errors
			});
		}

		res.status(500).json({
			status: 'error',
			message: 'Ошибка сервера'
		});
	}
};

const getWorkspaceByUser = async (req, res) => {
	try {
		const { id } = req;
		const { lastWorkspace } = req.body;

		const user = await User.findOne({
			where: { id }
		})

		user.update({ lastWorkspace });

		return res.status(200).json({
			status: 'success',
		});
	} catch (err) {
		return res.status(500);
	}
};

module.exports = {
	updateUser,
	getUserData,
	getWorkspaceByUser
};