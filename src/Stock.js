import { getDefaultNormalizer } from '@testing-library/dom';
import axios from 'axios';
import React, { useState , useEffect} from 'react';
import { Line } from 'react-chartjs-2'; 
import styled from 'styled-components'

const GraphContainer = styled.div`
  width:500px;
  height:400px;
  margin-top:50px;
  background-color: white;
`
const Title = styled.text`
  font-family: Capsule Sans Text,-apple-system,BlinkMacSystemFont,sans-serif;
  font-size: 80px;
  margin : 10px;
  padding: 20px;
`

var d1 = new Date();

function Stock(props) {
  console.log(d1.toLocaleDateString())
  const [stock, setStock] = useState({data: []})
  const [heights, setHeights] = useState([])
  const [dates, setDates] = useState([])
  const [loaded, isLoaded] = useState(true)
  useEffect(() => {
    async function fetchData(){
      const stockData = await axios.get(`/historical`, {
      params: {
        symbol: "AAPL"
      }
      });
      setStock(stockData)
      isLoaded(false)
    }
    fetchData()
    setHeights(stock.data.map(data => data.close).reverse())
    setDates(stock.data.map(data => data.date.substring(0,10)).reverse())
  },[]); 
   // setHeights(stock.data.map(data => data.close).reverse())
  //setDates(stock.data.map(data => data.date.substring(0,10)).reverse())

  const data = {
    labels: stock.data.map(data => data.date.substring(0,10)).reverse(),
    datasets: [
      {
        label: 'Stock Price',
        data:  stock.data.map(data => data.close).reverse(),
        fill: false,
        pointRadius: 1,
        backgroundColor: 'rgb(32, 184, 6)',
        borderColor: 'rgb(32, 184, 6)',
      },
    ],
  };

  const options = {
    plugins:{
      legend:{
        display:false
      },
      tooltip:{
        intersect: false
      }
    },
    scales:{
      x:{
        grid:{
          drawTicks: false,
          display: false,
        },  
        ticks:{
          display: false
        }
      },
      y:{ 
        ticks:{
          color: 'rgb(0,0,0)'
        },
        grid:{
          borderColor: 'rgb(0,0,0)',
          drawTicks: false,
          color: 'rgb(0,0,0)'
        }
      }
    }
  };

  console.log(stock)
  console.log(heights)
  return (
      <GraphContainer>
        <Title>Apple</Title>
         <Line data={data} options={options} />
      </GraphContainer>
    );
  }

  export default Stock;
