import { test } from '@playwright/test';
import { Client } from 'pg';

test('Write the content of all the tables in the database', async () => {
  const client = new Client({
    host: 'school-main-db.c1va2wi6vhre.eu-west-1.rds.amazonaws.com',
    port: 5432,
    database: 'viableone',
    user: 'qaendineers',
    password: '2S5eQDcw%FuZbvo22',
  });

  await client.connect();

  const tables = await client.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
  `);

  for (const row of tables.rows) {
    console.log(`\nContent of the table ${row.table_name}:`);
    const result = await client.query(`SELECT * FROM ${row.table_name}`);
    console.log(result.rows);
  }

  await client.end();
});