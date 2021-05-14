import { getDefaultNormalizer } from '@testing-library/dom';
import axios from 'axios';
import React, { useState , useEffect} from 'react';
import { Line } from 'react-chartjs-2'; 
import styled from 'styled-components'

const GraphContainer = styled.div`
  width:800px;
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

var current = new Date()
var last = new Date()
last.setMonth(current.getMonth() - 3)
if (last.getMonth() == current.getMonth()) last.setDate(0);


function Stock(props) {
  console.log(current.toLocaleDateString())
  console.log(last.toLocaleDateString())
  const [stock, setStock] = useState({data: []})
  const [today, setToday] = useState({data: []})
  const [heights, setHeights] = useState([])
  const [dates, setDates] = useState([])
  const [loaded, isLoaded] = useState(true)
  const symbol = props.match.params.symbol
  useEffect(() => {
    async function fetchData(){
      const currData = await axios.get(`/stock`, {
        params:{
          symbol:symbol,
        }
      })
      const stockData = await axios.get(`/historical`, {
      params: {
        symbol: symbol,
        fromDate: last.toISOString().substring(0,10),
        toDate: current.toISOString().substring(0,10)
      }
      });
      setToday({data: [currData.data]})
      setStock(stockData)
      isLoaded(false)
    }
    fetchData()
    setHeights(stock.data.map(data => data.close).reverse().concat(today.data.map(data => data.price.regularMarketPrice)))
    setDates(stock.data.map(data => data.date.substring(0,10)).reverse().concat(today.data.map(data => "Now")))
  },[]); 

  console.log(heights)
  console.log(dates)
  const data = {
    labels: stock.data.map(data => data.date.substring(0,10)).reverse().concat(today.data.map(data => "Now")),
    datasets: [
      {
        label: 'Stock Price',
        data:  stock.data.map(data => data.close).reverse().concat(today.data.map(data => data.price.regularMarketPrice.toFixed(2))),
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
          borderColor: 'rgb(0,0,0)',
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
          display: false,
          color: 'rgb(0,0,0)'
        }
      }
    }
  };
  
  function currentPrice() {
    return today.data.length == 0 ? 0 : Number.parseFloat(today.data.map(data => data.price.regularMarketPrice)[0]).toFixed(2)
  }
  console.log(stock)
  console.log(today)
  return (
      <GraphContainer>
        <Title>{symbol.toUpperCase()}</Title>
        <Title>${currentPrice()}</Title>
         <Line data={data} options={options} />
      </GraphContainer>
    );
  }
  export default Stock;
