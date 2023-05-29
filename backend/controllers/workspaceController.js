const User = require('../models/user');
const Workspace = require('../models/workspace');
const WorkspaceMember = require('../models/workspaceMember');
const Board = require('../models/board');
const Tag = require('../models/tag');
const Schedule = require('../models/schedule');
const Task = require('../models/task');

const createWorkspace = async (req, res) => {
	try {
		const { id } = req;
		const { name } = req.body;

		const workspace = await Workspace.create({ name, owner_id: id });

		const user = await User.findOne({
			where: { id }
		});

		await user.update({ lastWorkspace: workspace.id });

		await WorkspaceMember.create({
			role: 'admin',
			userId: user.id,
			workspaceId: workspace.id,
		});

		return res.status(201).json({
			status: 'success',
			data: workspace
		});
	} catch (err) {
		if (err.name === 'SequelizeValidationError') {
			const errors = err.errors.map((e) => ({ field: e.path, message: e.message }));
			return res.status(400).json({
				status: 'error',
				errors
			});
		}

		return res.status(500).json({
			status: 'error',
			message: 'Ошибка сервера'
		});
	}
};

const deleteWorkspace = async (req, res) => {
	try {
		const { id } = req;
		const { workspace_id } = req.params;

		const workspace = await Workspace.findOne({
			where: {
				id: workspace_id,
				owner_id: id,
			}
		});

		if (!workspace) {
			return res.status(400).json({
				status: 'error',
				errors: [{ message: 'Ошибка удаление рабочего пространства' }]
			});
		}

		await workspace.destroy();

		return res.status(200).json({
			status: 'success',
		});
	} catch (err) {
		if (err.name === 'SequelizeValidationError') {
			const errors = err.errors.map((e) => ({ field: e.path, message: e.message }));
			return res.status(400).json({
				status: 'error',
				errors
			});
		}

		return res.status(500).json({
			status: 'error',
			message: 'Ошибка сервера'
		});
	}
};

const updateWorkspace = async (req, res) => {
	try {
		const { id } = req;
		const { workspace_id } = req.params;
		const { name } = req.body;

		const workspace = await Workspace.findOne({
			where: { id: workspace_id }
		});

		if (!workspace) {
			return res.status(400).json({
				status: 'error',
				errors: [{ message: 'Рабочее пространство не найдено' }]
			});
		}

		await workspace.update({ name });

		return res.status(200).json({
			status: 'success',
		});
	} catch (err) {
		if (err.name === 'SequelizeValidationError') {
			const errors = err.errors.map((e) => ({ field: e.path, message: e.message }));
			return res.status(400).json({
				status: 'error',
				errors
			});
		}

		return res.status(500).json({
			status: 'error',
			message: 'Ошибка сервера'
		});
	}
};

const getWorkspaceById = async (req, res) => {
	try {
		const { id } = req;
		const { workspace_id } = req.params;

		const workspace = await Workspace.findOne({
			where: { id: workspace_id },
		});

		return res.status(200).json({
			status: 'success',
			data: workspace,
		});
	} catch (err) {
		console.log(`err`, err)
		if (err.name === 'SequelizeValidationError') {
			const errors = err.errors.map((e) => ({ field: e.path, message: e.message }));
			res.status(400).json({
				status: 'error',
				errors
			});
		}
		return res.status(500).json({ status: 'error' });
	}
};

const getBoardsByWorkspaceId = async (req, res) => {
	try {
		const { workspace_id } = req.params;

		const boards = await Board.findAll({
			where: { workspace_id }
		});

		return res.status(200).json({
			status: 'success',
			data: boards
		});
	} catch (err) {
		if (err.name === 'SequelizeValidationError') {
			const errors = err.errors.map((e) => ({ field: e.path, message: e.message }));
			res.status(400).json({
				status: 'error',
				errors
			});
		}
		return res.status(500).json({ status: 'error' });
	}
};

const getMembersByWorkspaceId = async (req, res) => {
	try {
		const { id } = req;
		const { workspace_id } = req.params;

		const workspaceMembers = await WorkspaceMember.findAll({
			where: { workspaceId: workspace_id }
		});

		const members = await Promise.all(
			workspaceMembers.map(async (item) => {
				const user = await User.findOne({ where: { id: item.dataValues.userId } });
				return {
					memberRole: item.dataValues.role,
					id: user.dataValues.id,
					username: user.dataValues.username,
					first_name: user.dataValues.first_name,
					last_name: user.dataValues.last_name,
				};
			}));

		return res.status(200).json({
			status: 'success',
			data: members
		});
	} catch (err) {
		console.log(err)
		if (err.name === 'SequelizeValidationError') {
			const errors = err.errors.map((e) => ({ field: e.path, message: e.message }));
			res.status(400).json({
				status: 'error',
				errors
			});
		}
		return res.status(500).json({ status: 'error' });
	}
};

const deleteMember = async (req, res) => {
	try {
		const { id } = req;
		const { workspace_id, user_id } = req.params;

		if (id === user_id) {
			return res.status(400).json({
				status: 'error',
				errors: [{ message: 'Нельзя удалить себя' }]
			});
		}

		const workspaceAdmin = await WorkspaceMember.findOne({
			where: {
				userId: id,
				workspaceId: workspace_id,
				role: 'admin'
			}
		});

		if (!workspaceAdmin) {
			return res.status(401).json({
				status: 'error',
				errors: [{ message: 'У вас нет прав на выполнение данного действия' }]
			});
		}

		const workspaceMembers = await WorkspaceMember.findOne({
			where: { workspaceId: workspace_id, userId: user_id }
		});

		workspaceMembers.destroy();

		return res.status(200).json({ status: 'success' });

	} catch (err) {
		if (err.name === 'SequelizeValidationError') {
			const errors = err.errors.map((e) => ({ field: e.path, message: e.message }));
			res.status(400).json({
				status: 'error',
				errors
			});
		}

		return res.status(500).json({ status: 'error' });
	}
};

const getTagsByWorkspaceId = async (req, res) => {
	try {
		const { id } = req;
		const { workspace_id } = req.params;

		const tags = await Tag.findAll({
			where: { workspace_id }
		});

		return res.status(200).json({
			status: 'success',
			data: tags,
		});
	} catch (err) {
		console.log(`Error ${err}`)
		return res.status(500);
	}
};

const getSchedulesByWorkspaceId = async (req, res) => {
	try {
		const { id } = req;
		const { workspace_id } = req.params;

		const schedules = await Schedule.findAll({
			where: { workspace_id },
			include: {
				model: User
			}
		});

		return res.status(200).json({
			status: 'success',
			data: schedules,
		});
	} catch (err) {
		console.log(`Error: ${err}`)
		return res.status(500);
	}
};

const getCalendarDataByWorkspaceId = async (req, res) => {
	try {
		const { id } = req;
		const { workspace_id } = req.params;

		const schedules = await Schedule.findAll({
			where: { workspace_id, user_id: id },
			include: {
				model: User,
				include: {
					model: Task
				}
			}
		});

		return res.status(200).json({
			status: 'success',
			data: schedules,
		});
	} catch (err) {
		return res.status(500);
	}
};

const getWorkspaceMemberRole = async (req, res) => {
	try {
		const { id } = req;
		const { workspace_id } = req.params;

		const workspaceMember = await WorkspaceMember.findOne({
			where: {
				userId: id,
				workspaceId: workspace_id,
			},
		});

		return res.status(200).json({
			status: 'success',
			data: workspaceMember.role
		});
	} catch (err) {
		console.log('Error', err);
		return res.status(500);
	}
}

module.exports = {
	createWorkspace,
	deleteWorkspace,
	updateWorkspace,
	getWorkspaceById,
	getBoardsByWorkspaceId,
	getMembersByWorkspaceId,
	deleteMember,
	getTagsByWorkspaceId,
	getSchedulesByWorkspaceId,
	getCalendarDataByWorkspaceId,
	getWorkspaceMemberRole
};
