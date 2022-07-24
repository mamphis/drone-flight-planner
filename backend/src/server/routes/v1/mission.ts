import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response, Router } from 'express';
import createHttpError from 'http-errors';
import { flightMissionDetailSelect, flightMissionLeanSelect } from '../../../libs/flightMissions';
import permissions from '../../../libs/permission';
import authHandler from '../../middleware/auth';

const router = Router();
const client = new PrismaClient();

router.use(authHandler);

/**
 * @api {get} /missions Gets all missions for the user
 * @produces 200 - All missions in an array
 */
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

/**
 * @api {post} /missions
 * @produces 403 - User is not allowed to add a mission
 * @produces 200 - Mission created
 */
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const { teamId, name } = req.body;
    try {
        const allowed = permissions.missions.canUserAddMissions(teamId, res.locals.user.id);
        if (!allowed) {
            return next(createHttpError(403, 'User is not allowed to add missions'));
        }

        const flightMission = await client.flightMission.create({
            data: {
                name,
                team: {
                    connect: {
                        id: teamId,
                    }
                },
                flightAltitude: 100,
                flightSpeed: 10,
                homeLatitude: 0,
                homeLongitude: 0,
            },
            select: flightMissionDetailSelect
        });

        res.json(flightMission);
    } catch (err: any) {
        return next(err);
    }
});

/**
 * @api {put} /missions/:flightMissionId Updates the flightmission with the given id
 * @produces 404 - Flightmission not found
 * @produces 403 - User not allowed to edit missions
 * @produces 200 - The updated FlightMission
 */
router.put('/:flightMissionId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const flightMission = await client.flightMission.findUnique({
            where: {
                id: req.params.flightMissionId,
            },
            select: flightMissionLeanSelect
        });

        if (!flightMission) {
            return next(createHttpError(404, 'Flightmission not found.'));
        }

        const updateAllowed = permissions.missions.canUserEditMissions(flightMission.team.id, res.locals.user.id)
        if (!updateAllowed) {
            return next(createHttpError(403, 'User is not allowed to edit the mission.'));
        }

        const updatedFlightMission = await client.flightMission.update({
            where: {
                id: req.params.flightMissionId,
            },
            data: req.body
        });

        res.json(updatedFlightMission);
    } catch (err: any) {
        return next(err);
    }
});

export default router;
