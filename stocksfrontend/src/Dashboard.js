import React from 'react';
import { Route, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import Portfolio from './Portfolio/Portfolio';
import TransactionList from './TransactionList/TransactionsList';


const Dashboard = (props) => {
  const currentPath = props.location.pathname;
  const portfolioPath = '/dashboard/portfolio';
  const transactionsPath = '/dashboard/transactions';
  const portfolioClass = `item ${portfolioPath === currentPath ? 'active' : ''}`;
  const transactionsClass = `item ${transactionsPath === currentPath ? 'active': ''}`;

  const signout = () => {
    Cookies.remove('token', { path: '/' });
    props.history.push('/signin');
  };

  return <>
    <div className="ui secondary pointing menu">
      <Link className={portfolioClass} to={portfolioPath}>Portfolio</Link>
      <Link className={transactionsClass} to={transactionsPath}>Transactions</Link>
      <div className="right menu">
        <div className="ui item" onClick={signout}>
          Signout
        </div>
      </div>
    </div>
    <Route path="/dashboard/portfolio" component={Portfolio} />
    <Route path="/dashboard/transactions" component={TransactionList} /> 
  </>;
};

export default Dashboard;