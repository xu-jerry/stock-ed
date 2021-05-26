import React, {useState} from 'react';
import styled from 'styled-components'

const Mover = styled.button` 
height: 50px;
width: 200px;
margin: 20px;
font-size: 1.2em;
padding: 1em;
border-radius: 4px;
text-align: center;
cursor: pointer;
border: 0;
background-color: #f0f8ff;
`

const ButtonCont = styled.div`
display: flex;
flex-direction: column;
margin-top: 50px; 
border: 20px;
border-radius: 20px;
background-color: white;
border-width: 5px;
border-color: black;
box-shadow: rgb(0 0 0 / 25%) 0px 0px 4px;
justify-content: center;
align-items: center;
background-color: white;
`
const TitleCont = styled.div`
    display: flex;
    background-color: rgb(237, 241, 255);
    align-items: center;
    justify-content: center;
    height: 70px;
    width: 300px;
`
const NumInput = styled.input`
    color: black;
    height: 30px;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    
`
const TransactionBar = (props) =>{
    const [shouldDropDown, setDropDown] = useState(-1)
    const [transactionMade, setTransactionMade] = useState({})
    const [amount, setAmount] = useState(0)
    const handleClickMover = (a) =>{
        setDropDown(a);
    };
    const getMaxAmount = (buying) =>{
        if(buying){
            //return amount of liquid money/current stock price
            return 20;
        }
        else{
            //return amount of stock owned
            return 10;
        }
    }
    const moveStock = (e,buying) => {
        e.preventDefault()
        console.log(amount)
        if(buying){
        //implement api call to say we bough the stock!!
         }
        else{
          //implement api call saying we sold the stock!!
        }
        setDropDown(-1);
        setTransactionMade({buying: buying})
      }
    const renderDropDown = (buying) =>{
        return (
          <Form onSubmit={(event) => {moveStock(event, buying)}}>
            <h3>Amount of shares:
            </h3>
            <NumInput type="number" min = "0" max = {getMaxAmount(buying)} onChange={(event)=>setAmount(event.target.value)} />
            <input type="submit" value="Submit" />
          </Form>
        );
      }
    return(
    <ButtonCont>
        <TitleCont>
            <h3>Make a Transaction</h3>
        </TitleCont>
          <Mover onClick={()=>handleClickMover(1)}>Buy Stock</Mover>
          {shouldDropDown==1 ? renderDropDown(true) : null}
          <Mover onClick ={() => handleClickMover(0)}>Sell Stock</Mover>
          {shouldDropDown==0 ? renderDropDown(false) : null}
    </ButtonCont>
    )
}
export default TransactionBar;