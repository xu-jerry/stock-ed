import React, {useState} from 'react';
import styled from 'styled-components'
import { checkLoginStatus, getUserStockData, tradeStock } from '../base';

const Mover = styled.button` 
    height: 50px;
    width: 200px;
    margin: 20px;
    font-size: 1.4em;
    padding: 1em;
    border-radius: 4px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    border: 0;
    line-height: 10px;
    background-color: #edf2fb;
`
const GenText = styled.h6`
    font-size: 1.4em;
    text-align: center;
    font-weight:normal;
    margin: 0px;

`

const ButtonCont = styled.div`
    padding-bottom: 20px;
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
    width: 25vw;
`
const TitleCont = styled.div`
    display: flex;
    background-color: #edf2fb;
    border-radius: 20px 20px 0px 0px;
    align-items: center;
    justify-content: center;
    height: 70px;
    width: 25vw;
`
const NumInput = styled.input`
    color: black;
    height: 30px;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
`
const TransactionCompleteContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const TransactionBar = (props) =>{
    const [shouldDropDown, setDropDown] = useState(-1)
    const [amount, setAmount] = useState(0)
    const [didTransactionComplete, setDidTransactionComplete] = useState(-1);
    const [userData, setUserData] = useState({});
    const handleClickMover = (a) =>{
        setDropDown(a);
        setDidTransactionComplete(-1);
        setAmount(-1);
    };

    const getUserData = async () => {
        setUserData(await getUserStockData(await checkLoginStatus()));
    }

    React.useEffect(() => {
        getUserData();
    }, []);

    const getMaxAmount = (buying) =>{
        buying = shouldDropDown == 1 ? true : false;
        if (buying) {
            return Math.floor(userData.cash / parseFloat(props.price));
        }
        else {
            return userData.stocks.hasOwnProperty(props.symbol) ? userData.stocks[props.symbol].amount : 0;
        }
    }
    const moveStock = (e) => {
        e.preventDefault()
        let buying = shouldDropDown == 1 ? true : false
        if (buying) {
            // tradeStock will return false if anything went wrong
            tradeStock(props.symbol, parseInt(amount));
        }
        else {
            tradeStock(props.symbol, -1 * parseInt(amount));
        }
        if (amount > 0)
            setDidTransactionComplete(shouldDropDown);
        setDropDown(-1);
    }
    const renderDropDown = () =>{
        return (
          <Form onSubmit={(event) => {moveStock(event)}}>
            <GenText>Amount of shares:
            </GenText>
            <NumInput type="number" min = "0" max = {getMaxAmount()} placeholder = "0" onChange={(event)=>setAmount(event.target.value)} />
            <input type="submit" value="Submit" />
          </Form>
        );
      }
    const renderSuccessText = () =>{
        return(
            <TransactionCompleteContainer>
                <GenText>Congrats, you successfully {didTransactionComplete == 1 ? "bought" : "sold"} {amount} share(s) of {props.symbol.toUpperCase()}!</GenText>
            </TransactionCompleteContainer>
          )
    }
    return(
    <ButtonCont>
        <TitleCont>
            <GenText>Make a Transaction</GenText>
        </TitleCont>
        <Mover onClick={()=>handleClickMover(1)}>Buy Stock</Mover>
        {shouldDropDown==1 ? renderDropDown() : null}
        <Mover onClick ={() => handleClickMover(0)}>Sell Stock</Mover>
        {shouldDropDown==0 ? renderDropDown() : null}

        {didTransactionComplete != -1 ? renderSuccessText() : null}
    </ButtonCont>
    )
}
export default TransactionBar;