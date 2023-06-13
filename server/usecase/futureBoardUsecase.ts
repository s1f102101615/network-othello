/* eslint-disable complexity */
/* eslint-disable max-depth */
import type { UserId } from '$/commonTypesWithClient/branded';
import { userColorUsecase } from './userColorUsecase';


const directions = [
  [-1, 0], // 上
  [-1, 1], // 右上
  [0, 1], // 右
  [1, 1], // 右下
  [1, 0], // 下
  [1, -1], // 左下
  [0, -1], // 左
  [-1, -1], // 左上
];
export const futureBoardUsecase = {
  getfutureChangeBoard: (color: UserId,board: number[][]): number[][] => {
    const newfutureBoard = board;
  
    for (let tate = 0; tate < 8; tate++) {
      for (let yoko = 0; yoko < 8; yoko++) {
        if (newfutureBoard[tate][yoko] === 3) {
          newfutureBoard[tate][yoko] = 0;
        }
        if (newfutureBoard[tate][yoko] === 0) {
          for (const d of directions) {
            if (
              newfutureBoard[tate + d[0]] !== undefined &&
              newfutureBoard[tate + d[0]][yoko + d[1]] !== undefined &&
              newfutureBoard[tate + d[0]][yoko + d[1]] === userColorUsecase.getUserColor(color)
            ) {
              if (
                newfutureBoard[tate + d[0]][yoko + d[1]] !==
                3 - userColorUsecase.getUserColor(color)
              ) {
                for (let p = 2; p < 8; p++) {
                  if (
                    newfutureBoard[tate + d[0] * p] === undefined ||
                    newfutureBoard[tate + d[0] * p][yoko + d[1] * p] === undefined ||
                    newfutureBoard[tate + d[0] * p][yoko + d[1] * p] === 3 ||
                    newfutureBoard[tate + d[0] * p][yoko + d[1] * p] === 0
                  ) {
                    break;
                  }
                  if (
                    newfutureBoard[tate + d[0] * p][yoko + d[1] * p] ===
                    3 - userColorUsecase.getUserColor(color)
                  ) {
                    newfutureBoard[tate][yoko] = 3;
                  }
                }
              }
            }
          }
        }
      }
    }
    return newfutureBoard;
  },
};
