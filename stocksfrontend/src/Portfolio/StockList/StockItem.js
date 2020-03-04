import React from 'react';

const StockItem = (props) => {
  const { ticker, company, amount, info }  = props.stock;
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
      <td>
        <PriceTrend base={info.quote.previousClose} current={info.quote.latestPrice} />
      </td>
      <td>
        <h4 className="ui header">{amount}</h4>
      </td>
      <td>
        <h4 className="ui header">${(info.quote.latestPrice * amount).toFixed(2)}</h4>
      </td>
    </tr>
  </>;
};

const PriceTrend = (props) => {
  const { base, current } = props;
  const difference = (current - base).toFixed(2);
  const signedDifference = difference < 0 ? `${difference}` : `+${difference}`;
  const percentage = `(${(Math.abs(difference) / base).toFixed(3)}%)`; 
  const colorStyle = {
    color: difference < 0 ? 'red' : 'green'
  };

  return <>
    <h5 className="ui header">
      ${current.toFixed(2)}
      <div className="sub header" style={colorStyle}>
        {signedDifference} {percentage}
      </div>
    </h5>
  </>;
};

export default StockItem;