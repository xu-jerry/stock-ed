import React from "react";
import "./scroll.css";

function Scroll(props) {

    const [isBottom, setIsBottom] = React.useState(false);
    const [state, setDisplayStocks] = React.useState({
        page: 0,
        stocksToDisplay: props.stocks.slice(0, 30),
    });

    

    React.useEffect(() => {
        document.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

      const addItems = () => {
        setDisplayStocks(prevState => ({
            page: prevState.page + 1,
            stocksToDisplay: prevState.stocksToDisplay.concat(
                props.stocks.slice(
                (prevState.page + 1) * 30,
                (prevState.page + 1) * 30 + 30,
                ),
            ),
        }));
        setIsBottom(false);
    }

    React.useEffect(() => {
        if (isBottom) {
            addItems();
        }
    }, [isBottom]);



    function handleScroll() {
        const scrollTop = (document.documentElement
            && document.documentElement.scrollTop)
            || document.body.scrollTop;
        const scrollHeight = (document.documentElement
            && document.documentElement.scrollHeight)
            || document.body.scrollHeight;
        if (scrollTop + window.innerHeight + 50 >= scrollHeight){
            setIsBottom(true);
        }
    }

    //display each stock as a button to click? map()
    return(
        <div>
            <p> Popular Stocks </p>
            <ul style = {{ listStyleType: "none" }}> 
                {state.stocksToDisplay.map(item => (
                    <li key = {item} > 
                        <button className="stockButton" onClick = {/*Take the user to the stocks page*/ props.goToPage}> {item}  
                        </button>
                    </li>))}
            </ul>
            
          
        </div>
    );
}

export default Scroll;