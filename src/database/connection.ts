import sql from 'mssql';
import dotenv from 'dotenv';

const dbSettings = {
    user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  server: process.env.DB_SERVER as string,
  database: process.env.DB_DATABASE as string,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_CERT === 'true',
  }
}

export const getConnection = async () => {
    try {
        const pool = await sql.connect(dbSettings);
        return pool
    } catch (error) {
        console.error('Database connection error:', error)
        throw error
    }
}
