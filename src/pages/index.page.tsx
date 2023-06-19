/* eslint-disable max-depth */
import type { RoomModel, TaskModel } from '$/commonTypesWithClient/models';
import { useAtom } from 'jotai';
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
  const inputLabel = (e: ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };
  const fetchTasks = async () => {
    const tasks = await apiClient.tasks.$get().catch(returnNull);

    if (tasks !== null) setTasks(tasks);
  };
  const fetchRooms = async () => {
    try {
      const newRoom = await apiClient.rooms.$get().catch(returnNull);
      if (newRoom !== null) {
        setRooms([newRoom]); // 部屋オブジェクトを配列に変換して設定
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const createTask = async (e: FormEvent) => {
    e.preventDefault();
    if (!label) return;

    await apiClient.tasks.post({ body: { label } });
    setLabel('');
    await fetchTasks();
  };
  // const createRoom = async (e: FormEvent) => {
  //   e.preventDefault();
  //   if (!label) return; 
  //   await apiClient.rooms.post({ body: { name } });

  //   await fetchRooms();
  // };
  
  const toggleDone = async (task: TaskModel) => {
    await apiClient.tasks._taskId(task.id).patch({ body: { done: !task.done } });
    await fetchTasks();
  };
  const deleteTask = async (task: TaskModel) => {
    await apiClient.tasks._taskId(task.id).delete();
    await fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
    fetchRooms();
  }, []);

  if (!tasks || !user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.title} style={{ marginTop: '160px' }}>
        Welcome to frourio!
      </div>

      <form style={{ textAlign: 'center', marginTop: '80px' }} onSubmit={createTask}>
        <input value={label} type="text" onChange={inputLabel} />
        <input type="submit" value="ADD" />
      </form>
      <ul className={styles.tasks}>
        {tasks.map((task) => (
          <li key={task.id}>
            <label>
              <input type="checkbox" checked={task.done} onChange={() => toggleDone(task)} />
              <span>{task.label}</span>
            </label>
            <input
              type="button"
              value="DELETE"
              className={styles.deleteBtn}
              onClick={() => deleteTask(task)}
            />
          </li>
        ))}
      </ul>
      <div>
      <h1>オセロロビー</h1>
      <ul>
  {rooms?.length ? (
    rooms.map((room) => (
      <li key={room.id}>
        RoomId: {room.id}, Name: {room.name}
      </li>
    ))
  ) : (
    <li>No rooms available</li>
  )}
</ul>

    </div>
    </>
    
  );
};

export default Home;
