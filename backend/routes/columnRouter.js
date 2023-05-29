const { Router } = require('express');

const { authUserMiddleware } = require('../middlewares/auth');

const columnController = require('../controllers/columnController');

const router = Router();

router.post('/', authUserMiddleware, columnController.getColumn);
router.patch('/position', authUserMiddleware, columnController.updateColumnPosition)

module.exports = router;