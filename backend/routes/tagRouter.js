const { Router } = require('express');

const { authUserMiddleware } = require('../middlewares/auth');

const tagController = require('../controllers/tagController');

const router = Router();

router.post('/', authUserMiddleware, tagController.createTag);

module.exports = router;