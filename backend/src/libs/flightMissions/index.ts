import { teamLeanSelect } from "../team";

export const flightMissionDetailSelect = {
    createdAt: true,
    updatedAt: true,
    flightAltitude: true,
    flightSpeed: true,
    homeLatitude: true,
    homeLongitude: true,
    id: true,
    team: { select: teamLeanSelect },
    name: true,
    waypoints: {
        select: {
            altitude: true,
            action: true,
            gimbalAngle: true,
            latitude: true,
            longitude: true,
            id: true,
            orientation: true,
            orientationMode: true,
            name: true
        }
    }
}

export const flightMissionLeanSelect = {
    createdAt: true,
    updatedAt: true,
    flightAltitude: true,
    flightSpeed: true,
    homeLatitude: true,
    homeLongitude: true,
    id: true,
    team: { select: teamLeanSelect },
    name: true,
    _count: {
        select: { waypoints: true }
    },
}