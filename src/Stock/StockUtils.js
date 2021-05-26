export const isoToString = (date) => {
  const d = new Date(date)
  const parsed = d.toDateString().substring(4)
  const comma = parsed.substring(0,6) + ", " + parsed.substring(6)
  return comma
}

export const options = {
  plugins:{
    legend:{
      display:false
    },
    tooltip:{
      intersect: false,
      displayColors:false,
      callbacks: {
        label: function(context) {
            var price = context.element.parsed.y
            var label = "$"+price.toFixed(2);
            return label;
        },
        title: function(context){
          var date = context[0].label
          return date == "Now" ? isoToString(new Date()) : isoToString(date)
        }
      }
    }
    
  },
  scales:{
    x:{
      grid:{
        borderColor: 'rgb(0,0,0)',
        drawTicks: false,
        display: false,
      },  
      ticks:{
        display: false
      }
    },
    y:{ 
      ticks:{
        color: 'rgb(0,0,0)'
      },
      grid:{
        borderColor: 'rgb(0,0,0)',
        drawTicks: false,
        display: false,
        color: 'rgb(0,0,0)'
      }
    }
  }
};

export const getLabels = (stock, today) => {
  return stock.data.map(data => data.date.substring(0,10)).reverse().concat(today.data.map(data => "Now"))
}

export const getPrices = (stock, today) => {
  return stock.data.map(data => data.close).reverse().concat(today.data.map(data => data.price.regularMarketPrice.toFixed(2)))
}

export const getCurrentPrice = (today) => {
  return today.data.length == 0 ? 0 : Number.parseFloat(today.data.map(data => data.price.regularMarketPrice)[0]).toFixed(2)
}

export const getLongName = (today, symbol) => {
  return today.data.length == 0 ? symbol.toUpperCase() : (today.data.map(data => data.price.longName)[0])
}

