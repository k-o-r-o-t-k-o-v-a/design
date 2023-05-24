const { Router } = require('express');

const { authUserMiddleware } = require('../middlewares/auth');

const User = require('../models/user');
const BaseColors = require('../models/baseColors');
const Workspace = require('../models/workspace');
const WorkspaceMember = require('../models/workspaceMember');

const router = Router();

router.get('/data', authUserMiddleware, async (req, res) => {
    try {
        const { id } = req;

        const user = await User.findOne({
            where: { id },
            include: [{
                model: Workspace,
                through: WorkspaceMember,
                as: 'workspaces'
            }, {
                model: BaseColors,
            },
            ],
            attributes: ['id', 'username', 'theme', 'lastWorkspace']
        });

        const { baseColor, lastWorkspace, workspaces } = user;

        return res.status(200).json({
            status: 'success',
            data: {
                baseColors: baseColor,
                workspace: lastWorkspace,
                workspaces,
            }
        });
    } catch (err) {
        return res.status(500);
    }
});

module.exports = router;
