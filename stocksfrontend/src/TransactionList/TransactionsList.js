import React, { useState, useEffect } from 'react';

import TransactionItem from './TransactionItem';

const TransactionsList = (props) => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => { fetchTransactions() }, []);

  async function fetchTransactions() {
    const response = await fetch(`/api/dashboard/transactions`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 401)
      props.history.push('/signin');

    const data = await response.json();
    setTransactions(data.transactions);
  };

  const transactionItems = transactions.map(tx => <TransactionItem key={tx._id} transaction={tx} />);

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