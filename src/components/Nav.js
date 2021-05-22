import React from 'react';
import { useHistory } from "react-router-dom";
import jscookie from "js-cookie";
  
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

  // Remove user cookie and redirect user to the login page
  const logout = () => {
    jscookie.remove("user");
    props.logoutUser();
    handleLoginClick();
  }

  return (
    <div className="header">
        <h1 className="title">Stock<span className="blue">Ed</span></h1>
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