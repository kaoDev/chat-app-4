import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDa8_azU5bB-I0jvf3nfGSQPi5CUA0HmZA",
  authDomain: "project-webapp-chat.firebaseapp.com",
  databaseURL: "https://project-webapp-chat.firebaseio.com",
  projectId: "project-webapp-chat",
  storageBucket: "project-webapp-chat.appspot.com",
  messagingSenderId: "55930476161"
};

firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth();

export async function getUser(userId) {
  return (await database.ref(`users/${userId}`).once("value")).toJSON();
}

export async function writeUserData(userId, name, profilePic) {
  return await firebase
    .database()
    .ref(`users/${userId}`)
    .set({
      userId,
      name,
      profilePic
    });
}

export async function getOrCreateAnonymousUser() {
  const anonymous = (await auth.signInAnonymously()).user;

  let dbUser = await getUser(anonymous.uid);

  if (!dbUser) {
    await writeUserData(anonymous.uid, "", "");
    dbUser = await getUser(anonymous.uid);
  }

  return dbUser;
}
