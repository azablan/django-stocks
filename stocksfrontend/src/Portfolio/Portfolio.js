import React, { useState, useEffect } from 'react';

import StockList from './StockList/StockList';
import BrokerForm from './BrokerForm';

const Portfolio = (props) => {
  const [ stocks, setStocks ] = useState([]);
  const [ profile, setProfile ] = useState({ 
    email: '',
    name: '',
    funds: 0
  });

  useEffect(() => {fetchPortfolio()}, []);

  async function fetchPortfolio() {
    const response = await fetch(`/api/dashboard/portfolio`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 401)
      props.history.push('/signin');

    const portfolio = await response.json();
    setStocks(portfolio.stocks);
    setProfile(portfolio.profile)
  };

  return <>
    <BrokerForm funds={profile.funds} fetchPortfolio={fetchPortfolio} />
    <StockList stocks={stocks}/>
  </>;
};

export default Portfolio;