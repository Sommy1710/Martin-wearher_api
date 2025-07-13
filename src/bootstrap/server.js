import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import {createServer} from 'http';
import logger from '../app/middleware/logger.middleware.js';
import {NotFoundError} from '../lib/error-definitions.js'
import errorMiddleware from '../app/middleware/error-middleware.js';
import config from '../config/app.config.js'
import rateLimit from 'express-rate-limit';
import weatherRoutes from '../routes/weatherRoutes.js';

const limiter =rateLimit({
    windowMs:15*60*1000,
    max:100
}) 

/*windowMs:
This defines the time frame for rate limiting.
15 * 60 * 1000 milliseconds = 15 minutes
So each IP gets a fresh limit every 15 minutes.
max:
This sets the maximum number of requests allowed per IP in that window.
In this case, each IP can make up to 100 requests every 15 minutes.*/

const app = express();
const server = createServer(app);

app.use(cors());
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger());
app.use(errorMiddleware);
app.use(limiter)

app.use('/api/v1/weather', weatherRoutes)

app.get('/health', (req, res) =>
{
    res.status(200).json({
        success:true,
        message: 'server is running'
    });
})

app.use((req, res, next) => {
    next(new NotFoundError(`the requested route ${req.originalUrl} does not exist on this server.`))
})

export {app, server};