import { initializeApp } from "firebase/app";
import { onSnapshot, doc, setDoc, getFirestore, Timestamp, updateDoc } from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  onAuthStateChanged, signOut} from "firebase/auth";
import axios from "axios";
import React from "react";
import { last } from "cheerio/lib/api/traversing";

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
    await setDoc(doc(db, "Users", user.uid), {
      name: username,
      accountValue: [100000],
      stocks: "{}",
      cash: 100000,
      lastLoggedIn: Timestamp.now()
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
        getUserStockData(user.uid)
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



export async function setUserStockData(uid, userData) {
  if (!uid) {
    return false;
  }
  try {
    // Sync user's data on the database with updated version
    await updateDoc(doc(db, "Users", uid ), {
      cash: userData.cash,
      stocks: JSON.stringify(userData.stocks),
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
class UserData
{
  constructor (name, accountValue, stocks, cash, lastLoggedIn) {
    this.name = name;
    this.accountValue = accountValue;
    this.stocks = stocks;
    this.cash = cash;
    this.lastLoggedIn = lastLoggedIn;
  }
}
export async function getUserStockData(uid) {
  return new Promise((resolve, reject) => {
    if (true) {
      onSnapshot(doc(db, "Users", uid), (doc) => {
          const userData = new UserData(doc.data().name, doc.data().accountValue, 
                                  JSON.parse(doc.data().stocks), doc.data().cash, 
                                  doc.data().lastLoggedIn);
          resolve(userData);
      });
    }
    else {
      resolve(null);
    }
  
  });
}

/*export async function getLeaderboardData(uid) {
  return new Promise((resolve, reject) => {
    if (checkLoginStatus())
    {
        userdata = onSnapshot(doc(db, "Users", user.uid), (doc) => {
          console.log("Current data: ", doc.data().leaderboardData);
          resolve(doc.data().leaderboardData);
        });
        
    }
    else
    {
      resolve(null);
    }
  
  });
}
*/
/* Trade stock attemps to sell/buy a certain amount
 * of a stock specified by the ticker. If the user is 
 * not able to buy/sell the specified amount, then return 
 * false. Only valid tickers can reach the sell/buy menu
*/

export async function tradeStock(ticker, amount) {
  const uid = checkLoginStatus();
  // Tested using: userData = {cash: 100000.00, stocks: {AAPL: {amount: 2, currentValue: 250.56}}};
  const userData = await getUserStockData(await uid);
  const stockData = (await axios.get("/stock", {params: {symbol: ticker}})).data;
  const currentValue = amount * stockData.price.regularMarketPrice;
  /* Check that the user is logged in 
   * Also verify that the amount is a non-zero amount
   * (this should never happen)
   */
  if (!(userData) || amount === 0) {
    return false;
  }

  //console.log(userData);

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
          currentValue: currentValue,
          longName: stockData.price.longName
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

  return await setUserStockData(await uid, userData);
}