import React from 'react';
import { Line } from 'react-chartjs-2'; 
import { options, getLabels, getPrices } from './StockUtils';
import styled from 'styled-components'

const GraphContainer = styled.div`
  width:800px;
  height:400px;
  background-color: white;
  display: flex;
`

const Graph = React.memo(({ stock, today }) => {
  
  const data = {
    labels: getLabels(stock, today),
    datasets: [
      {
        label: 'Stock Price',
        data:  getPrices(stock, today),
        fill: false,
        pointRadius: 1,
        backgroundColor: 'rgb(32, 184, 6)',
        borderColor: 'rgb(32, 184, 6)',
      },
    ],
  }

  return (
    <GraphContainer>
      <Line data={data} options={options} />
    </GraphContainer>
  )
})

export default Graph;