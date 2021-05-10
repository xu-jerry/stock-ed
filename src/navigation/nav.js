import React from 'react';
import { useHistory } from "react-router-dom";
  
const Navbar = () => {
    const history = useHistory();

    const handleHomeClick = () => {
        history.push("/Home");
      }

  const handleLoginClick = () => {
    history.push("/Login");
  }
  const handleStockClick = () => {
    history.push("/Stock");
  }
  const handleLeaderboardClick = () => {
    history.push("/Leaderboard");
  }
  const handleAboutClick = () => {
    history.push("/About");
  }
  const handleSearchClick = () => {
    history.push("/Search");
  }

  return (
    <>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Gugi&display=swap" rel="stylesheet"></link>
      </head>
      <body>
        <h1>Stock<blue>Ed</blue></h1>
        <div class="center">
        <button class="button" onClick={() => handleHomeClick()}>Home</button>
        <button class="button" onClick={() => handleLoginClick()}>Login</button>
        <button class="button" onClick={() => handleLoginClick()}>Signup</button>
        <button class="button" onClick={() => handleStockClick()}>Stock</button>
        <button class="button" onClick={() => handleLeaderboardClick()}>Leaderboard</button>
        <button class="button" onClick={() => handleAboutClick()}>About</button>
        <button class="button" onClick={() => handleSearchClick()}>Search</button>
        </div>
      </body>
    </>
  );
};
  
export default Navbar;