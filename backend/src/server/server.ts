import express, { Application } from "express";
import moment from "moment";
import apiRouter from './routes';
import createHttpError from "http-errors";

export class Server {
    private readonly app: Application;

    constructor(private readonly port: number) {
        this.app = express();
        this.config();
        this.routes();
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        this.app.use(async (req, res, next) => {
            const start = moment();
            await next();

            const ms = moment().diff(start);
            console.log(`${start.format('DD.MM.YY HH:mm:ss.SSS')} ${req.method} ${req.originalUrl} - ${ms}ms`);
        });
    }

    private routes(): void {
        // TODO: serve static generated fronted

        this.app.use('/api', apiRouter)

        this.app.use((req, res, next) => {
            return next(createHttpError(404, `Route ${req.originalUrl} not found.`));
        });

        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            if (req.headers.accept?.includes('application/json')) {
                return res.status(err.statusCode || 500).json(err);
            } else {
                return res.status(500).send(err.message);
            }
        });
    }
}