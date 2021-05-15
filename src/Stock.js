import axios from 'axios';
import React, { useState , useEffect, useCallback} from 'react';
import { Line } from 'react-chartjs-2'; 
import styled from 'styled-components'

const BigContainer = styled.div`
  margin-left: 20vw;
  margin-right: 20vw;
  display: flex;
  flex-direction: column;
`
const GraphContainer = styled.div`
  width:800px;
  height:400px;
  background-color: white;
  display: flex;
`
const Title = styled.div`
  font-family: Capsule Sans Text,-apple-system,BlinkMacSystemFont,sans-serif;
  font-size: 80px;
  padding: 10px;
`
const TitleTwo = styled.div`
  font-family: Capsule Sans Text,-apple-system,BlinkMacSystemFont,sans-serif;
  font-size: 60px;
  padding: 10px;
  color: grey;
`
const IntervalSelect = styled.button`
  font-family: Capsule Sans Text,-apple-system,BlinkMacSystemFont,sans-serif;
  font-size: 25px;
  padding: 10px;
  font-color: grey;
`
var current = new Date()
function Stock(props) {
  var lastAtFirst = new Date()
  lastAtFirst.setMonth(current.getMonth() - 3)
  if (lastAtFirst.getMonth() == current.getMonth()) lastAtFirst.setDate(0);

  //console.log(current.toLocaleDateString())
 // console.log(last.toLocaleDateString())
  const [stock, setStock] = useState({data: []})
  const [today, setToday] = useState({data: []})
  const [last, setLast] = useState(lastAtFirst)
  const [count, setCount] = useState(0)
  const symbol = props.match.params.symbol
  


  function setThings(response){
    setToday({data: [response.first]})
    setStock(response.second)  
  }
  useEffect(() => {
    async function fetchData() {
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
      setThings({first: currData.data, second: stockData})
      
    }
    fetchData();
  },[last]); 
 
  function currentPrice() {
    return today.data.length == 0 ? 0 : Number.parseFloat(today.data.map(data => data.price.regularMarketPrice)[0]).toFixed(2)
  }
  function intervalClicked(arg){
    var newLast = new Date();
    newLast.setMonth(current.getMonth() - arg);
    if (newLast.getMonth() == current.getMonth()) newLast.setDate(0);
    setLast(newLast);
    //fetchData().then(response => setThings(response))
  }
  function longName(){
    return today.data.length == 0 ? symbol.toUpperCase() : (today.data.map(data => data.price.longName)[0])
  }
  function isoToString(date){
    const d = new Date(date)
    const parsed = d.toDateString().substring(4)
    const comma = parsed.substring(0,6) + ", " + parsed.substring(6)
    return comma
  } 


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
        intersect: false,
        displayColors:false,
        callbacks: {
          label: function(context) {
              var price = context.element.parsed.y
              var label = "$"+price.toFixed(2);
              return label;
          },
          title: function(context){
            var date = context[0].label
            return date == "Now" ? isoToString(new Date()) : isoToString(date)
          }
        }
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
  return (
    <BigContainer>
      <Title>{longName()}</Title>
      <TitleTwo>${currentPrice()}</TitleTwo>
      <IntervalSelect onClick={()=>intervalClicked(1)}>1M</IntervalSelect>
      <IntervalSelect onClick={()=>intervalClicked(3)}>3M</IntervalSelect>
      <IntervalSelect onClick={()=>intervalClicked(6)}>6M</IntervalSelect>
      <IntervalSelect onClick={()=>intervalClicked(12)}>1Y</IntervalSelect>
      <IntervalSelect onClick={()=>intervalClicked(60)}>5Y</IntervalSelect>


      <GraphContainer>
        <Line data={data} options={options} />
      </GraphContainer>
    </BigContainer>
    );
  }
  export default Stock;

  