const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const User = require('./user');

class Notification extends Sequelize.Model { }

Notification.init({
	send: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
	},
	text: {
		type: DataTypes.STRING,
		allowNull: false,
	},
}, {
	sequelize,
	modelName: 'notification',
	defaultScope: {
		attributes: { exclude: ['createdAt'] }
	}
})

Notification.belongsTo(User, {
	foreignKey: {
		name: 'user_id',
		type: DataTypes.INTEGER,
		allowNull: false,
	}
});

User.hasMany(Notification, {
	foreignKey: {
		name: 'user_id',
	}
});

module.exports = Notification;