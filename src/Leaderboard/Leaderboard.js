import './Leaderboard.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {IoReload} from 'react-icons/io5';
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';

function Leaderboard(props) {
  const [tableBody, setTable] = useState([]);
  const [activeFilter, setFilter] = useState("");

  // Request data from the server and update the table
  async function requestLeaderBoardData() {
    let leaderBoardData = (await axios.get(`/leaderboardData`)).data; 
    let tempTable = [];
    for (let i = 0; i < leaderBoardData.length; i++) {
      let current = leaderBoardData[i];
      tempTable.push(<tr username={current.username} accountvalue={current.accountValue} todaychange={current.todayChange} overallchange={current.overallChange}
        key={current.id}><th>{current.username}</th><th>{current.accountValue}</th><th>{current.todayChange}</th><th>{current.overallChange}</th></tr>);
    }
    return tempTable;
  }

  // Arrange rows based on current filter and the specified direction
  function filterTable(filterProp, isGreater) {
    /* Change the filter to be the filter + the opposite of the current direction
     * so that the next press of the same option will flip the filter direction
     */
    setFilter(filterProp + !isGreater);
    let temp = tableBody;
    temp.sort((a, b) => {
      let aVal = a.props[filterProp];
      let bVal = b.props[filterProp];
      if (aVal < bVal) {
        return 1
      } else if (aVal > bVal) {
        return -1;
      } else {
        return 0;
      }
    });

    // Reverse the sorted array if the filter is set in the opposite direction
    if (!isGreater) {
      temp.reverse();
    }
    setTable(temp);
  }

  useEffect(() => {
    // On page load, request data from the server and fill in the table
    requestLeaderBoardData()
    .then(data =>
      setTable(data)
    );
   }, [])

  return (
    <div className="page">
      <p>Here are the top stats for users of StockEd.</p>
      <table className="styledTable">
        <thead>
          <tr>
            <th className={(activeFilter === "usernametrue" || activeFilter === "usernamefalse") ? "activeFilter" : ""}>
              Username
              <button className="filter" onClick={() => 
                filterTable("username", activeFilter === "usernametrue")}>
                {activeFilter === "usernametrue" ? <IoIosArrowUp/> : <IoIosArrowDown/>}</button>
            </th>
            <th className={(activeFilter === "accountvaluetrue" || activeFilter === "accountvaluefalse") ? "activeFilter" : ""}>
              Account Value
              <button className="filter" onClick={() => 
                filterTable("accountvalue", activeFilter !== "accountvaluefalse")}>
                {activeFilter === "accountvaluefalse" ? <IoIosArrowUp/> : <IoIosArrowDown/>}</button>
            </th>
            <th className={(activeFilter === "todaychangetrue" || activeFilter === "todaychangefalse") ? "activeFilter" : ""}>
              Today's Change in Value
              <button className="filter" onClick={() => 
                filterTable("todaychange", activeFilter !== "todaychangefalse")}>
                {activeFilter === "todaychangefalse" ? <IoIosArrowUp/> : <IoIosArrowDown/>}</button>
            </th>
            <th className={(activeFilter === "overallchangetrue" || activeFilter === "overallchangefalse") ? "activeFilter" : ""}>
              Overall Change in Value
              <button className="filter" onClick={() => 
                filterTable("overallchange", activeFilter !== "overallchangefalse")}>
                {activeFilter === "overallchangefalse" ? <IoIosArrowUp/> : <IoIosArrowDown/>}</button>
              <button className="reload" onClick={() => requestLeaderBoardData().then(data => setTable(data))}><IoReload/></button>
            </th>
          </tr>
        </thead>
        <tbody>
          {tableBody}
        </tbody>
      </table>
    </div>
  );
}


export default Leaderboard;