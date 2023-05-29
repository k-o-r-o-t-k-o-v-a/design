const express = require('express');

const { authUserMiddleware } = require('../middlewares/auth');

const workspaceController = require('../controllers/workspaceController');

const router = express.Router();

router.post('/', authUserMiddleware, workspaceController.createWorkspace);
router.delete('/:workspace_id', authUserMiddleware, workspaceController.deleteWorkspace);
router.patch('/:workspace_id', authUserMiddleware, workspaceController.updateWorkspace);
router.get('/:workspace_id', authUserMiddleware, workspaceController.getWorkspaceById);
router.get('/:workspace_id/boards', authUserMiddleware, workspaceController.getBoardsByWorkspaceId);
router.get('/:workspace_id/members', authUserMiddleware, workspaceController.getMembersByWorkspaceId);
router.delete('/:workspace_id/members/:user_id', authUserMiddleware, workspaceController.deleteMember);
router.get('/:workspace_id/tags', workspaceController.getTagsByWorkspaceId);
router.get('/:workspace_id/schedules', authUserMiddleware, workspaceController.getSchedulesByWorkspaceId);
router.get('/:workspace_id/calendar', authUserMiddleware, workspaceController.getCalendarDataByWorkspaceId);
router.get('/:workspace_id/role', authUserMiddleware, workspaceController.getWorkspaceMemberRole);

module.exports = router;
