import { Client } from 'pg';

const db = new Client({
  host: 'localhost',     // or your DB host
  port: 5432,            // default PostgreSQL port
  user: 'postgres', // replace with your DB username
  password: '123456',
  database: 'whatpeon',
});

db.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

export { db }
