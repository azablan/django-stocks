import React, { useState, useEffect } from 'react';

import StockList from './StockList/StockList';
import BrokerForm from './BrokerForm';

const Portfolio = (props) => {
  const [ stocks, setStocks ] = useState([]);
  const [ funds, setFunds ] = useState(0);

  useEffect(() => {fetchPortfolio()}, []);

  async function fetchPortfolio() {
    const response = await fetch('http://localhost:8000/api/portfolio', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('token')}`
      }
    });

    if (response.status === 401)
      props.history.push('/signin');

    const portfolio = await response.json();
    setStocks(portfolio.stocks);
    setFunds(portfolio.funds);
  };

  return <>
    <BrokerForm funds={funds} fetchPortfolio={fetchPortfolio} />
    <StockList stocks={stocks}/>
  </>;
};

export default Portfolio;