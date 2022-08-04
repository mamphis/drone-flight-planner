import { flightMissionLeanSelect } from "../flightMissions";

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
    joinCode: true,
    owner: ownerSelect,
    members: {
        select: {
            id: true,
            name: true,
            email: true,
            username: true,
        },
    },
    flightMissions: {
        select: flightMissionLeanSelect
    }
};

export const teamLeanSelect = {
    name: true,
    id: true,
    createdAt: true,
    updatedAt: true,
    owner: ownerSelect,
    _count: {
        select: { members: true, flightMissions: true }
    },
};
