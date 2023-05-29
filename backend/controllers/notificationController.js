const User = require('../models/user');
const Workspace = require('../models/workspace');
const WorkspaceMember = require('../models/workspaceMember');
const Notification = require('../models/notification');

const getNotificationByUser = async (req, res) => {
	try {
		const { id } = req;

		const notifications = await Notification.findAll({
			where: { user_id: id },
			order: [['createdAt', 'DESC']]
		})

		return res.status(200).json({
			status: 'success',
			data: notifications
		})
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

const createNotification = async (req, res) => {
	try {
		const { id } = req;
		const { workspace_id, username } = req.body;

		const invitedUser = await User.findOne({
			where: { username }
		})

		const workspace = await Workspace.findOne({
			where: { id: workspace_id },
		});

		await WorkspaceMember.create({
			workspaceId: workspace.id,
			userId: invitedUser.id,
		})

		await Notification.create({
			user_id: invitedUser.id,
			text: `Вас пригласили в рабочее пространство "${workspace.name}".[primary,Принять,/invitation/workspace/${workspace.id}/accept;secondary,Отклонить,/invitation/workspace/${workspace.id}/reject]`,
			send: false,
		});

		return res.status(201).json(
			{
				status: 'success',
				// data: task
			}
		);
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

const updateNotification = async (req, res) => {
	try {
		const { id } = req;
		const { workspace_id } = req.params;
		const { notification_id } = req.body;

		console.log(id, workspace_id, notification_id);

		const user = await User.findOne({
			where: { id }
		})

		console.log(123);

		const workspace = await Workspace.findOne({
			where: { id: workspace_id },
		});

		console.log(1234);

		const workspaceMember = await WorkspaceMember.findOne({
			where: {
				userId: user.id,
				workspaceId: workspace.id,
				role: 'invited'
			}
		})

		console.log(1235, workspaceMember);

		await workspaceMember.update({
			role: 'user'
		})

		console.log(1236);

		await Notification.destroy({
			where: { id: notification_id }
		});

		console.log(1237);

		return res.status(201).json(
			{
				status: 'success',
				// data: task
			}
		);
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

module.exports = {
	getNotificationByUser,
	createNotification,
	updateNotification
};