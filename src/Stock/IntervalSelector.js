import styled from 'styled-components'

const IntervalBox = styled.div`
  display: flexbox;
  flex-direction: row;
`
const IntervalSelect = styled.button`
  font-family: Capsule Sans Text,-apple-system,BlinkMacSystemFont,sans-serif;
  font-size: 25px;
  padding: 10px;
  background-color:white;
  border-top-style: none;
  border-right-style: none;
  border-bottom-style: none;  
  border-left-style: ${props => props.first ? 'none' : 'solid'};
  text-align: center;
  cursor : pointer;
  :after{
  };
`
const SelectIndicator = styled.div`
  background: #34a853;
  border-radius: 4px 4px 0 0;
  height: 8px;
  width: 40px;
  background-color: #0A54FF;
`
const DATE_RANGES = {
  '1M': 1,
  '3M': 3,
  '6M': 6,
  '1Y': 12,
  '5Y': 60
}
const IntervalSelector = (props) => {
    return(
        <IntervalBox>
            {Object.keys(DATE_RANGES).map(range => (
                <IntervalSelect key ={range} first = {range == '1M' ? true : false} onClick={()=>props.intervalClicked(DATE_RANGES[range])} >
                  {range}
                  {props.dateRange == DATE_RANGES[range] ? <SelectIndicator/> : null}
                </IntervalSelect>
              ))}
        </IntervalBox>
    )
}
export default IntervalSelector;