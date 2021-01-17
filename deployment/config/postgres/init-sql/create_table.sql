CREATE TABLE coin (
    id SERIAL PRIMARY KEY,
    currency VARCHAR(32) NOT NULL,
    date date NOT NULL,
    open VARCHAR(32) NOT NULL,
    high VARCHAR(32) NOT NULL,
    low VARCHAR(32) NOT NULL,
    close VARCHAR(32) NOT NULL,
    volume VARCHAR(32) NOT NULL,
    cap VARCHAR(32) NOT NULL
);

COPY coin(currency, date, open, high, low, close, volume, cap) 
FROM '/home/csv/crypto_historical_data.csv'
DELIMITER ','
CSV HEADER;

ALTER TABLE coin
    ALTER COLUMN open TYPE real 
    USING regexp_replace(open, ',', '','g') :: numeric,

    ALTER COLUMN close TYPE real 
    USING regexp_replace(close, ',', '','g') :: numeric,

    ALTER COLUMN high TYPE real 
    USING regexp_replace(high, ',', '','g') :: numeric,

    ALTER COLUMN low TYPE real 
    USING regexp_replace(low, ',', '','g') :: numeric,

    ALTER COLUMN volume TYPE bigint 
    USING regexp_replace(volume, ',', '','g') :: numeric,

    ALTER COLUMN cap TYPE bigint 
    USING regexp_replace(cap, ',', '','g') :: numeric;