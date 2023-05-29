const Workspace = require('../models/workspace');
const Board = require('../models/board');
const Column = require('../models/column');
const Task = require('../models/task');
const User = require('../models/user');
const Tag = require('../models/tag');

const createBoard = async (req, res) => {
	try {
		const { id } = req;
		const { name, workspaceId } = req.body;

		const workspace = await Workspace.findOne({
			where: { id: workspaceId }
		});

		const board = await Board.create({ name, workspace_id: workspace.id, });

		return res.status(201).json({
			status: 'success',
			data: board
		});
	} catch (err) {
		console.log(err)
		if (err.name === 'SequelizeValidationError') {
			const errors = err.errors.map((e) => ({ field: e.path, message: e.message }));
			return res.status(400).json({
				status: 'error',
				errors
			});
		}
		return res.status(500).json({ status: 'error' });
	}
};

const getBoardById = async (req, res) => {
	try {
		const { id } = req;
		const { board_id } = req.params;

		const board = await Board.findOne({
			where: { id: board_id },
			include: [
				{
					model: Column,
					include: {
						model: Task,
						include: [
							{
								model: User,
							},
							{
								model: Tag,
							},
						]
					}
				},
			],
			order: [
				[Column, 'position', 'ASC'],
				[Column, Task, 'position', 'ASC']
			]
		});

		return res.status(200).json({
			status: 'success',
			data: {
				board: { id: board.id, name: board.name },
				boardData: board.columns
			}
		});
	} catch (err) {
		console.log(err)
		if (err.name === 'SequelizeValidationError') {
			const errors = err.errors.map((e) => ({ field: e.path, message: e.message }));
			return res.status(400).json({
				status: 'error',
				errors
			});
		}
		return res.status(500).json({ status: 'error' });
	}
}

module.exports = {
	createBoard,
	getBoardById
};