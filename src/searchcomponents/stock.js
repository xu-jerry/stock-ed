import React, { Component } from "react";

class Stock extends Component 
{
    constructor() {
        super(props);
        this.state({
            name: this.props.name,
            price: this.props.price,
            change: this.props.change,
        });
    }

    render() {
        return (
            <div className="stock"> {this.state.name + "      " + this.state.price + "       " + this.state.change}  </div>
        );
    }
}

export default Stock;