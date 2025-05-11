import sql from 'mssql';

const dbSettings = {
    user: "sa",
    password: "Alex1122",
    server: "localhost", 
    database: "STDev",
    options: {
        encrypt: false, // Use this if you're on Windows Azure o false ya que no esta desplegado 
        trustServerCertificate: true, // Change to true for local dev / self-signed certs
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