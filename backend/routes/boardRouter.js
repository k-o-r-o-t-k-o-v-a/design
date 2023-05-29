const { Router } = require('express');

const { authUserMiddleware } = require('../middlewares/auth');

const boardController = require('./../controllers/boardController');

const router = Router();

router.post('/', authUserMiddleware, boardController.createBoard);
router.get('/:board_id', authUserMiddleware, boardController.getBoardById);

module.exports = router;