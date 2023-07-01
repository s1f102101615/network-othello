/* eslint-disable no-constant-condition */
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
  const [blackPlayerName, setblackPlayerName] = useState('-');
  const [whitePlayerName, setwhitePlayerName] = useState('-');
  const [status, setStatus] = useState('waiting');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchBoard = async () => {
    const roomlist = await apiClient.rooms.$get().catch(returnNull);
    assert(roomlist, 'クリック出来てるんだからRoomが無いわけがない');
    const rooms = roomlist.find((room) => room.id === RoomId);
    if (!rooms) {
      fetchBoard();
      return;
    }
    setTurn(rooms.turn);
    setBoard(rooms.board);
    const blackCount = rooms.board.flat().filter((color) => color === 1).length;
    const whiteCount = rooms.board.flat().filter((color) => color === 2).length;

    setBlackCount(blackCount);
    setWhiteCount(whiteCount);
    setblackPlayer(String(rooms.black));
    setwhitePlayer(String(rooms.white));
    setblackPlayerName(String(rooms.blackname));
    setwhitePlayerName(String(rooms.whitename));
    setStatus(rooms.status);
    await apiClient.rooms.board.$post({ body: { x: 10, y: 10, RoomId } });
  };
  const BlackIn = async () => {
    await apiClient.rooms.board.$post({ body: { x: 11, y: 10, RoomId } });
  };
  const WhiteIn = async () => {
    await apiClient.rooms.board.$post({ body: { x: 12, y: 10, RoomId } });
  };

  const clickCell = async (x: number, y: number) => {
    if (
      !user?.id ||
      (blackPlayer === user?.id && turn === 2) ||
      (whitePlayer === user?.id && turn === 1)
    ) {
      return; // プレイヤーのターンでない場合は処理を終了する
    }
    await apiClient.rooms.board.$post({ body: { x, y, RoomId } });
    fetchBoard();
  };
  useEffect(() => {
    const cancelid = setInterval(fetchBoard, 100);
    return () => clearInterval(cancelid);
  }, [fetchBoard]);

  if (!board || !user) return <Loading visible />;

  // ロビーを作る
  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.playerTag}>
        <div className={styles.blackTag}>
          <a className={styles.blackplayer}> {blackPlayerName} </a>
          <a className={styles.blackname}>{blackCount || 2}</a>
        </div>
        <div className={styles.midTag}>
          {status === 'playing' ? (
            <a className={styles.turn}>現在 {turn === 1 ? '黒' : '白'} のターン</a>
          ) : null}
          {status === 'waiting' ? <a className={styles.turn}>プレイヤー待機中</a> : null}
          {status === 'ended' ? <a className={styles.turn}>ゲーム終了</a> : null}
        </div>
        <div className={styles.whiteTag}>
          <a className={styles.whitename}>{whiteCount || 2}</a>
          <a className={styles.whiteplayer}> {whitePlayerName} </a>
        </div>
      </div>
      <div className={styles.you}>
        {blackPlayer === user.id ? <div className={styles.blackyou}> you </div> : null}
        {whitePlayer === user.id ? <div className={styles.whiteyou}> you </div> : null}
      </div>

      <div className={styles.container}>
        {/* <a>
          黒の名前:{blackPlayerName} 白の名前:{whitePlayerName}
        </a> */}
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
        {/* <a className={styles.turn} style={{ opacity: status === 'playing' ? 1 : 0 }}>
          現在 {turn === 1 ? '黒' : '白'} のターン
        </a>
        <a className={styles.turn}>{status === 'waiting' ? 'プレイヤー待機中' : ''} </a>
        <a className={styles.turn}>{status === 'ended' ? 'ゲーム終了' : ''} </a> */}

        {/* <div className={styles.black}>
          <a className={styles.blackname}>黒{blackCount || 2}個</a>
        </div> */}
        {status !== 'waiting' ? null : (
          <div onClick={BlackIn} className={styles.customblack}>
            黒に入る
          </div>
        )}
        {status !== 'waiting' ? null : (
          <div onClick={WhiteIn} className={styles.customwhite}>
            白に入る
          </div>
        )}
        {/* <div onClick={WhiteIn} className={styles.customwhite}>
          白に入る
        </div> */}
        {/* <div className={styles.white}>
          <a className={styles.whitename}>白{whiteCount || 2}個</a>
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

export default OthelloPage;
