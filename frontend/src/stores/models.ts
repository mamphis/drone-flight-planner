export type User = {
    username: string,
    email: string,
    id: string,
    name: string,
    profilePictureUri: string,
};

export type TeamLean = {
    id: string;
    name: string;
    owner: User;
}

export type TeamOverview = TeamLean & {
    _count: {
        members: number;
        flightMissions: number;
    };
    createdAt: string;
    updatedAt: string;
};

export type TeamDetail = TeamLean & {
    members: User[];
}

export type FlightMission = {
    id: string;
    name: string;
    team: TeamLean;
    flightAltitude: number;
    flightSpeed: number;
    homeLatitude: number;
    homeLongitude: number;
}
