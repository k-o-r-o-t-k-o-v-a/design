const authRouter = require('./authRouter');
const baseColorsRouter = require('./baseColorsRouter');
const userRouter = require('./userRouter');
const workspaceRouter = require('./workspaceRouter');
const boardRouter = require('./boardRouter');
const columnRouter = require('./columnRouter');
const taskRouter = require('./taskRouter');
const notificationRouter = require('./notificationRouter');
const tagRouter = require('./tagRouter');
const scheduleRouter = require('./scheduleRouter');

function router(app) {
	app.use('/auth', authRouter);
	app.use('/base-colors', baseColorsRouter);
	app.use('/user', userRouter);
	app.use('/workspaces', workspaceRouter);
	app.use('/boards', boardRouter);
	app.use('/columns', columnRouter);
	app.use('/tasks', taskRouter);
	app.use('/notifications', notificationRouter);
	app.use('/tags', tagRouter)
	app.use('/schedules', scheduleRouter)
}

module.exports = router;