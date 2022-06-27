import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import authHandler from "../../middleware/auth";

const router = Router();
const client = new PrismaClient();

router.use(authHandler);
router.get('/', async (req, res, next) => {
    const teams = await client.team.findMany({
        where: {
            OR: [
                {
                    members: {
                        some: {
                            id: res.locals.user.id,
                        },

                    },
                },
                {
                    owner: {
                        id: res.locals.user.id,
                    },
                },
            ],
        },
        select: {
            name: true,
            id: true,
            createdAt: true,
            updatedAt: true,
            owner: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    username: true,
                },
            },
            _count: {
                select: { members: true }
            },
        },
    });

    res.json(teams);
});



export default router;