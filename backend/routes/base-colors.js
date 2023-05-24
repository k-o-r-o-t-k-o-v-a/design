const { Router } = require('express');

const BaseColors = require('../models/baseColors');

const router = Router();

router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const baseColors = await BaseColors.findOne({ where: { id } });

		return res.status(200).json(baseColors);
	} catch (err) {
		return res.status(500);
	}
});

module.exports = router;