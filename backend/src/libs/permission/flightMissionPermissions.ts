import { PrismaClient } from "@prisma/client";

export class FlightMissionPermissions {
    private client: PrismaClient;

    constructor() {
        this.client = new PrismaClient();
    }

    async canUserAddMissions(teamId: string, userId: string) {
        const team = await this.client.team.findUnique({
            where: {
                id: teamId,
            },
            select: {
                owner: true,
                members: true
            }
        });

        return team?.owner.id === userId || team?.members.some(member => member.id === userId);
    }

    async canUserEditMissions(teamId: string, userId: string) {
        return this.canUserAddMissions(teamId, userId);
    }
}