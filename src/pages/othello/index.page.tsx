/* eslint-disable complexity */
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom } from '../../atoms/user';
import styles from './othello.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  const [board, setBoard] = useState<number[][]>();
  const fetchBoard = async () => {
    const board = await apiClient.rooms.$get().catch(returnNull);
    if (board === null) {
      const newRoom = await apiClient.rooms.$post();
      setBoard(newRoom.board);
    }
    if (board !== null) setBoard(board.board);
  };

  const clickCell = async (x: number, y: number) => {
    await apiClient.rooms.board.$post({ body: { x, y } });
    await fetchBoard();
  };

  useEffect(() => {
    const cancelid = setInterval(fetchBoard, 500);
    return () => clearInterval(cancelid);
  }, []);

  if (!board || !user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.container}>
        {/* <a className={styles.turn}>現在 {turn === 1 ? '黒' : '白'} のターン</a> */}
        {/* <div className={styles.black}>
          <a className={styles.blackname}>黒{blackCount}個</a>
        </div>
        <div className={styles.white}>
          <a className={styles.whitename}>白{whiteCount}個</a>
        </div> */}
        {/* <a href="http://localhost:3000/" className={styles.newgame}>
          リスタート
        </a> */}
        <div className={styles.board}>
          {board.map((row, y) =>
            row.map((color, x) => (
              <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickCell(x, y)}>
                {color !== 0 && (
                  <div
                    className={styles.stone}
                    style={{
                      background: color === 1 ? '#000' : color === 3 ? '#ccff00' : '#fff',
                      width: color === 3 ? '20%' : '90%',
                      height: color === 3 ? '20%' : '90%',
                    }}
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
