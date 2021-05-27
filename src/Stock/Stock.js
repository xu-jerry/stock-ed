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
  font-family: Capsule Sans Text,-apple-system,BlinkMacSystemFont,sans-serif;
  font-size: 50px;
  padding: 10px;
`
const TitleTwo = styled.div`
  font-family: Capsule Sans Text,-apple-system,BlinkMacSystemFont,sans-serif;
  font-size: 30px;
  padding: 10px;
  color: grey;
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

  const symbol = props.match.params.symbol

  const [stock, today, dateRange, updateDateRange, isValidTicker] = useStockData(symbol)

  const intervalClicked = useCallback((arg) => {
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
        <Graph stock={stock} today={today} />
      </LeftColumn>
      <RightColumn>
        <TransactionBar symbol = {symbol} price = {getCurrentPrice(today)}></TransactionBar>
      </RightColumn>
    </BigContainer>
    );
  }

  export default Stock;

  

  