const { Router } = require('express');

const { authUserMiddleware } = require('../middlewares/auth');

const taskController = require('../controllers/taskController');

const router = Router();

router.post('/', authUserMiddleware, taskController.createTask);
router.patch('/position', authUserMiddleware, taskController.updateTaskPosition)

module.exports = router;