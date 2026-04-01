import pkg from 'pg'
import dotenv from 'dotenv'

const { Pool } = pkg

dotenv.config()

const db = new Pool({
  connectionString: 'postgresql://postgres:tweet@localhost:5432/MSI',
});
 
  async function testConnection() {
    try {
      const client = await db.connect();
      console.log('Connected to PgAdmin database successfully !!!');
      client.release();
    } catch (err) {
      console.error('Error connecting to the database:', err.stack);
    }
  }
  
  testConnection();

export default db;
