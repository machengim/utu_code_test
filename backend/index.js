const express = require('express');
const pgp = require('pg-promise')();
const app = express();
const port = 3000;
const db = pgp('postgres://utu:abcd1234@localhost:5432/bitcoin');

app.get('/', (req, res) => {
    let sql = `SELECT c1.* FROM coin AS c1 INNER JOIN 
        ( SELECT currency, max(date) AS latest_date from coin group by currency ) AS c2
        ON c1.currency = c2.currency AND c1.date = c2.latest_date`;

    let currency_list = [];
    db.any(sql)
        .then(async data => {
            for (let row of data) {
                await process_one_currency(row);
                delete row['id'];
                currency_list.push(row);
            }

            res.send(currency_list);
        })
        .catch(err => console.error(err));
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

async function process_one_currency(row) {
    let days_interval = [1, 7, 30];

    for (let interval of days_interval) {
        await get_changed_rate2(interval, row);
    }
}

async function get_changed_rate2(interval, row) {
    let data = await db.one("SELECT close FROM coin WHERE currency = $1 AND $2 - date = $3",
        [row.currency, row.date, interval]);

    if (data) {
        let changed_rate = (row.close - data.close) / data.close;

        switch (interval) {
            case 1:
                row["change_day"] = changed_rate; break;
            case 7:
                row["change_week"] = changed_rate; break;
            default:
                row["change_month"] = changed_rate;
        }
    } else {
        console.log('error happened');
    }
}