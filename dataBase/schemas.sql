CREATE TYPE reminder_type_enum AS ENUM(
    'normal',
    'hour',
    'day',
    'week',
    'month',
    'year'
);

CREATE TABLE task (
    id SERIAL PRIMARY KEY,
    title VARCHAR(32),
    description VARCHAR(255),
    reminder_type reminder_type_enum NOT NULL DEFAULT 'normal',
    reminder_day TINYINT,
    reminder_hour TINYINT,
);