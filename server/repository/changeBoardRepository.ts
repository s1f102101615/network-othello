/* eslint-disable max-depth */
import type { UserId } from '$/commonTypesWithClient/branded';
import { boardRepository } from './boardRepository';
import { userColorRepository } from './userColorRepository';

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
export const changeBoardRepository = {
  // eslint-disable-next-line complexity
  // eslint-disable-next-line max-depth
  getChangeBoard: (x: number, y: number, color: UserId): number[][] => {
    const newBoard = boardRepository.getBoard();

    for (const d of directions) {
      if (
        newBoard[y + d[0]] !== undefined &&
        newBoard[y + d[0]][x + d[1]] !== undefined &&
        newBoard[y + d[0]][x + d[1]] !== 0 &&
        newBoard[y + d[0]][x + d[1]] !== userColorRepository.getUserColor(color)
      ) {
        if (
          newBoard[y + d[0]][x + d[1]] !== userColorRepository.getUserColor(color) &&
          newBoard[y + d[0]][x + d[1]] !== 3
        ) {
          let turn = 2;
          for (let p = 2; p < 8; p++) {
            if (
              newBoard[y + d[0] * p] === undefined ||
              newBoard[y + d[0] * p][x + d[1] * p] === undefined ||
              newBoard[y + d[0] * p][x + d[1] * p] === 0 ||
              newBoard[y + d[0] * p][x + d[1] * p] === 3
            ) {
              break;
            }
            if (newBoard[y + d[0] * p][x + d[1] * p] === userColorRepository.getUserColor(color)) {
              newBoard[y][x] = userColorRepository.getUserColor(color);

              for (let now = 1; now < turn; now++) {
                newBoard[y + d[0] * (p - now)][x + d[1] * (p - now)] =
                  userColorRepository.getUserColor(color);
              }
            }
            turn++;
          }
        }
      }
    }
    return newBoard;
  },
};
