import React from "react";

function Scroll(props) {
    const [isBottom, setIsBottom] = React.useState(false);
    const [stocks, setStocks] = React.useState(props.symbols);
    const [displaystocks, setDisplayStocks] = React.useState([]);
    const [page, setPage] = React.useState(0);


    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

    React.useEffect(() => {
        if (isBottom) {
            setDisplayStocks(prevState => ({
                page: prevState.page + 1,
                stocksToDisplay: prevState.stocksToDisplay.concat(
                this.state.stocks.slice(
                (prevState.page + 1) * 30,
                (prevState.page + 1) * 30 + 30,
            ),
          ),
        }));
            setIsBottom(false);
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

        </div>
    );
}

export default Scroll;