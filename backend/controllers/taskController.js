const Task = require('../models/task');
const Column = require('../models/column');

const createTask = async (req, res) => {
	try {
		const { id } = req;
		const {
			name,
			status,
			tag,
			member,
			date_start,
			time_start,
			date_end,
			time_end,
			columnId,
		} = req.body;

		console.log(11111)

		const column = await Column.findOne({
			where: { id: columnId },
			include: {
				model: Task
			}
		});

		console.log(2)

		const task = await Task.create({
			name,
			position: column.tasks.length + 1,
			column_id: column.id,
			tag_id: tag,
			user_id: member,
			status,
			date_start: new Date(date_start),
			time_start: new Date(time_start),
			date_end: new Date(date_end),
			time_end: new Date(time_end),
		});

		console.log(3)

		return res.status(201).json({
			status: 'success',
			// data: task
		});
	} catch (err) {
		console.log(`Error1`, err)
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

const updateTaskPosition = async (req, res) => {
	try {
		const { id } = req;
		const { updateTasks } = req.body;

		console.log('updateTasks', updateTasks)

		updateTasks.forEach(({ columnId, tasks }) => {
			tasks.forEach(async (newTask, index) => {
				console.log(columnId, newTask, index)
				const lastTask = await Task.findOne({
					where: { id: newTask.id }
				})
				await lastTask.update({
					position: index,
					column_id: columnId
				})
			});
		})

		return res.status(200);
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
	createTask,
	updateTaskPosition,
};