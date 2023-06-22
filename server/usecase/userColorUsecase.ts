/* eslint-disable complexity */
import type { UserId } from '$/commonTypesWithClient/branded';
import { roomsRepository } from '$/repository/roomsRepository';
import assert from 'assert';

export const userColorUsecase = {
  getUserColor: async (userID: UserId, RoomId: string | string[] | undefined): Promise<number> => {
    const latest = await roomsRepository.findLatest();
    assert(latest, 'クリック出来てるんだからRoomが無いわけがない');
    const rooms = latest.find((room) => room.id === RoomId);
    assert(rooms, 'クリック出来てるんだからIDが合わないわけない');
    if (rooms.black === userID) {
      return 1;
    } else if (rooms.white === userID) {
      return 2;
    } else if (rooms.watcher?.includes(userID)) {
      return 3;
    } else if (rooms.black === null) {
      rooms.black = userID;
      await roomsRepository.save(rooms);
      return 1;
    } else if (rooms.white === null) {
      rooms.white = userID;
      await roomsRepository.save(rooms);
      return 2;
    } else {
      rooms.watcher?.push(userID);
      await roomsRepository.save(rooms);
      return 3;
    }
  },
};
