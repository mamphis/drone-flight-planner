import { PrismaClient, User } from "@prisma/client";

const ownerSelect = {
    select: {
        id: true,
        name: true,
        email: true,
        username: true,
    },
};

export const teamDetailSelect = {
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
};

export const teamLeanSelect = {
    name: true,
    id: true,
    createdAt: true,
    updatedAt: true,
    owner: ownerSelect,
    _count: {
        select: { members: true }
    },
};
