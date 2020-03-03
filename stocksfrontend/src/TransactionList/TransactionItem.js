import React from 'react';

const TransactionItem = (props) => {
  const { ticker, company, price, amount, type, timestamp } = props.transaction;
  const sign = type === 'buy' ? '-' : '+';
  const net = `${sign} $${(price * amount).toFixed(2)}`;
  const date = new Date(timestamp);
  return <>
    <tr>
      <td>
        <h4 className="ui header">
          {ticker}
          <div className="sub header">
            {company}
          </div>
        </h4>
      </td>
      <td>{type}</td>
      <td>{`$${price}`}</td>
      <td>{amount}</td>
      <td>{net}</td>
      <td>
        <div className="content">
        <div>
          {date.toDateString()}
          <div>
            {date.toTimeString()}
          </div>
        </div>
        </div>
      </td>
    </tr>
  </>
};

export default TransactionItem;