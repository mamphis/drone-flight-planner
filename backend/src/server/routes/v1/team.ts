import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import createHttpError from "http-errors";
import authHandler from "../../middleware/auth";

const router = Router();
const client = new PrismaClient();

const ownerSelect = {
    select: {
        id: true,
        name: true,
        email: true,
        username: true,
    },
};

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
        select: {
            name: true,
            id: true,
            createdAt: true,
            updatedAt: true,
            owner: ownerSelect,
            _count: {
                select: { members: true }
            },
        },
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
        select: {
            id: true,
            name: true,
            owner: ownerSelect,
            members: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    username: true,
                },
            },
        },
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



export default router;