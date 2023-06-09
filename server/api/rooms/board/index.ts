import type { RoomModel } from '$/commonTypesWithClient/models';

export type Methods = {
  post: {
    reqBody: { x: number; y: number; RoomId: string | string[] | undefined };
    resBody: RoomModel;
  };
};
