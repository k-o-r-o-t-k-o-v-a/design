const BaseColors = require('../models/baseColors');
const ThemeUser = require('../models/themeUser');
const User = require('../models/user');

const getBaseColorsById = async (req, res) => {
	try {
		const { id } = req.params;

		const baseColors = await BaseColors.findOne({ where: { id } });

		return res.status(200).json(baseColors);
	} catch (err) {
		return res.status(500);
	}
};

const createBaseColors = async (req, res) => {
	try {
		const { id } = req;
		const {
			name,
			primary,
			secondary,
			info,
			danger,
			warning,
			succsess,
			neutral
		} = req.body;

		const baseColors = await BaseColors.create({
			name,
			primary,
			secondary,
			info,
			danger,
			warning,
			succsess,
			neutral
		});

		console.log(baseColors)

		await ThemeUser.create({
			userId: id,
			themeId: baseColors.id
		});

		return res.status(200).json({
			status: 'success',
			data: baseColors
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
};

const getBaseColorsByUser = async (req, res) => {
	try {
		const { id } = req;

		const themes = await BaseColors.findAll({
			include: [{
				model: User,
				where: { id: id }
			}],
			attributes: ['id', 'name']
		});

		return res.status(200).json({
			status: 'success',
			data: themes
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
};

const installBaseColors = async (req, res) => {
	try {
		const { id } = req;
		const { theme_id } = req.params;

		const user = await User.findOne({
			where: { id }
		})

		const theme = await BaseColors.findOne({
			where: { id: theme_id },
		});

		user.update({ theme: theme.id });

		return res.status(200).json({
			status: 'success',
			data: theme
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
}

const deleteBaseColors = async (req, res) => {
	try {
		const { id } = req;
		const { theme_id } = req.params;

		const theme = await BaseColors.findOne({
			where: { id: theme_id },
			include: [{
				model: User,
				where: { id: id }
			}],
			attributes: ['id', 'name']
		});

		await theme.destroy();

		return res.status(200).json({
			status: 'success',
			data: theme
		});
	} catch (err) {
		console.log('Err', err);
		if (err.name === 'SequelizeValidationError') {
			const errors = err.errors.map((e) => ({ field: e.path, message: e.message }));
			res.status(400).json({
				status: 'error',
				errors
			});
		}

		return res.status(500).json({ status: 'error' });
	}
}

module.exports = {
	getBaseColorsById,
	createBaseColors,
	getBaseColorsByUser,
	installBaseColors,
	deleteBaseColors,
};