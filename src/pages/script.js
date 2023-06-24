const createRoomButton = document.getElementById('create-room-btn');
const modal = document.getElementById('modal');
const createButton = document.getElementById('create-btn');

createRoomButton.addEventListener('click', function () {
  modal.style.display = 'block';
  document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
});

createButton.addEventListener('click', function () {
  const roomName = document.getElementById('room-name').value;
  if (roomName.trim() !== '') {
    // ルーム作成処理を追加する（サーバーサイドなど）
    modal.style.display = 'none';
    document.body.style.backgroundColor = '#fff';
  }
});
