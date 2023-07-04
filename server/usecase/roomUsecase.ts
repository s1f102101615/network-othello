/* eslint-disable max-depth */
/* eslint-disable complexity */
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
function checkArray(arr: number[][]) {
  const flattenedArray = arr.flat();
  const hasZero = flattenedArray.includes(0);
  const hasThree = flattenedArray.includes(3);

  return !(hasZero || hasThree);
}

export const roomUsecase = {
  create: async (label: RoomModel['name']) => {
    const newRoom: RoomModel = {
      name: label,
      black: undefined,
      white: undefined,
      watcher: [],
      blackname: '',
      whitename: '',
      turn: 1,
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
    userId: UserId,
    userDisplayName: string | undefined
  ): Promise<RoomModel> => {
    const latest = await roomsRepository.findLatest();

    assert(latest, 'クリック出来てるんだからRoomが無いわけがない');
    const rooms = latest.find((room) => room.id === RoomId);
    assert(rooms, 'クリック出来てるんだからIDが合わないわけない');
    if (x === 11) {
      if (rooms.white !== userId && !(rooms.white === 'undefined')) {
        rooms.status = 'playing';
      }
      if (rooms.black === userId) {
        rooms.black = undefined;
        rooms.blackname = '';
      } else if (rooms.black === 'undefined') {
        if (rooms.white === userId) {
          rooms.white = undefined;
          rooms.whitename = '';
        }
        rooms.black = userId;
        rooms.blackname = userDisplayName;
        rooms.watcher = rooms.watcher.filter((id) => id !== userId);
      }
      await roomsRepository.save(rooms);
    }
    if (x === 12) {
      if (rooms.black !== userId && !(rooms.black === 'undefined')) {
        rooms.status = 'playing';
      }
      if (rooms.white === userId) {
        rooms.white = undefined;
        rooms.whitename = '';
      } else if (rooms.white === 'undefined') {
        if (rooms.black === userId) {
          rooms.black = undefined;
          rooms.blackname = '';
        }
        rooms.white = userId;
        rooms.whitename = userDisplayName;
        rooms.watcher = rooms.watcher.filter((id) => id !== userId);
      }
      await roomsRepository.save(rooms);
    }
    if (x === 13) {
      if (rooms.status === 'playing') {
        if (rooms.black === userId) {
          rooms.status = 'ended';
          rooms.blackname = '退出しました';
          await roomsRepository.save(rooms);
        } else if (rooms.white === userId) {
          rooms.status = 'ended';
          rooms.whitename = '退出しました';
          await roomsRepository.save(rooms);
        }
        rooms.watcher = rooms.watcher.filter((id) => id !== userId);
        await roomsRepository.save(rooms);
        return rooms;
      } else if (rooms.status === 'waiting') {
        if (rooms.black === userId) {
          rooms.black = undefined;
          rooms.blackname = '';
          await roomsRepository.save(rooms);
        } else if (rooms.white === userId) {
          rooms.white = undefined;
          rooms.whitename = '';
          await roomsRepository.save(rooms);
        }
        rooms.watcher = rooms.watcher.filter((id) => id !== userId);
        await roomsRepository.save(rooms);
        return rooms;
      }
    }

    const newBoard: number[][] = JSON.parse(JSON.stringify(rooms.board));
    const userColor = await userColorUsecase.getUserColor(userId, RoomId);
    if (
      userColor !== rooms.turn ||
      newBoard[y][x] !== 3 ||
      rooms.status === 'waiting' ||
      rooms.status === 'ended'
    ) {
      const newRoom: RoomModel = { ...rooms, board: newBoard };
      return newRoom;
    }
    newBoard[y][x] = userColor;
    if (checkArray(newBoard)) {
      rooms.status = 'ended';
    }
    const cong = changeBoardUsecase.getChangeBoard(x, y, userId, newBoard, RoomId);
    // const setturn: RoomModel = { ...rooms, turn: 3 - rooms.turn };
    // await roomsRepository.save(setturn);
    futureBoardUsecase
      .getfutureChangeBoard(userId, await cong, RoomId)
      .then((result) => {
        if (result[0] === 1) {
          const tong = result[1];
          const newRoom: RoomModel = { ...rooms, board: tong, turn: 3 - rooms.turn };
          roomsRepository.save(newRoom);
          return newRoom;
        } else if (result[0] === 0) {
          console.log('パスです。');
          const tong = result[1];
          const newRoom: RoomModel = { ...rooms, board: tong };
          roomsRepository.save(newRoom);
          return newRoom;
        } else if (result[0] === 3) {
          const tong = result[1];
          const newRoom: RoomModel = { ...rooms, board: tong, status: 'ended' };
          roomsRepository.save(newRoom);
        }
      })
      .catch(() => {
        console.log('エラー');
      });
    const newRoom: RoomModel = { ...rooms };
    return newRoom;
  },
};
