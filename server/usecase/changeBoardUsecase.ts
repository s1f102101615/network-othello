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
export const changeBoardUsecase = {
  getChangeBoard: (x: number, y: number, color: UserId,board: number[][]): number[][] => {
    const newBoard = board

    for (const d of directions) {
      if (
        newBoard[y + d[0]] !== undefined &&
        newBoard[y + d[0]][x + d[1]] !== undefined &&
        newBoard[y + d[0]][x + d[1]] !== 0 &&
        newBoard[y + d[0]][x + d[1]] !== userColorUsecase.getUserColor(color)
      ) {
        if (
          newBoard[y + d[0]][x + d[1]] !== userColorUsecase.getUserColor(color) &&
          newBoard[y + d[0]][x + d[1]] !== 3
        ) {
          let rturn = 2;
          for (let p = 2; p < 8; p++) {
            if (
              newBoard[y + d[0] * p] === undefined ||
              newBoard[y + d[0] * p][x + d[1] * p] === undefined ||
              newBoard[y + d[0] * p][x + d[1] * p] === 0 ||
              newBoard[y + d[0] * p][x + d[1] * p] === 3
            ) {
              break;
            }
            if (newBoard[y + d[0] * p][x + d[1] * p] === userColorUsecase.getUserColor(color)) {
              newBoard[y][x] = userColorUsecase.getUserColor(color);

              for (let now = 1; now < rturn; now++) {
                newBoard[y + d[0] * (p - now)][x + d[1] * (p - now)] =
                  userColorUsecase.getUserColor(color);
              }
            }
            rturn++;
          }
        }
      }
    }
    return newBoard;
  },
};