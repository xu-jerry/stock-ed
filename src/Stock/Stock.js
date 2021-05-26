import React, {useCallback} from 'react';
import styled from 'styled-components'

import useStockData from './UseStockData'
import Graph from './Graph'
import { getCurrentPrice, getLongName } from './StockUtils'
import NotFound from '../NotFound';
import TransactionBar from './TransactionBar';

const BigContainer = styled.div`
  margin-left: 8vw;
  margin-right:8vw;
  display: flex;
  flex-direction: row;
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
const IntervalSelect = styled.button`
  font-family: Capsule Sans Text,-apple-system,BlinkMacSystemFont,sans-serif;
  font-size: 25px;
  padding: 10px;
  font-color: grey;
`
const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`
const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
`
const IntervalBox = styled.div`
  display: flexbox;
  flex-direction: row;
`

const DATE_RANGES = {
  '1M': 1,
  '3M': 3,
  '6M': 6,
  '1Y': 12,
  '5Y': 60
}

function Stock(props) {

  const symbol = props.match.params.symbol

  const [stock, today, updateDateRange, isValidTicker] = useStockData(symbol)

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
        <IntervalBox>
          {Object.keys(DATE_RANGES).map(range => (
            <IntervalSelect key ={range} onClick={()=>intervalClicked(DATE_RANGES[range])}>{range}</IntervalSelect>
          ))}
        </IntervalBox>
        <Graph stock={stock} today={today} />
      </LeftColumn>
      <RightColumn>
        <TransactionBar></TransactionBar>
      </RightColumn>
    </BigContainer>
    );
  }

  export default Stock;

  

  