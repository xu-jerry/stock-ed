import React from 'react';
import { useHistory } from "react-router-dom";
import {logOut} from "./../base";

const Navbar = (props) => {
  const history = useHistory();

  const handleHomeClick = () => {
    history.push("/home");
  }
  const handleLoginClick = () => {
    history.push("/login");
  }
  const handleStockClick = () => {
    history.push("/Stock/:id");
  }
  const handleLeaderboardClick = () => {
    history.push("/leaderboard");
  }
  const handleAboutClick = () => {
    history.push("/about");
  }
  const handleSearchClick = () => {
    history.push("/search");
  }

  // Log user out and redirect to the login page
  const logout = async () => {
    if (await logOut) {
      props.logoutUser();
      handleLoginClick();
    }
  }

  return (
    <div className="header">
        <h1 className="title" onClick={() => handleHomeClick()}>Stock<span className="blue">Ed</span></h1>
        <div className="center">
          <button className="button" onClick={() => handleHomeClick()}>Home</button>
          {/*<button className="button" onClick={() => handleStockClick()}>Stock</button>*/}
          <button className="button" onClick={() => handleLeaderboardClick()}>Leaderboard</button>
          <button className="button" onClick={() => handleAboutClick()}>About</button>
          <button className="button" onClick={() => handleSearchClick()}>Search</button>
          <button className="button" onClick={() => props.loggedIn ? logout() : handleLoginClick()}>{props.loggedIn ? "Signout" : "Login"}</button>
        </div>
    </div>
  );
};
  
export default Navbar;