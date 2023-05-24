const express = require('express');

const { authUserMiddleware } = require('../middlewares/auth');

const Workspace = require('../models/workspace');
const Board = require('../models/board');

const router = express.Router();

router.post('/', authUserMiddleware, async (req, res) => {
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
});

module.exports = router;
