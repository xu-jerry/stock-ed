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
    <div className="container">
        <h1>Stock<span className="blue">Ed</span></h1>
        <div className="center">
          <button className="button" onClick={() => handleHomeClick()}>Home</button>
          <button className="button" onClick={() => handleLoginClick()}>Login</button>
          <button className="button" onClick={() => handleLoginClick()}>Signup</button>
          <button className="button" onClick={() => handleStockClick()}>Stock</button>
          <button className="button" onClick={() => handleLeaderboardClick()}>Leaderboard</button>
          <button className="button" onClick={() => handleAboutClick()}>About</button>
          <button className="button" onClick={() => handleSearchClick()}>Search</button>
        </div>
    </div>
  );
};
  
export default Navbar;