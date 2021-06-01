import { initializeApp } from "firebase/app";

export default class UserData {
  constructor (name, accountValue, stocks, cash, usersTimestamp) {
    this.name = name;
    this.accountValue = accountValue;
    this.stocks = stocks;
    this.cash = cash;
    this.usersTimestamp = usersTimestamp;
  }
}

// Method to initialize firebase (should be done once in index.js)
export function initializeFirebase () {
  initializeApp({
    apiKey: process.env.REACT_APP_DB_API_KEY,
    authDomain: process.env.REACT_APP_DB_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DB_DATABASE_URL,
    projectId: process.env.REACT_APP_DB_PROJECT_ID,
    storageBucket: process.env.REACT_APP_DB_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_DB_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_DB_APP_ID,
    measurementId: process.env.REACT_APP_DB_MEASUREMENT_ID
  });
}

/* For displaying money (in usd) with the 
 * proper amount digits and commas to make it more readable
 */
export function formatNumbers(num) {
  return num.toLocaleString("en-US", {maximumFractionDigits: 2, style: "currency", currency: "USD"})
}