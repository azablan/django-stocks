import React, { useState, useEffect } from 'react';

import TransactionItem from './TransactionItem';

const TransactionsList = (props) => {
  const [ transactions, setTransactions ] = useState([]);
  useEffect(() => { fetchTransactions() }, []);

  async function fetchTransactions() {
    const response = await fetch(`http://localhost:8000/api/transactions`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('token')}`
      }
    });

    if (response.status === 401)
      props.history.push('/signin');

    const transactions = await response.json();
    setTransactions(transactions);
  };

  const transactionItems = transactions
    .sort((tx1, tx2) => new Date(tx2.timestamp) - new Date(tx1.timestamp))
    .map((tx, i) => <TransactionItem key={i} transaction={tx} />);

  return <>
    <div className="ui container segment">
      <h2 className="ui header">Transactions</h2>
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Type</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Net Funds</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactionItems}
        </tbody>
      </table>
    </div>
  </>;
};

export default TransactionsList;