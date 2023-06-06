import type { BoardArr } from '$/repository/boardRepository';

export type Methods = {
  get: {
    resBody: { board: BoardArr };
  };
  post: {
    reqBody: { x: number; y: number };
    resBody: { board: BoardArr };
  };
};
