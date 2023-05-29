const Schedule = require('../models/schedule');

const createSchedule = async (req, res) => {
	try {
		const { id } = req;
		const {
			date,
			time_start,
			time_end,
			workspace_id,
		} = req.body;

		const schedule = await Schedule.create({
			date: new Date(time_start),
			time_start: new Date(time_start),
			time_end: new Date(time_end),
			user_id: id,
			workspace_id: workspace_id,
		});

		return res.status(200).json({
			status: 'success'
		});
	} catch (err) {
		console.log(`Error: ${err}`)
		return res.status(500);
	}
};

const updateSchedule = async (req, res) => {
	try {
		const { id } = req;
		const {
			schedule_id,
			workspace_id,
		} = req.body;

		const schedule = await Schedule.findOne({
			where: {
				id: schedule_id,
				workspace_id: workspace_id,
				status: 'active',
			}
		});

		await schedule.update({
			status: 'disable',
		});

		return res.status(200).json({
			status: 'success'
		});
	} catch (err) {
		console.log(`Error: ${err}`)
		return res.status(500);
	}
};

module.exports = {
	createSchedule,
	updateSchedule
};