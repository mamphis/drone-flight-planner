import { PrismaClient } from "@prisma/client";
import { compare, hash } from 'bcrypt';
import { Router } from "express";
import { sign } from 'jsonwebtoken';
import createHttpError from "http-errors";
import authHandler from "../../middleware/auth";

const router = Router();
const client = new PrismaClient();

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await client.user.findFirst({
            where: {
                OR: [
                    { email: username },
                    { username },
                ]
            }
        });

        if (!user) {
            return next(createHttpError(404, 'User not found.'));
        }

        if (!await compare(password, user.password)) {
            return next(createHttpError(401, 'Invalid password.'));
        }

        const token = sign({
            id: user.id,
            username: user.username,
            email: user.email,
            name: user.name,
        }, process.env.JWT_SECRET);

        return res.json({
            token,
        });
    } catch (err) {
        next(err);
    }
});

router.post('/register', async (req, res, next) => {
    const { username, password, email, name } = req.body;

    try {
        const user = await client.user.create({
            data: {
                username,
                password: await hash(password, 10),
                email,
                name,
            }
        });

        const token = sign({
            id: user.id,
            username: user.username,
            email: user.email,
            name: user.name,
        }, process.env.JWT_SECRET);

        return res.json({
            token,
        });
    } catch (err) {
        next(err);
    }
});

router.get('/me', authHandler, (req, res, next) => {
    return res.redirect(`${req.baseUrl}/${res.locals.user.id}`);
});

router.get('/:id', authHandler, async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await client.user.findUnique({
            where: {
                id,
            }
        });

        if (!user) {
            return next(createHttpError(404, 'User not found.'));
        }

        return res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    } catch (err) {
        next(err);
    }
});

export default router;