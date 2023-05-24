const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const sequelize = require('./utils/database');
const createDefaultBaseColors = require('./utils/createDefaultBaseColors')

const userRouter = require('./routes/user');
const baseColorsRouter = require('./routes/base-colors');
const authRouter = require('./routes/auth');
const workspacesRouter = require('./routes/workspaces');
const boardsRouter = require('./routes/boards');

dotenv.config();

const PORT = process.env.PORT;

const app = express();

const corsOptions = {
	origin: [
		//"http://localhost",
		"http://localhost:80",
		//"http://localhost:8000",
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

app.use('/user', userRouter);
app.use('/base-colors', baseColorsRouter);
app.use('/auth', authRouter);
app.use('/workspaces', workspacesRouter);
app.use('/boards', boardsRouter);

const start = async () => {
	try {
		await sequelize.sync();
		await createDefaultBaseColors();
		app.listen(PORT, () => {
			console.log(`Server is running at ${PORT}`);
		});
	} catch (e) {
		console.log(e);
	}
}

start();
