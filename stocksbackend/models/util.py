from requests import get

IEX_TOKEN = 'Tpk_a5ae5c9f9306428dae5890154a5ed7f8'
IEX_BATCH_URL = 'https://sandbox.iexapis.com/stable/stock/market/batch'


def get_many_info_by_ticker(tickers):
    symbols = ','.join(tickers)
    url = f'{IEX_BATCH_URL}?symbols={symbols}&types=quote,chart&range=1m&token={IEX_TOKEN}'
    response = get(url)
    if response.status_code == 200:
        return response.json()
    elif response.status_code == 404:
        raise Exception('ticker not found')
    else:
        raise Exception('unknown error fetching ticker from IEX api')


def get_one_info_by_ticker(ticker):
    stock_info = get_many_info_by_ticker([ ticker ])
    return stock_info[ticker]
