/* eslint-disable complexity */
/* eslint-disable max-depth */
import type { RoomModel, TaskModel } from '$/commonTypesWithClient/models';
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
  const [tasks, setTasks] = useState<TaskModel[] | undefined>(undefined);
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
    const rooms = roomlist.find(
      (room) =>
        (room.black === 'undefined' && !(room.white === 'undefined')) ||
        (!(room.black === 'undefined') && room.white === 'undefined')
    );
    assert(rooms, 'クリック出来てるんだからIDが合わないわけない');
    const id = rooms.id;
    window.location.href = `/othello/${id}`;
  };
  const inputLabel = (e: ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };
  const fetchTasks = async () => {
    const tasks = await apiClient.tasks.$get().catch(returnNull);
    console.log(tasks);

    if (tasks !== null) setTasks(tasks);
  };
  const fetchRooms = async () => {
    const newRoom = await apiClient.rooms.$get().catch(returnNull);
    console.log(newRoom);
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
    fetchTasks();
    fetchRooms();
  }, []);

  if (!tasks || !user) return <Loading visible />;
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

      <div className={styles.rooms}>
        {rooms?.length ? (
          [...rooms].reverse().map((room) => (
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
          <li>No rooms available</li>
        )}
      </div>
    </>
  );
};

export default Home;
