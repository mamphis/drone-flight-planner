import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import createHttpError from "http-errors";
import { teamDetailSelect, teamLeanSelect } from "../../../libs/team";
import authHandler from "../../middleware/auth";

const router = Router();
const client = new PrismaClient();


router.use(authHandler);

/**
 * @api {get} /teams Gets all teams where the user is owner or member
 * @produces 200 - Teams found
 */
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
        select: teamLeanSelect,
    });

    res.json(teams);
});

/**
 * @api {get} /teams/:id/members Gets detailed information of the teams members
 * @produces 404 - Team not found
 * @produces 200 - Team found
 */
router.get('/:id/members', async (req, res, next) => {
    const { id } = req.params;

    const team = await client.team.findUnique({
        where: {
            id,
        },
        select: teamDetailSelect,
    });

    if (!team) {
        return next(createHttpError(404, 'Team not found.'));
    }

    // TODO: Maybe check if user is member of team or owns it?
    /*
    if (team.owner.id !== res.locals.user.id && !team.members.some(m => m.id === res.locals.user.id)) {
        return next(createHttpError(403, 'You are not allowed to view this team.'));
    }
    */

    res.json(team);
});

/**
 * @api {post} /teams/:id/members Adds a user to a team
 * @produces 404 - Team not found
 * @produces 400 - User is already member of team
 * @produces 403 - Logged in User is not the owner of team
 * @produces 200 - User added to team
 */
router.post('/:id/members', async (req, res, next) => {
    const { id } = req.params;
    const { userId } = req.body;
    try {
        const team = await client.team.findUnique({
            where: {
                id,
            }, select: {
                members: true,
                owner: {
                    select: {
                        id: true,
                    }
                }
            }
        });

        if (!team) {
            return next(createHttpError(404, 'Team not found.'));
        }

        if (team.members.some(m => m.id === userId)) {
            return next(createHttpError(400, 'User is already member of team.'));
        }

        if (team.owner.id !== res.locals.user.id) {
            return next(createHttpError(403, 'You are not allowed to add users to this team.'));
        }

        const newTeam = await client.team.update({
            where: {
                id,
            },
            data: {
                members: {
                    connect: {
                        id: userId,
                    },
                },
            },
            select: teamDetailSelect,
        });

        res.json(newTeam);
    } catch (err: any) {
        next(err);
    }
});

/**
 * @api {delete} /teams/:id/members/:memberId Removes a user from a team
 * @produces 404 - Team not found
 * @produces 403 - Logged in User is not the owner of team
 * @produces 200 - User removed from team
 */
router.delete('/:id/members/:memberId', async (req, res, next) => {
    const { id, memberId } = req.params;

    try {
        const team = await client.team.findUnique({
            where: {
                id,
            },
            select: {
                members: true,
                owner: {
                    select: {
                        id: true,
                    }
                }
            }
        });

        if (!team) {
            return next(createHttpError(404, 'Team not found.'));
        }

        if (team.owner.id !== res.locals.user.id) {
            return next(createHttpError(403, 'You are not allowed to remove users from this team.'));
        }

        const newTeam = await client.team.update({
            where: {
                id,
            },
            data: {
                members: {
                    disconnect: {
                        id: memberId,
                    },
                },
            },
            select: teamDetailSelect,
        });

        res.json(newTeam);
    } catch (err: any) {
        next(err);
    }
});

export default router;