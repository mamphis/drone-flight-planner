import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { verify } from 'jsonwebtoken';

const authHandler: RequestHandler = async (req, res, next) => {
    const [method, token] = req.headers.authorization?.split(' ') ?? [];
    if (!method) {
        return next(createHttpError(401));
    }

    if (method !== 'Bearer') {
        return next(createHttpError(400, 'Invalid authorization method.'));
    }

    try {
        const payload = verify(token, process.env.JWT_SECRET) as {
            id: string;
            username: string;
            email: string;
            name: string;
        };
        res.locals.user = payload;
        return next();
    } catch (err) {
        return next(createHttpError(401, 'Invalid credentials.'));
    }
};

export default authHandler;