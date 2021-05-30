import axios from "axios";
import React from "react";
import {useState} from 'react';
import Headline from './Headline';
import styled from 'styled-components';
import { Link } from "react-router-dom";
const NewsCont = styled.div`
  border-top-style: solid;
  border-color: #b6ccfe;
  max-width: 76vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 0px;
  margin-bottom: 100px;
`
const Title = styled.h2`
  font-size: 25px;
`
const Body = styled.div`
  font-size: 20px;
`
const StyledLink = styled(Link)`
  color: #0a25ff;
  text-decoration: none;
`
const Cont = styled.div`
  padding-left: 10vw;
`
function Home(props) {
    const [stockNews, setNews] = useState([]);
    React.useEffect(() => {
      axios.get('/stocknews')
        .then((response) => {
          setNews(response.data);
        });
    }, []);
    const showCorrectText = () => {
      if(props.loggedIn){
        return(
          <Body><StyledLink to = "/portfolio">Trade Stock</StyledLink> or <StyledLink to = "/search">learn more about a specific stock</StyledLink> to get started!</Body>
        )
      }
      return(
        <Body><StyledLink to = "/login">Login or Signup to get Started</StyledLink></Body>
      )
    }
    return (
      /*
      Show user stock fluctuation
      Stock fluctuation of main stock markets (NASDAQ)
      Show current amt of money you have 
      Show portfolio (link to page 4)
      Add tips and educational links if u suck
      */
      <Cont>
        <Title>Welcome to the best way to learn about stocks: StockEd.</Title>
        {showCorrectText()}
        <Title>News</Title>
        <NewsCont>
        {stockNews.map((item, index) => {
             return  <Headline key = {index} href = {item[1]} title = {item[0]}></Headline>
    
        })}
        </NewsCont>
      </Cont>
    );
  }
  export default Home;
