/* eslint-disable max-lines */
/* eslint-disable complexity */
/* eslint-disable max-depth */
import type { RoomModel } from '$/commonTypesWithClient/models';
import assert from 'assert';
import { useAtom } from 'jotai';
import Link from 'next/link';
import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom } from '../atoms/user';
import styles from './index.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  const [label, setLabel] = useState('');
  const [rooms, setRooms] = useState<RoomModel[] | undefined>(undefined);
  const [hidden, setHidden] = useState(1);

  const handleBtn3Click = () => {
    setHidden(0);
  };
  const handleBtn2Click = () => {
    setHidden(1);
  };
  const quickMatch = async () => {
    const roomlist = await apiClient.rooms.$get().catch(returnNull);
    assert(roomlist, 'クリック出来てるんだからRoomが無いわけがない');
    roomlist.reverse();
    let rooms = roomlist.find(
      (room) =>
        (room.black === 'undefined' && !(room.white === 'undefined')) ||
        (!(room.black === 'undefined') && room.white === 'undefined')
    );
    if (rooms === undefined) {
      rooms = roomlist.find((room) => room.black === 'undefined' && room.white === 'undefined');
    }
    if (rooms === undefined) {
      const roomData: Pick<RoomModel, 'name'> = {
        name: 'クイック部屋',
      };
      await apiClient.rooms.post({ body: roomData });
      quickMatch();
    }
    const id = rooms?.id;
    window.location.href = `/othello/${id}`;
  };
  const inputLabel = (e: ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };

  const fetchRooms = async () => {
    const newRoom = await apiClient.rooms.$get().catch(returnNull);
    if (newRoom !== null) {
      setRooms(newRoom);
    }
  };

  // const createTask = async (e: FormEvent) => {
  //   e.preventDefault();
  //   if (!label) return;

  //   await apiClient.tasks.post({ body: { label } });
  //   setLabel('');
  //   await fetchTasks();
  // };

  const createRoom = async (e: FormEvent) => {
    e.preventDefault();
    if (!label) return;

    const roomData: Pick<RoomModel, 'name'> = {
      name: label,
    };
    await apiClient.rooms.post({ body: roomData });
    setLabel('');
    await fetchRooms();
  };

  useEffect(() => {
    const cancelid = setInterval(fetchRooms, 50);
    return () => clearInterval(cancelid);
  }, []);
  // waitingRooms: 待機中の部屋の配列
  // playingRooms: プレイ中の部屋の配列
  const waitingRooms: RoomModel[] = [];
  const playingRooms: RoomModel[] = [];
  const endedRooms: RoomModel[] = [];

  // roomsを待機中の部屋とプレイ中の部屋に分ける
  rooms?.forEach((room) => {
    if (room.status === 'waiting') {
      waitingRooms.push(room);
    } else if (room.status === 'playing') {
      playingRooms.push(room);
    } else {
      endedRooms.push(room);
    }
  });

  if (!user) return <Loading visible />;
  //残りはcss!

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.title}>FrouriOthello</div>
      <div className={styles.btncontainer}>
        <a
          className={`${styles.btnflat} ${styles.btn}`}
          onClick={quickMatch}
          style={{ paddingLeft: '35.8435px', paddingRight: '35.8435px' }}
        >
          <span>クイックマッチ</span>
        </a>

        <a className={`${styles.btnflat} ${styles.btn}`} onClick={handleBtn3Click}>
          <span>ルーム作成</span>
        </a>
      </div>
      <div id="mask" className={styles.mask} style={{ display: hidden === 1 ? 'none' : 'block' }} />
      <section className={styles.modal} style={{ display: hidden === 1 ? 'none' : 'block' }}>
        <span className={styles.square_btn} onClick={handleBtn2Click} />
        <h1 style={{ textAlign: 'center', marginTop: '10px' }}>ルーム作成</h1>
        <form style={{ textAlign: 'center', marginTop: '20px' }} onSubmit={createRoom}>
          <input
            className={styles.inpute}
            value={label}
            type="text"
            onChange={inputLabel}
            placeholder="部屋の名前"
            autoFocus
          />
          <br />
          <input
            type="submit"
            style={{ textAlign: 'center', marginTop: '5px' }}
            onClick={handleBtn2Click}
            className={styles.submit}
          />
        </form>
      </section>
      <div className={styles.state}>参加待ち</div>
      <div className={styles.rooms}>
        {waitingRooms?.length ? (
          [...waitingRooms].reverse().map((room) => (
            <Link href={`/othello/${room.id}`} key={room.id} className={styles.box}>
              <div key={room.id} className={styles.radiusLine}>
                <span className={styles.spans}>{room.name}</span>
                <br />
                参加人数{' '}
                {room.black !== 'undefined' && room.white !== 'undefined'
                  ? 2
                  : room.black !== 'undefined' || room.white !== 'undefined'
                  ? 1
                  : 0}
                人 観戦者数{room.watcher.length - 1}人
              </div>
            </Link>
          ))
        ) : (
          <li>ルームが存在しません</li>
        )}
      </div>
      <div className={styles.state}>対戦中</div>
      <div className={styles.rooms}>
        {playingRooms?.length ? (
          [...playingRooms].reverse().map((room) => (
            <Link href={`/othello/${room.id}`} key={room.id} className={styles.box}>
              <div key={room.id} className={styles.radiusLine}>
                <span className={styles.spans}>{room.name}</span>
                <br />
                参加人数{' '}
                {room.black !== 'undefined' && room.white !== 'undefined'
                  ? 2
                  : room.black !== 'undefined' || room.white !== 'undefined'
                  ? 1
                  : 0}
                人 観戦者数{room.watcher.length - 1}人
              </div>
            </Link>
          ))
        ) : (
          <li>ルームが存在しません</li>
        )}
      </div>
      <div className={styles.state}>ゲーム終了</div>
      <div className={styles.rooms}>
        {endedRooms?.length ? (
          [...endedRooms].reverse().map((room) => (
            <Link href={`/othello/${room.id}`} key={room.id} className={styles.box}>
              <div key={room.id} className={styles.radiusLine}>
                <span className={styles.spans}>{room.name}</span>
                <br />
                参加人数{' '}
                {room.black !== 'undefined' && room.white !== 'undefined'
                  ? 2
                  : room.black !== 'undefined' || room.white !== 'undefined'
                  ? 1
                  : 0}
                人 観戦者数{room.watcher.length - 1}人
              </div>
            </Link>
          ))
        ) : (
          <li>ルームが存在しません</li>
        )}
      </div>
    </>
  );
};

export default Home;
