const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const sequelize = require('./utils/database');
const createDefaultBaseColor = require('./utils/createBaseColors');

const userRouter = require('./routes/userRouter');
const baseColorsRouter = require('./routes/baseColorsRouter');
const authRouter = require('./routes/authRouter');
const workspacesRouter = require('./routes/workspaceRouter');
const boardsRouter = require('./routes/boardRouter');
const columnsRouter = require('./routes/columnRouter');
const tasksRouter = require('./routes/taskRouter');
const notificationsRouter = require('./routes/notificationRouter');
const tagsRouter = require('./routes/tagRouter');
const schedulesRouter = require('./routes/scheduleRouter');

const router = require('./routes');

dotenv.config();

const PORT = process.env.PORT;

const app = express();

const corsOptions = {
	origin: [
		"http://localhost",
		"http://localhost:80",
		// "http://localhost:8000",
		"http://localhost:3000",
		"http://localhost:6006"
	],
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const options = {
// 	definition: {
// 		openapi: "3.0.0",
// 		info: {
// 			title: "Turbo 2.0 Express API with Swagger",
// 			version: "0.0.1",
// 		},
// 		servers: [
// 			{
// 				url: `http://${HOSTNAME}:${PORT}`
// 			},
// 		],
// 	},
// 	apis: ["./routes/*.js"],
// };

// const specs = swaggerJsdoc(options);

// app.use(
// 	"/api-docs",
// 	swaggerUi.serve,
// 	swaggerUi.setup(specs, { explorer: true })
// );

router(app);

// app.use('/user', userRouter);
// app.use('/base-colors', baseColorsRouter);
// // app.use('/auth', authRouter);
// app.use('/workspaces', workspacesRouter);
// app.use('/boards', boardsRouter);
// app.use('/columns', columnsRouter);
// app.use('/tasks', tasksRouter);
// app.use('/notifications', notificationsRouter);
// app.use('/tags', tagsRouter)
// app.use('/schedules', schedulesRouter)

const start = async () => {
	try {
		await sequelize.sync();
		await createDefaultBaseColor();
		app.listen(PORT, () => {
			console.log(`Server is running at ${PORT}`);
		});
	} catch (e) {
		console.log(e);
	}
}

start();
