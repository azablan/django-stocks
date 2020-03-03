import React, { useState } from 'react';
import { XYPlot, XAxis, YAxis, LineSeries } from 'react-vis';
import '../../node_modules/react-vis/dist/style.css';

const BrokerForm = (props) => {
  const { funds, fetchPortfolio } = props;
  const [ ticker, setTicker ] = useState('');
  const [ type, setType ] = useState('buy');
  const [ amount, setAmount ] = useState(1);
  const [ orderStatus, setOrderStatus ] = useState({ success: true, message: '' });
  const [ stockPreview, setStockPreview ] = useState(null);

  const handleGetPrice = async (event) => {
    const response = await fetch(`/api/dashboard/stock/${ticker}`);
    const { stock } = await response.json();
    if (response.status === 200) {
      setStockPreview(stock);
      console.log(stock);
    } else {
      setOrderStatus({ success: false, message: `${ticker} not found` })
    }
  };

  const handleSubmitOrder = async (event) => {
    event.preventDefault();
    handleGetPrice();
    const order = { ticker, type, amount };
    const response = await fetch(`/api/dashboard/stocks`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });
    const status = await response.json();
    setOrderStatus(status);
    fetchPortfolio();
  };
  const handleTickerChange = (event) => setTicker(event.target.value.toUpperCase()); 
  const handleTypeChange = (event) => setType(event.target.value);
  const handleAmountChange = (event) => setAmount(Number(event.target.value));

  return <>
    <div className="ui container segment">
      <h2 className="ui dividing header">
        Broker
        <div className="sub header">
          {`Available Funds: $${funds.toFixed(2)}`}
        </div>
      </h2>
      <div className="ui horizontal segments">
        <div className="ui segment">
          <form className="ui form">
              <div className="field">
                <label>Ticker</label>
                <input type="text" value={ticker} onChange={handleTickerChange} placeholder="ticker" maxLength="5"/>
              </div>
              <div className="field">
                <div className="two fields">
                  <div className="field">
                    <label>Type</label>
                    <select value={type}  onChange={handleTypeChange}>
                      <option value="buy">BUY</option>
                      <option value="sell">SELL</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Amount</label>
                    <input type="number" value={amount} onChange={handleAmountChange} min="1" max="100" />
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="ui fluid button" onClick={handleGetPrice}>Get Price</div>
              </div>
              <div className="field">
                <button className="ui fluid teal button" onClick={handleSubmitOrder}>Submit Order</button>
              </div>
          </form>
        </div>
        <div className="ui segment">
          <PriceChart stock={stockPreview} />
        </div>
      </div>
      <OrderStatus orderStatus={orderStatus}/>
    </div>
  </>
};

const OrderStatus = (props) => {
  const { success, message } = props.orderStatus;
  const symbol = success ? 'check' : 'exclamation';
  const style = success ? 'success' : 'error';

  if (!message)
    return null;

  return <>
    <div className={`ui bottom attached message ${style}`}>
      <i className={`icon ${symbol}`}></i>
      {message}
    </div>
  </>
};

const PriceChart = (props) => {
  const defaultStock = {
    quote: {
      previousClose: 0,
      companyName: ''
    },
    chart: []
  }
  const stock = props.stock || defaultStock;
  const { quote, chart } = stock;
  const data = chart.map(point => ({ x: new Date(point.date), y: point.close }))

  return <>
    {
      quote.companyName ?
      <h3 className="ui dividing header">
        {quote.companyName}
        <div className="sub header">
          {`$${quote.previousClose.toFixed(2)}`}
        </div>
      </h3>
      :
      null
    }
    <XYPlot xType="time" width={800} height={300}>
      <LineSeries className="first-series" data={data} />
      <XAxis tickTotal={4} />
      <YAxis />
    </XYPlot>
  </>;
};

export default BrokerForm;
