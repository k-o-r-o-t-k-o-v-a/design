const Tag = require('../models/tag');

const createTag = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, color, workspace_id } = req.body;

		await Tag.create({
			name,
			color,
			workspace_id,
		});

		return res.status(200).json({
			status: 'success',
		});
	} catch (err) {
		console.log(`Error ${err}`)
		return res.status(500);
	}
};

module.exports = {
	createTag
};