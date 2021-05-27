import React from 'react';
import { Line } from 'react-chartjs-2'; 
import { options, getLabels, getPrices } from './StockUtils';
import styled from 'styled-components'

const GraphContainer = styled.div`
  width:700px;
  height:350px;
  background-color: white;
  display: flex;
`

const Graph = React.memo(({ isLoading, stock, today }) => {
  
   console.log(stock)
   console.log(today)
  const data = {
    labels: getLabels(stock, today),
    datasets: [
      {
        label: 'Stock Price',
        data:  getPrices(stock, today),
        fill: false,
        pointRadius: 1,
        backgroundColor: '#0A54FF',
        borderColor: '#0A54FF',
      },
    ],
  }

  return (

    <GraphContainer>
      {isLoading ? <h1>loading</h1> :<Line data={data} options={options} />}
    </GraphContainer>

  )
})

export default Graph;