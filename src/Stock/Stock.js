import React, {useCallback} from 'react';
import styled from 'styled-components'

import useStockData from './UseStockData'
import Graph from './Graph'
import { getCurrentPrice, getLongName } from './StockUtils'
import NotFound from '../NotFound';
import TransactionBar from './TransactionBar';
import IntervalSelector from './IntervalSelector';

const BigContainer = styled.div`
  margin-left: 8vw;
  margin-right:8vw;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

const Title = styled.div`
  padding-top: 10px;
  font-size: 55px;
`
const TitleTwo = styled.div`
  font-size: 30px;
  color: #0a54ff;
`

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`
const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
`

function Stock(props) {

  const symbol = props.match.params.symbol.toUpperCase()

  const [stock, today, dateRange, updateDateRange, isValidTicker, isLoading, setIsLoading] = useStockData(symbol)
  const intervalClicked = useCallback((arg) => {
    setIsLoading(true)
    updateDateRange(arg)
  })
  if(!isValidTicker){
    return(
      <NotFound></NotFound>
    )
  }
  return (
    <BigContainer>
      <LeftColumn>
        <Title>{getLongName(today, symbol)}</Title>
        <TitleTwo>${getCurrentPrice(today)}</TitleTwo>
        <IntervalSelector dateRange = {dateRange} intervalClicked = {intervalClicked}></IntervalSelector>
        <Graph isLoading = {isLoading} stock={stock} today={today} />
      </LeftColumn>
      <RightColumn>
        <TransactionBar symbol = {symbol} price = {getCurrentPrice(today)}></TransactionBar>
      </RightColumn>
    </BigContainer>
    );
  }

  export default Stock;

  

  