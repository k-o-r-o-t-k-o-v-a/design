const { Router } = require('express');

const { authUserMiddleware } = require('../middlewares/auth');

const scheduleController = require('../controllers/scheduleController');

const router = Router();

router.post('/', authUserMiddleware, scheduleController.createSchedule);
router.patch('/', authUserMiddleware, scheduleController.updateSchedule);

module.exports = router;