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
  getChangeBoard: async (
    x: number,
    y: number,
    color: UserId,
    board: number[][],
    RoomId: string | string[] | undefined
  ): Promise<number[][]> => {
    const newBoard = board;

    for (const d of directions) {
      if (
        newBoard[y + d[0]] !== undefined &&
        newBoard[y + d[0]][x + d[1]] !== undefined &&
        newBoard[y + d[0]][x + d[1]] !== 0 &&
        newBoard[y + d[0]][x + d[1]] !== (await userColorUsecase.getUserColor(color, RoomId))
      ) {
        if (
          newBoard[y + d[0]][x + d[1]] !== (await userColorUsecase.getUserColor(color, RoomId)) &&
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
            if (
              newBoard[y + d[0] * p][x + d[1] * p] ===
              (await userColorUsecase.getUserColor(color, RoomId))
            ) {
              newBoard[y][x] = await userColorUsecase.getUserColor(color, RoomId);

              for (let now = 1; now < rturn; now++) {
                newBoard[y + d[0] * (p - now)][x + d[1] * (p - now)] =
                  await userColorUsecase.getUserColor(color, RoomId);
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
