const { Router } = require('express');

const { authUserMiddleware } = require('../middlewares/auth');

const baseColorsController = require('../controllers/baseColorsController');

const router = Router();

router.get('/:id', baseColorsController.getBaseColorsById)
router.post('/', authUserMiddleware, baseColorsController.createBaseColors);
router.get('/', authUserMiddleware, baseColorsController.getBaseColorsByUser);
router.delete('/:theme_id', authUserMiddleware, baseColorsController.deleteBaseColors)
router.patch('/:theme_id', authUserMiddleware, baseColorsController.installBaseColors)

module.exports = router;