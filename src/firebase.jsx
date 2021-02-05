import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBwERc0HzhJgKnKz7vx2qqgaDpzCMUj7io",
  authDomain: "tfjsdemo-f5004.firebaseapp.com",
  databaseURL: "https://tfjsdemo-f5004.firebaseio.com",
  projectId: "tfjsdemo-f5004",
  storageBucket: "tfjsdemo-f5004.appspot.com",
  messagingSenderId: "441224543093",
  appId: "1:441224543093:web:283768471966a09a56f13c",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
