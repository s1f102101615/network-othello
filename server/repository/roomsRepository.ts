import type { RoomModel } from "$/commonTypesWithClient/models";
import { roomIdParser } from "$/service/idParsers";
import { prismaClient } from "$/service/prismaClient";
import { z } from "zod";
import type { Room } from "@prisma/client";
const toRoomModel = (prismaRoom: Room): RoomModel=> ({
  name: prismaRoom.name ? roomIdParser.parse(prismaRoom.name) : '',
  id: roomIdParser.parse(prismaRoom.roomId),
  board: z.array(z.array(z.number())).parse(prismaRoom.board),
  status: z.enum(['waiting', 'playing', 'ended']).parse(prismaRoom.status),
  created: prismaRoom.createdAt.getTime(),
});

export const roomsRepository = {
  save: async (room: RoomModel) => {
    await prismaClient.room.upsert({
      where: { roomId: room.id },
      update: { status: room.status, board:room.board },
      create: {
        name: room.name || 'defaultName',
        roomId: room.id,
        board: room.board,
        status: room.status,
        createdAt: new Date(room.created),
      },
    });
  },
  findLatest: async () : Promise<RoomModel | null> => {
    const room = await prismaClient.room.findFirst({
    orderBy: { createdAt: 'desc'},
  })
  return room && toRoomModel(room); 
 },
};