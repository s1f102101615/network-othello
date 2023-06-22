import type { UserId } from '$/commonTypesWithClient/branded';
import type { RoomModel } from '$/commonTypesWithClient/models';
import { roomsRepository } from '$/repository/roomsRepository';
import { roomIdParser } from '$/service/idParsers';
import assert from 'assert';
import { randomUUID } from 'crypto';
import { changeBoardUsecase } from './changeBoardUsecase';
import { futureBoardUsecase } from './futureBoardUsecase';
import { userColorUsecase } from './userColorUsecase';
const initBoard = () => [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 3, 0, 0, 0],
  [0, 0, 0, 1, 2, 3, 0, 0],
  [0, 0, 3, 2, 1, 0, 0, 0],
  [0, 0, 0, 3, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
let turn = 1;
export const roomUsecase = {
  create: async (label: RoomModel['name']) => {
    const newRoom: RoomModel = {
      name: label,
      black: undefined,
      white: undefined,
      watcher: [],
      id: roomIdParser.parse(randomUUID()),
      board: initBoard(),
      status: 'waiting',
      created: Date.now(),
    };
    await roomsRepository.save(newRoom);

    return newRoom;
  },
  clickBoard: async (
    x: number,
    y: number,
    RoomId: string | string[] | undefined,
    userId: UserId
  ): Promise<RoomModel> => {
    const latest = await roomsRepository.findLatest();

    assert(latest, 'クリック出来てるんだからRoomが無いわけがない');
    const rooms = latest.find((room) => room.id === RoomId);
    assert(rooms, 'クリック出来てるんだからIDが合わないわけない');

    const newBoard: number[][] = JSON.parse(JSON.stringify(rooms.board));
    const userColor = await userColorUsecase.getUserColor(userId, RoomId);
    if (userColor !== turn || newBoard[y][x] !== 3) {
      const newRoom: RoomModel = { ...rooms, board: newBoard };
      return newRoom;
    }
    newBoard[y][x] = userColor;
    const cong = changeBoardUsecase.getChangeBoard(x, y, userId, newBoard, RoomId);
    turn = 3 - turn;
    const tong = futureBoardUsecase.getfutureChangeBoard(userId, await cong, RoomId);
    const newRoom: RoomModel = { ...rooms, board: await tong };

    await roomsRepository.save(newRoom);

    return newRoom;
  },
};
