/* eslint-disable complexity */
import type { RoomModel } from '$/commonTypesWithClient/models';
import { UserIdParser, roomIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { Room } from '@prisma/client';
import { z } from 'zod';
const toRoomModel = (prismaRoom: Room): RoomModel => ({
  name: prismaRoom.name ? roomIdParser.parse(prismaRoom.name) : '',
  black: UserIdParser.parse(prismaRoom.black),
  white: UserIdParser.parse(prismaRoom.white),
  watcher: prismaRoom.watcher.split(',').map((watcher) => UserIdParser.parse(watcher.trim())),
  blackname: roomIdParser.parse(prismaRoom.blackname),
  whitename: roomIdParser.parse(prismaRoom.whitename),
  id: roomIdParser.parse(prismaRoom.roomId),
  turn: prismaRoom.turn,
  board: z.array(z.array(z.number())).parse(prismaRoom.board),
  status: z.enum(['waiting', 'playing', 'ended', 'init']).parse(prismaRoom.status),
  created: prismaRoom.createdAt.getTime(),
});

export const roomsRepository = {
  save: async (room: RoomModel) => {
    await prismaClient.room.upsert({
      where: { roomId: room.id },
      update: {
        status: room.status,
        board: room.board,
        black: String(room.black),
        white: String(room.white),
        watcher: String(room.watcher),
        blackname: room.blackname,
        whitename: room.whitename,
        turn: room.turn,
      },
      create: {
        name: room.name || 'defaultName',
        roomId: room.id,
        black: String(room.black),
        white: String(room.white),
        blackname: String(room.blackname),
        whitename: String(room.whitename),
        watcher: String(room.watcher),
        turn: 1,
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
