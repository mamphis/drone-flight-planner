
// TODO: Add the store ;)

import { User } from "./models";

type TeamOverview = {
    id: string;
    name: string;
    owner: User;
    _count: {
        members: number;
    };
    createdAt: string;
    updatedAt: string;
};

