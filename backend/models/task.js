const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Column = require('./column');
const User = require('./user');

class Task extends Sequelize.Model { }

Task.init({
	name: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	status: {
		type: DataTypes.ENUM('started', 'process ', 'сompleted'),
		allowNull: false,
		default: 'started'
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	date_start: {
		type: DataTypes.DATE,
		allowNull: true,
	},
	time_start: {
		type: DataTypes.TIME,
		allowNull: true,
	},
	date_end: {
		type: DataTypes.DATE,
		allowNull: true,
	},
	time_end: {
		type: DataTypes.TIME,
		allowNull: true,
	},
	position: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
}, {
	sequelize,
	modelName: 'task',
	defaultScope: {
		attributes: { exclude: ['createdAt', 'updatedAt'] }
	}
});

Task.belongsTo(Column, {
	foreignKey: {
		name: 'column_id',
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	onDelete: 'CASCADE'
});

Column.hasMany(Task, {
	foreignKey: {
		name: 'column_id',
	}
});

Task.belongsTo(User, {
	foreignKey: {
		name: 'user_id',
		type: DataTypes.INTEGER,
		allowNull: false,
	}
});

User.hasMany(Task, {
	foreignKey: {
		name: 'user_id',
	}
});

module.exports = Task;