function About(props) {
    return (
      <div className="page">
        <div className="purpleBackground topSection">
        <h1>Our Mission</h1>
        </div>
        <p>We know that stocks can be daunting to get into, so we wanted to create an environment that could teach students who wanted to get into stocks. StockEd is a fun, interactive web app that helps users of all ages develop financial literacy by mimicking the fluctuations of the stock market and allowing users to simulate realistic experiences in the stock market without having to suffer the potential financial consequences!</p>
        <div className="greenBackground">
      	<h1>Tutorial</h1>
        </div>
        <p>To start, create an account or login if you have an existing one already. The search bar allows users to look up and analyze the fluctuations and prices of specific stocks. To buy a stock, head to the portfolio page and enter all the necessary information. Users can also compete with each other under the leaderboard page to determine who earns more money in a certain time period.</p>
        <div className="blueBackground">
        <h1>Credits</h1>
        </div>
        <p>Thank you to these people for contributing to this webapp:</p>
        <ul>
          <li>Jason Tay</li>
          <li>Kevin Wang</li>
          <li>Arpit Jalan</li>
          <li>James Guo</li>
          <li>Annie Wang</li>
          <li>Jerry Xu</li>
        </ul>
        <p>This was a project for Professor Eggert's CS35L class, spring 2021.</p>
        </div>
    );
  }
  export default About;
