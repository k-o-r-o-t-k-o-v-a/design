const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const User = require('./user');
const BaseColors = require('./baseColors');

class ThemeUser extends Sequelize.Model { }

ThemeUser.init({
	role: {
		type: DataTypes.ENUM('admin', 'user', 'invited'),
		allowNull: false,
		defaultValue: 'invited',
	}
}, {
	sequelize,
	modelName: 'themeUser',
	defaultScope: {
		attributes: { exclude: ['createdAt', 'updatedAt'] }
	}
});

User.belongsToMany(BaseColors, {
	through: ThemeUser,
	foreignKey: 'userId',
	onDelete: 'CASCADE'
});

BaseColors.belongsToMany(User, {
	through: ThemeUser,
	foreignKey: 'themeId',
	onDelete: 'CASCADE'
});

module.exports = ThemeUser;