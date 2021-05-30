import { initializeApp } from "firebase/app";
export default class UserData
{
  constructor (name, accountValue, stocks, cash, lastLoggedIn) {
    this.name = name;
    this.accountValue = accountValue;
    this.stocks = stocks;
    this.cash = cash;
    this.lastLoggedIn = lastLoggedIn;
  }
}
export function initializeFirebase ()
{
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
}