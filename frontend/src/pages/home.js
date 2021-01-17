import React, {useState} from 'react';

//const BaseUrl = 'http://localhost:8000/';
const BaseUrl = 'http://34.116.100.202/api/';

export default function App() {
    return (
        <div>
            <h1>Cryptocurrency</h1>
            <table>
                <tbody>
                    <tr>
                        <td>coin</td>
                        <td>price</td>
                        <td>1 day</td>
                        <td>1 week</td>
                        <td>1 month</td>
                        <td>volume</td>
                        <td>market cap</td>
                    </tr>
                    <CurrencyList/>
                </tbody>
            </table>
        </div>
    );
}

function CurrencyList() {
    const [currencies, setCurrencies] = useState([]);
    useState(() => fetch_currency_list());

    function fetch_currency_list() {
        fetch(BaseUrl)
            .then(res => {
                if (res.ok) {
                    res.json()
                        .then(setCurrencies)
                        .catch(err => console.error(err));
                } else {
                    console.error('Error happened when fetching currencies');
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <>
            {currencies.map((c) => <CurrencyDetail key={c.currency} value={c} />)}
        </>
    );
}

function CurrencyDetail(props) {
    const item = props.value;

    return (
        <tr>
            <td>{item.currency}</td>
            <td>${item.close}</td>
            <td>{format_change(item.change_day)}</td>
            <td>{format_change(item.change_week)}</td>
            <td>{format_change(item.change_month)}</td>
            <td>${item.volume}</td>
            <td>${item.cap}</td>
        </tr>
    );
}

function format_change(num) {
    return (num * 100).toFixed(1) + '%';
}
