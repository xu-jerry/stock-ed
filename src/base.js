import { initializeApp } from "firebase/app";
import { doc, setDoc, getFirestore } from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  onAuthStateChanged, signOut} from "firebase/auth";
import axios from "axios";

initializeApp({
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

// Make a new user with provided username and password 
export async function createUser(username, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, username, password);
    const user = userCredential.user;
    setDoc(doc(db, "Users", user.uid), {
      name: username,
      accountValue: [100000],
      stocks: "",
      cash: 100000,
      lastLoggedIn: new Date.now()
    });
    return true;
  } catch(error) {
    return error.message;
  }
}


/* Return true if the user successfully signed in, 
 * return false otherwise
 */
export async function signIn(username, password) {
  try {
    await signInWithEmailAndPassword(auth, username, password);
    return true;
  } catch(error) {
    return error.message;
  }
}

export function logOut() {
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
  if (!uid) {
    return null;
  }
}

export async function setUserStockData(uid, userData) {
  if (!uid) {
    return false;
  }

  try {
    // Sync user's data on the database with updated version
    return true;
  } catch (e) {
    return false;
  }
}

export async function getLeaderboardData(uid) {
  if (!uid) {
    return null;
  }
}

/* Trade stock attemps to sell/buy a certain amount
 * of a stock specified by the ticker. If the user is 
 * not able to buy/sell the specified amount, then return 
 * false. Only valid tickers can reach the sell/buy menu
*/

export async function tradeStock(ticker, amount) {
  const uid = checkLoginStatus();
  // Tested using: userData = {cash: 100000.00, stocks: {AAPL: {amount: 2, currentValue: 250.56}}};
  let userData = getUserStockData(await uid);
  
  const currentValue = amount * (await axios.get("/stock", {params: {symbol: ticker}})).data.price.regularMarketPrice;
  /* Check that the user is logged in 
   * Also verify that the amount is a non-zero amount
   * (this should never happen)
   */
  if (!(await userData) || amount === 0) {
    return false;
  }

  if (amount < 0) {
    // Handle stock selling
    if (userData.stocks.hasOwnProperty(ticker) && userData.stocks[ticker].amount >= (-1 * amount)) {
      userData.cash -= currentValue;
      userData.stocks[ticker].amount += amount;
      userData.stocks[ticker].currentValue += currentValue;

      // Round stock value to the nearest penny
      userData.stocks[ticker].currentValue = parseFloat(userData.stocks[ticker].currentValue.toFixed(2));

      // Remove stock if all shares are sold
      if (userData.stocks[ticker].amount === 0) {
        delete userData.stocks[ticker];
      }
    } else {
      console.log("Not enough stocks");
      // Not enough stocks
      return false;
    }
  } else  {
    // Handle stock purchasing
    if (userData.cash >= currentValue) {
      if (userData.stocks.hasOwnProperty(ticker)) {
        userData.stocks[ticker].amount += amount;
        userData.stocks[ticker].currentValue += currentValue;
      } else {
        userData.stocks[ticker] = {
          amount: amount,
          currentValue: currentValue
        }
      }
      userData.cash -= currentValue;
    } else {
      // Not enough cash
      return false;
    }
    // Round stock value to the nearest penny
    userData.stocks[ticker].currentValue = parseFloat(userData.stocks[ticker].currentValue.toFixed(2));
  }

  // Round cash to the nearest penny
  userData.cash = parseFloat(userData.cash.toFixed(2));

  console.log(userData);
  return await setUserStockData(uid, userData);
}