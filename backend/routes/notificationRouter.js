const { Router } = require('express');

const { authUserMiddleware } = require('../middlewares/auth');

const notificationController = require('../controllers/notificationController');

const router = Router();

router.get('/', authUserMiddleware, notificationController.getNotificationByUser)
router.post('/invitation/workspace', authUserMiddleware, notificationController.createNotification);
router.patch('/invitation/workspace/:workspace_id/accept', authUserMiddleware, notificationController.updateNotification);

module.exports = router;