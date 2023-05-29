const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Workspace = require('./workspace');
const Task = require('./task');

class Tag extends Sequelize.Model { }

Tag.init({
	name: {
		type: DataTypes.STRING(20),
		allowNull: false,
	},
	color: {
		type: DataTypes.STRING(7),
		allowNull: false,
	}
}, {
	sequelize,
	modelName: 'tag',
	defaultScope: {
		attributes: { exclude: ['createdAt'] }
	}
})

Tag.belongsTo(Workspace, {
	foreignKey: {
		name: 'workspace_id',
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	onDelete: 'CASCADE'
});

Workspace.hasMany(Tag, {
	foreignKey: {
		name: 'workspace_id',
	}
});

Task.belongsTo(Tag, {
	foreignKey: {
		name: 'tag_id',
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	onDelete: 'CASCADE'
});

Tag.hasMany(Task, {
	foreignKey: {
		name: 'tag_id',
	}
});

module.exports = Tag;