import type { RoomModel } from '$/commonTypesWithClient/models';
import { roomIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { Room } from '@prisma/client';
import { z } from 'zod';
const toRoomModel = (prismaRoom: Room): RoomModel => ({
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
      update: { status: room.status, board: room.board },
      create: {
        name: room.name || 'defaultName',
        roomId: room.id,
        board: room.board,
        status: room.status,
        createdAt: new Date(room.created),
      },
    });
  },
  findLatest: async (): Promise<RoomModel[] | null> => {
    const rooms = await prismaClient.room.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return rooms.length > 0 ? rooms.map((room) => toRoomModel(room)) : null;
  },
};
