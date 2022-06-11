CREATE DATABASE permikaz;

CREATE TABLE permikaz_data(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(225),
    last_name VARCHAR(225),
    email VARCHAR(225),
    phone_number VARCHAR(225),
    university VARCHAR(225),
    major VARCHAR(225),
    passport_number VARCHAR(225),
    study_year CHAR(1) NOT NULL,
    _id uuid DEFAULT uuid_generate_v4 ()
);