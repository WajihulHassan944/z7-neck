import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './db/schema';

// Create a new PostgreSQL pool
const pool = new Pool({
  // Temporarily hardcoded connection string - replace with your PostgreSQL details
  connectionString: process.env.POSTGRES_URL || 'postgres://postgres:postgres@localhost:5432/postgres',
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false
});

// Create a Drizzle instance
export const db = drizzle(pool, { schema });

// Connect to the database
export async function connectToDatabase() {
  try {
    const client = await pool.connect();
    client.release();
    return { success: true };
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    return { success: false, error };
  }
}

// Check if the database is healthy
export async function healthCheck() {
  try {
    const client = await pool.connect();
    const res = await client.query('SELECT NOW()');
    client.release();
    return {
      success: true,
      timestamp: res.rows[0].now
    };
  } catch (error) {
    console.error('Database health check failed:', error);
    return {
      success: false,
      error
    };
  }
} 