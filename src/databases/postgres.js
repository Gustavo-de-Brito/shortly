import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Poll } = pg();

const databaseConfig = {
  connectionString: process.env.DATABASE_URL
}

const connection = new Poll(databaseConfig);

export default connection;