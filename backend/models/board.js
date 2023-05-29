const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Workspace = require('./workspace');

class Board extends Sequelize.Model { }

Board.init({
	name: {
		type: DataTypes.STRING(50),
		allowNull: false,
	},
}, {
	sequelize,
	modelName: 'board',
	defaultScope: {
		attributes: { exclude: ['createdAt', 'updatedAt'] }
	}
});

Board.belongsTo(Workspace, {
	foreignKey: {
		name: 'workspace_id',
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	onDelete: 'CASCADE'
});

Workspace.hasMany(Board, {
	foreignKey: {
		name: 'workspace_id',
	}
});

module.exports = Board;