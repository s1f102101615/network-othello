//import type { userId } from '$/commonTypeWithClient/branded';

import type { UserId } from '$/commonTypesWithClient/branded';

import { userColorRepository } from './userColorRepository';
export type BoardArr = number[][];

export type Pos = { x: number; y: number };

const board: BoardArr = [
  ...Array.from({ length: 3 }, () => Array(8).fill(0)),
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  ...Array.from({ length: 3 }, () => Array(8).fill(0)),
]; //実装コード
let turn = 1;
export const boardRepository = {
  getBoard: () => board,
  clickBoard: (params: Pos, userId: UserId) => {
    if (userColorRepository.getUserColor(userId) === turn && board[params.y][params.x] === 0) {
      board[params.y][params.x] = userColorRepository.getUserColor(userId);
      turn = 3 - turn;
    }
  },
};
