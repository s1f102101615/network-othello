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
export const futureBoardRepository = {
  // eslint-disable-next-line complexity
  // eslint-disable-next-line max-depth
  getfutureChangeBoard: (color: UserId): number[][] => {
    const newfutureBoard = boardRepository.getBoard();

    for (let tate = 0; tate < 8; tate++) {
      for (let yoko = 0; yoko < 8; yoko++) {
        if (newfutureBoard[tate][yoko] !== 1 && newfutureBoard[tate][yoko] !== 2) {
          for (const d of directions) {
            if (
              newfutureBoard[tate + d[0]] !== undefined &&
              newfutureBoard[tate + d[0]][yoko + d[1]] !== undefined &&
              newfutureBoard[tate + d[0]][yoko + d[1]] === userColorRepository.getUserColor(color)
            ) {
              if (
                newfutureBoard[tate + d[0]][yoko + d[1]] !==
                3 - userColorRepository.getUserColor(color)
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
                    3 - userColorRepository.getUserColor(color)
                  ) {
                    newfutureBoard[tate][yoko] = 3;
                  } else {
                    newfutureBoard[tate][yoko] = 0;
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
