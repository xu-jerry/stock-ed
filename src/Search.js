import React, { Component } from "react";
import Stock from './searchcomponents/stock'
import axios from "axios";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      stocks: [],
      loading: false,
      page: 0,
      prevY: 0
    };
  }

  //get stocks from the backend of page {page} and load it to the stocks array
  getStocks(page) {
    this.setState({loading: true});
    axios.get(/*backend page to get stocks?*/).then(res=> {
      this.setState({
        stocks: [...this.state.stocks, ...res.data],
        loading: false,
      });
    });
  }

  
  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      const lastStock = this.state.stocks[this.state.stocks.length - 1];
      const curPage = lastStock.stockId;
      this.getStocks(curPage);
      this.setState({ page: curPage });
    }
    this.setState({ prevY: y });
  }

  componentDidMount() {
    //first call to get stocks
    this.getStocks(this.state.page);
    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    };

    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);
  }

  render() {
    return (
      <div className = "stock-list">
        {this.state.stocks.map(stock => (<Stock name = {stock.name} price = {stock.price} change = {stock.change}> </Stock>))}
      </div>
    );
  }

}


export default Search;
