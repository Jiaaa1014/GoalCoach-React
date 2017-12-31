import * as firebase from "firebase";
var config = {
  apiKey: "AIzaSyDC_HkcT5erCUgqIlDC3Hm9ux9W1_rcP2A",
  authDomain: "goalcoach-2fc75.firebaseapp.com",
  databaseURL: "https://goalcoach-2fc75.firebaseio.com",
  projectId: "goalcoach-2fc75",
  storageBucket: "goalcoach-2fc75.appspot.com",
  messagingSenderId: "1066661148686"
};

export const firebaseApp = firebase.initializeApp(config);
export const goalRef = firebase.database().ref("goals");
export const completeGoalRef = firebase.database().ref("completeGoals");
