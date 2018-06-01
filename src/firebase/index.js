import { initializeApp, auth, database } from "firebase";
import { Observable, Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

const config = {
  apiKey: "AIzaSyDa8_azU5bB-I0jvf3nfGSQPi5CUA0HmZA",
  authDomain: "project-webapp-chat.firebaseapp.com",
  databaseURL: "https://project-webapp-chat.firebaseio.com",
  projectId: "project-webapp-chat",
  storageBucket: "project-webapp-chat.appspot.com",
  messagingSenderId: "55930476161"
};

const app = initializeApp(config);

const USERS_REF_NAME = "users";
const MESSAGES_REF_NAME = "messages";

export async function getUser(userId) {
  return (await database(app)
    .ref(`${USERS_REF_NAME}/${userId}`)
    .once("value")).toJSON();
}

export async function writeUserData(userId, name, profilePic) {
  await database(app)
    .ref(`${USERS_REF_NAME}/${userId}`)
    .set({
      id: userId,
      name,
      profilePic
    });
}

export async function getOrCreateAnonymousUser() {
  const anonymous = (await auth(app).signInAnonymously()).user;

  let dbUser = await getUser(anonymous.uid);

  if (!dbUser) {
    await writeUserData(anonymous.uid, "", "");
    dbUser = await getUser(anonymous.uid);
  }

  return dbUser;
}

const snapShotToJsonChildren = dataSnapshot => {
  const collection = [];
  dataSnapshot.forEach(childSnapshot => {
    collection.push(childSnapshot.toJSON());
  });
  return collection;
};

const observableFromDbRef = (ref, eventType, snapHotMapper) => {
  return new Observable(observer => {
    const callback = dataSnapshot => {
      observer.next(snapHotMapper(dataSnapshot));
    };

    // notify observer on value changes
    ref.on(eventType, callback);
    // return unsubscribe function
    return () => {
      ref.off(eventType, callback);
    };
  });
};

export function usersObservable() {
  return observableFromDbRef(
    database(app).ref(USERS_REF_NAME),
    "value",
    snapShotToJsonChildren
  );
}

const messageFromDataSnapshot = snapshot => {
  const message = snapshot.toJSON();
  return {
    key: snapshot.key,
    ...message
  };
};

export function messagesStream() {
  return observableFromDbRef(
    database(app)
      .ref(MESSAGES_REF_NAME)
      .orderByChild("timestamp")
      .limitToLast(50),
    "child_added",
    messageFromDataSnapshot
  );
}

export function pushMessage(message) {
  database(app)
    .ref(MESSAGES_REF_NAME)
    .push({
      ...message,
      timestamp: database.ServerValue.TIMESTAMP
    });
}
