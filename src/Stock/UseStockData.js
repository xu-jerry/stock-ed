import {useState, useEffect} from 'react';
import axios from 'axios';

const getGraphStartDate = (arg) => {
  const currDate = new Date;
  var initDate = new Date()
  initDate.setMonth(currDate.getMonth() - arg)
  if (initDate.getMonth() == currDate.getMonth()) initDate.setDate(0);
  return initDate
}

const useStockData = (symbol) => {
  const currDate = new Date;

  const [stock, setStock] = useState({data: []})
  const [today, setToday] = useState({data: []})
  const [dateRange, setDateRange] = useState(3)
  const [isValidTicker, setIsValidTicker] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    async function fetchData() {
      const currData = await axios.get(`/stock`, {
        params:{
          symbol,
        }
      })
      const stockData = await axios.get(`/historical`, {
        params: {
          symbol,
          fromDate: getGraphStartDate(dateRange).toISOString().substring(0,10),
          toDate: currDate.toISOString().substring(0,10)
        }
      });
      if(!currData.data){
          setIsValidTicker(false)
      }
      else{
        setIsLoading(false)
        setToday({data: [currData.data]})
        setStock(stockData)  
      }   
    }
    fetchData();
  }, [dateRange])

  return [stock, today, dateRange, setDateRange, isValidTicker, isLoading, setIsLoading]
}

export default useStockData;