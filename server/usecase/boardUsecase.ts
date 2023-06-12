import type { UserId } from '$/commonTypesWithClient/branded';
import { changeBoardUsecase } from './changeBoardUsecase';
import { futureBoardUsecase } from './futureBoardUsecase';
import { userColorUsecase } from './userColorUsecase';

export type BoardArr = number[][];

export type Pos = { x: number; y: number };

const board: BoardArr = [
  ...Array.from({ length: 2 }, () => Array(8).fill(0)),
  [0, 0, 0, 0, 3, 0, 0, 0],
  [0, 0, 0, 1, 2, 3, 0, 0],
  [0, 0, 3, 2, 1, 0, 0, 0],
  [0, 0, 0, 3, 0, 0, 0, 0],
  ...Array.from({ length: 2 }, () => Array(8).fill(0)),
]; //実装コード
let turn = 1;
export const boardUsecase = {
  getBoard: () => board,
  clickBoard: (x: number, y: number, userId: UserId): BoardArr => {
    if (userColorUsecase.getUserColor(userId) !== turn || board[y][x] !== 3) {
      return board;
    }
    board[y][x] = userColorUsecase.getUserColor(userId);
    changeBoardUsecase.getChangeBoard(x, y, userId);
    turn = 3 - turn;
    futureBoardUsecase.getfutureChangeBoard(userId);
    return board;
  },
};
