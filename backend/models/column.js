const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Board = require('./board');

class Column extends Sequelize.Model { }

Column.init({
	name: {
		type: DataTypes.STRING(50),
		allowNull: false,
	},
	position: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
}, {
	sequelize,
	modelName: 'column',
	include: 'task',
	defaultScope: {
		attributes: { exclude: ['createdAt', 'updatedAt'] }
	}
});

Column.belongsTo(Board, {
	foreignKey: {
		name: 'board_id',
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	onDelete: 'CASCADE'
});

Board.hasMany(Column, {
	foreignKey: {
		name: 'board_id',
	}
});

module.exports = Column;