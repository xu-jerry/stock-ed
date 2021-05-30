import './Leaderboard.css';
import { useState, useEffect } from 'react';
import {IoReload} from 'react-icons/io5';
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';
import {getLeaderboardData} from "../base";
import { formatNumbers } from '../baseUtils';

function Leaderboard(props) {
  const [tableBody, setTable] = useState([]);
  const [activeFilter, setFilter] = useState("");

  // Request data from the server and update the table
  async function requestLeaderBoardData() {
    let leaderBoardData = await getLeaderboardData();
    let tempTable = [];
    for (let i = 0; i < leaderBoardData.length; i++) {
      const current = leaderBoardData[i];
      let accountValueLen = current.accountValue.length;
      const todaysChange = accountValueLen > 1 ? current.accountValue[accountValueLen - 2] - current.accountValue[accountValueLen - 1]: 0;

      tempTable.push(<tr username={current.name} accountvalue={current.accountValue[accountValueLen - 1]} 
        todaychange={current.todayChange} overallchange={current.overallChange} key={current.name}>
        <th>{current.name}</th><th>{formatNumbers(current.accountValue[accountValueLen - 1])}</th><th>{todaysChange}</th><th>
        {((current.accountValue[accountValueLen - 1] - 100000) / 100000 * 100).toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2}) + "%"}</th></tr>);
    }
    return tempTable;
  }

  // Arrange rows based on current filter and the specified direction
  function filterTable(filterProp, isGreater, tableData) {
    /* Change the filter to be the filter + the opposite of the current direction
     * so that the next press of the same option will flip the filter direction
     */
    setFilter(filterProp + !isGreater);
    let temp = tableData;
    temp.sort((a, b) => {
      let aVal = a.props[filterProp];
      let bVal = b.props[filterProp];
      if (aVal < bVal) {
        return 1;
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
    requestLeaderBoardData().then(data => filterTable("accountvalue", true, data));
  }, []);

  return (
    <div className="page">
      <div className="greenBackground topSection">
      <h1>Leaderboard</h1>
      </div>
      <p>Here are the top stats for users of StockEd.</p>
      <table className="styledTable">
        <thead>
          <tr>
            <th className={(activeFilter === "usernametrue" || activeFilter === "usernamefalse") ? "activeFilter" : ""}>
              Username
              <button className="filter" onClick={() => 
                filterTable("username", activeFilter === "usernametrue", tableBody)}>
                {activeFilter === "usernametrue" ? <IoIosArrowUp/> : <IoIosArrowDown/>}</button>
            </th>
            <th className={(activeFilter === "accountvaluetrue" || activeFilter === "accountvaluefalse") ? "activeFilter" : ""}>
              Account Value
              <button className="filter" onClick={() => 
                filterTable("accountvalue", activeFilter !== "accountvaluefalse", tableBody)}>
                {activeFilter === "accountvaluefalse" ? <IoIosArrowUp/> : <IoIosArrowDown/>}</button>
            </th>
            <th className={(activeFilter === "todaychangetrue" || activeFilter === "todaychangefalse") ? "activeFilter" : ""}>
              Today's Change in Value
              <button className="filter" onClick={() => 
                filterTable("todaychange", activeFilter !== "todaychangefalse", tableBody)}>
                {activeFilter === "todaychangefalse" ? <IoIosArrowUp/> : <IoIosArrowDown/>}</button>
            </th>
            <th className={(activeFilter === "overallchangetrue" || activeFilter === "overallchangefalse") ? "activeFilter" : ""}>
              Overall Change in Value
              <button className="filter" onClick={() => 
                filterTable("overallchange", activeFilter !== "overallchangefalse", tableBody)}>
                {activeFilter === "overallchangefalse" ? <IoIosArrowUp/> : <IoIosArrowDown/>}</button>
              <button id="reload" onClick={() => requestLeaderBoardData().then(data => filterTable("accountvalue", true, data))}><IoReload/></button>
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