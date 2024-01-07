require('dotenv').config();
const setupDb = require('./db/setupDb');
const express = require('express');
const cors = require('cors')
const router = require('./routes');
const helmet = require('helmet');
const apiErrorHandler = require('./error/apiErrorHandler');
const authenticateUser = require('./middleware/auth/authentication');
const logger = require('./logger');
const jsonParserErrorHandler = require('./error/jsonParserErrorHandler');
const objectionErrorHandler = require('./error/objectionErrorHandler');
const notFoundHandler = require('./middleware/notFoundHandler');

setupDb();

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(jsonParserErrorHandler);
app.use(authenticateUser);
app.use('/', router);
app.use(notFoundHandler);
app.use(objectionErrorHandler);
app.use(apiErrorHandler);

app.listen(process.env.SERVER_PORT, () =>
	logger.info(`Server running on port ${process.env.SERVER_PORT}`)
);
