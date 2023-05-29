const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Workspace = require('./workspace');
const User = require('./user');

class Schedule extends Sequelize.Model { }

Schedule.init({
	date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	time_start: {
		type: DataTypes.TIME,
		allowNull: false,
	},
	time_end: {
		type: DataTypes.TIME,
		allowNull: false,
	},
	status: {
		type: DataTypes.ENUM('active', 'disable'),
		defaultValue: 'active'
	},
}, {
	sequelize,
	modelName: 'schedule',
	defaultScope: {
		attributes: { exclude: ['createdAt'] }
	}
})

Schedule.belongsTo(User, {
	foreignKey: {
		name: 'user_id',
		type: DataTypes.INTEGER,
		allowNull: false,
	}
});

User.hasMany(Schedule, {
	foreignKey: {
		name: 'user_id',
	}
});

Schedule.belongsTo(Workspace, {
	foreignKey: {
		name: 'workspace_id',
		type: DataTypes.INTEGER,
		allowNull: false,
	}
});

Workspace.hasMany(Schedule, {
	foreignKey: {
		name: 'workspace_id',
	}
});

module.exports = Schedule;