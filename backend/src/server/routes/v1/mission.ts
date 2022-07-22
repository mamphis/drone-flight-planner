import { PrismaClient } from '@prisma/client';
import { Router, Request, Response, NextFunction } from 'express';
import authHandler from '../../middleware/auth';

const router = Router();
const client = new PrismaClient();

router.use(authHandler);

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const missions = await client.flightMission.findMany({
            where: {
                team: {
                    OR: [
                        {
                            members: {
                                some: {
                                    id: res.locals.user.id,
                                }
                            }
                        },
                        {
                            owner: {
                                id: res.locals.user.id,
                            },
                        },
                    ]
                },
            },
            select: {
                id: true,
                name: true,
                team: {
                    select: {
                        id: true,
                        name: true,
                        owner: {
                            select: {
                                id: true,
                                name: true,
                                username: true,
                                email: true,
                            },
                        },
                    },
                },
                flightAltitude: true,
                flightSpeed: true,
                homeLatitude: true,
                homeLongitude: true,
            },
        });

        res.json(missions);
    } catch (err) {
        next(err);
    }
});


export default router;
