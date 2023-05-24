const express = require('express');

const { authUserMiddleware } = require('../middlewares/auth');

const User = require('../models/user');
const Workspace = require('../models/workspace');
const WorkspaceMember = require('../models/workspaceMember');
const Board = require('../models/board');

const router = express.Router();

router.post('/', authUserMiddleware, async (req, res) => {
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
        console.log(`err ${err}`)

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

// router.get('/', authUserMiddleware, async (req, res) => {
// 	try {
// 		const { id } = req;

// 		const workspaces = await Workspace.findAll({
// 			where: { owner_id: id }
// 		});

// 		return res.status(200).json({
// 			status: 'success',
// 			data: workspaces
// 		});
// 	} catch (err) {
// 		if (err.name === 'SequelizeValidationError') {
// 			const errors = err.errors.map((e) => ({ field: e.path, message: e.message }));
// 			res.status(400).json({
// 				status: 'error',
// 				errors
// 			});
// 		}
// 		return res.status(500).json({ status: 'error' });
// 	}
// })

router.get('/:workspace_id', authUserMiddleware, async (req, res) => {
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
});

router.get('/:workspace_id/boards', authUserMiddleware, async (req, res) => {
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
})


module.exports = router;
