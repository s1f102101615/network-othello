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
      console.log('1');
      return 1;
    } else if (rooms.white === userID) {
      console.log('2');
      return 2;
    } else if (rooms.watcher?.includes(userID)) {
      console.log('3');
      return 3;
    }
    console.log('6');
    rooms.watcher?.push(userID);
    await roomsRepository.save(rooms);
    return 3;
  },
};
