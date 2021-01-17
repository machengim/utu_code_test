# utu_code_test

Demo URL:
http://34.116.100.202/

### Tech stacks

Front end: `React`

Back end: `Express`

Database: `Postgres`

Deployment: `Docker` and `Google Cloud`


### API design

Only one API is implemented in this demo: GET '/'.
The API returns a list of objects such as below:

```
{
    "currency":"tezos",
    "date":"2019-12-04T00:00:00.000Z",
    "open":1.29,
    "high":1.32,
    "low":1.25,
    "close":1.25,
    "volume":"46048752",
    "cap":"824588509",
    "change_day":-0.031007751937984523,
    "change_week":-0.007936507936507943,
    "change_month":0.4016564214926632
}
```

It contains 
+ the currency name
+ the latest date for this currency recorded in database
+ the open, close, high and low value on that day
+ the volume and market cap of that day
+ the change rate of its price from the previous day, week and month