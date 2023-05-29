const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Task = require('./task');
const User = require('./user');

class Comment extends Sequelize.Model { }

Comment.init({
	text: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
}, {
	sequelize,
	modelName: 'comment',
	defaultScope: {
		attributes: { exclude: ['createdAt'] }
	}
})

Comment.belongsTo(Task, {
	foreignKey: {
		name: 'task_id',
		type: DataTypes.INTEGER,
		allowNull: false,
	}
});

Task.hasMany(Comment, {
	foreignKey: {
		name: 'task_id',
	}
});

Comment.belongsTo(User, {
	foreignKey: {
		name: 'user_id',
		type: DataTypes.INTEGER,
		allowNull: false,
	}
});

User.hasMany(Comment, {
	foreignKey: {
		name: 'user_id',
	}
});

module.exports = Comment;
