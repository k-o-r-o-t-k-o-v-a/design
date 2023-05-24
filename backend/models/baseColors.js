const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

class BaseColors extends Sequelize.Model { }

BaseColors.init({
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	primary: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	secondary: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	info: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	danger: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	warning: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	succsess: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	neutral: {
		type: DataTypes.STRING,
		allowNull: false,
	}
}, {
	sequelize,
	modelName: 'baseColors',
	defaultScope: {
		attributes: { exclude: ['createdAt', 'updatedAt'] }
	}
});

module.exports = BaseColors;
