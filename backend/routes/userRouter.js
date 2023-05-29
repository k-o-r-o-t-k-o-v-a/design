const { Router } = require('express');

const { authUserMiddleware } = require('../middlewares/auth');

const userController = require('../controllers/userController');

const router = Router();

router.patch('/', authUserMiddleware, userController.updateUser);
router.get('/data', authUserMiddleware, userController.getUserData);
router.patch('/lastWorkspace', authUserMiddleware, userController.getWorkspaceByUser);

module.exports = router;