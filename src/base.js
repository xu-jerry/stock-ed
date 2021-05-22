import { initializeApp } from "firebase/app";
import { doc, setDoc, getFirestore } from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  onAuthStateChanged, signOut} from "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyBsv-j022oT9Zp7LKo_3YzyjmXZDdGh6Xk",
  authDomain: "stocked-8d0a4.firebaseapp.com",
  databaseURL: "https://stocked-8d0a4-default-rtdb.firebaseio.com",
  projectId: "stocked-8d0a4",
  storageBucket: "stocked-8d0a4.appspot.com",
  messagingSenderId: "853171556142",
  appId: "1:853171556142:web:b43b2cb8fe550ca17c34bf",
  measurementId: "G-HF4SLSN9HY"
});

const db = getFirestore();
const auth = getAuth();

/* Make a new user with provided username and password 
 * TODO: Handle the error, (change this method to async and handle that in Login)
*/
export function createUser(username, password) {
  createUserWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      setDoc(doc(db, "Users", user.uid), {
        name: username,
        password: password,
      });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error);
    });
}

/* Return true if the user successfully signed in, 
 * return false otherwise
 */
export async function signIn(username, password) {
  try {
    await signInWithEmailAndPassword(auth, username, password);
    return true;
  } catch(e) {
    return false;
  }
}

export function logOut(afterSignout) {
  return new Promise((resolve, reject) => {
    signOut(auth).then(() => {
      resolve(true);
    }).catch((err) => {
      resolve(false);
    });
  });
}

/*
 * Check if the user is signed in
 * Return null if user is not signed and the uid if the user is signed in.
 */
export function checkLoginStatus() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, function(user) {
      if (user) {
        resolve(user.uid);
      } else {
        resolve(null);
      }
    })
  });
}

/* You should still ask for the uid by running checkLoginStatus 
 * before to make sure they're logged in before showing the stock data
 * for the getUserStockData and getLeaderboardData
 */

export async function getUserStockData(uid) {

}

export async function getLeaderboardData(uid) {

}