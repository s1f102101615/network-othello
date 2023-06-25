/* eslint-disable complexity */
import assert from 'assert';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom } from '../../atoms/user';
import styles from './othello.module.css';

const OthelloPage = () => {
  const router = useRouter();
  const { RoomId } = router.query;

  const [user] = useAtom(userAtom);
  const [board, setBoard] = useState<number[][]>();
  const [blackCount, setBlackCount] = useState(0);
  const [whiteCount, setWhiteCount] = useState(0);
  const [turn, setTurn] = useState(1);
  const [blackPlayer, setblackPlayer] = useState('-');
  const [whitePlayer, setwhitePlayer] = useState('-');

  const fetchBoard = async () => {
    const roomlist = await apiClient.rooms.$get().catch(returnNull);
    assert(roomlist, 'クリック出来てるんだからRoomが無いわけがない');
    const rooms = roomlist.find((room) => room.id === RoomId);
    assert(rooms, 'クリック出来てるんだからIDが合わないわけない');
    setTurn(rooms.turn);
    setBoard(rooms.board);
    setblackPlayer(String(rooms.black));
    setwhitePlayer(String(rooms.white));
    const blackCount = rooms.board.flat().filter((color) => color === 1).length;
    const whiteCount = rooms.board.flat().filter((color) => color === 2).length;
    setBlackCount(blackCount);
    setWhiteCount(whiteCount);
  };

  const clickCell = async (x: number, y: number) => {
    await apiClient.rooms.board.$post({ body: { x, y, RoomId } });
    await fetchBoard();
  };

  useEffect(() => {
    const cancelid = setInterval(fetchBoard, 500);
    return () => clearInterval(cancelid);
  }, []);

  if (!board || !user) return <Loading visible />;

  // ロビーを作る
  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.container}>
        <div className={styles.youColor}>
          <a>
            あなた:
            {String(user.id) === blackPlayer
              ? '黒'
              : String(user.id) === whitePlayer
              ? '白'
              : '観戦者'}
          </a>
        </div>
        <a className={styles.turn}>現在 {turn === 1 ? '黒' : '白'} のターン</a>
        <div className={styles.black}>
          <a className={styles.blackname}>黒{blackCount}個</a>
        </div>
        <div className={styles.white}>
          <a className={styles.whitename}>白{whiteCount}個</a>
        </div>
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

export default OthelloPage;
