import './Leaderboard.css';

function Leaderboard(props) {
  console.log(props);
  let rows = [];
  let data = [
    {id:45676543, username:"jason", accountValue: -1, todayChange: 30, overallChange: 20},
    {id:45676544, username:"jerry", accountValue: 3, todayChange: 20, overallChange: 21},
    {id:45676545, username:"arpit", accountValue: 2, todayChange: -30, overallChange: 22},
    {id:45676546, username:"kevin", accountValue: 500, todayChange: 50, overallChange: 8},
    {id:45676547, username:"james", accountValue: 1, todayChange: 20, overallChange: 3},
    {id:45676548, username:"annie", accountValue: 1, todayChange: -30, overallChange: 1}
  ]
  for (let i = 0; i < data.length; i++) {
    let current = data[i];
    rows.push(<tr key={current.id}><th>{current.username}</th><th>{current.accountValue}</th><th>{current.todayChange}</th><th>{current.overallChange}</th></tr>);
  }
  return (
    <div>
      <p>This is the Leaderboard page.</p>
      <table className="styledTable">
        <thead>
          <tr>
            <th>
              Username
              <button></button>
            </th>
            <th>
              Account Value
            </th>
            <th>
              Today's Change in Value
            </th>
            <th>
              Overall Change in Value
            </th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
}

async function getLeaderBoardData() {

}
export default Leaderboard;