const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const User = require('./user');
const Workspace = require('./workspace');

class WorkspaceMember extends Sequelize.Model { }

WorkspaceMember.init({
	role: {
		type: DataTypes.ENUM('admin', 'user', 'invited'),
		allowNull: false,
		defaultValue: 'invited',
	}
}, {
	sequelize,
	modelName: 'workspaceMember',
	defaultScope: {
		attributes: { exclude: ['createdAt', 'updatedAt'] }
	}
});

User.belongsToMany(Workspace, {
	through: WorkspaceMember,
	foreignKey: 'userId'
});

Workspace.belongsToMany(User, {
	through: WorkspaceMember,
	foreignKey: 'workspaceId'
});

module.exports = WorkspaceMember;