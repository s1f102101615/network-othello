// import admin from 'firebase-admin';
import { defineController } from './$relay';

// // Firebase Admin SDKの初期化
// admin.initializeApp({
//   // Firebaseの設定
// });

// // ユーザー名を取得する関数
// async function getUserName(userId: string): Promise<string | null> {
//   try {
//     const userRecord = await admin.auth().getUser(userId);
//     return userRecord.displayName || null;
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     return null;
//   }
// }

export default defineController(() => ({
  get: ({ user }) => {
    return { status: 200, body: user };
  },
  // getName: async ({ blackId, whiteId }) => {
  //   const blackUser = getUserName(blackId); // blackIdを使用してユーザー情報を取得する
  //   const whiteUser = getUserName(whiteId); // whiteIdを使用してユーザー情報を取得する

  //   const blackName = await blackUser ? blackUser : ''; // ユーザーが存在すればdisplayNameを使用し、存在しなければ空文字列を代入
  //   const whiteName = await whiteUser ? whiteUser : ''; // ユーザーが存在すればdisplayNameを使用し、存在しなければ空文字列を代入

  //   return { status: 200, body: { blackName, whiteName } };
  // },
}));
