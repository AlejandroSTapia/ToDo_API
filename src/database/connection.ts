import sql from "mssql";

export async function getConnection() {
  // 1. Al entrar en la función, ya sabemos que process.env tiene valores
  const dbSettings: sql.config = {
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    server: process.env.DB_SERVER!,       // <-- aquí debe haber un string
    database: process.env.DB_DATABASE!,
    options: {
      encrypt: process.env.DB_ENCRYPT === "true",
      trustServerCertificate: process.env.DB_TRUST_CERT === "true",
    },
  };

  // 2. Debug rápido para asegurarnos de que no vienen undefined:
  console.log("Conectando a SQL con:", {
    server: dbSettings.server,
    database: dbSettings.database,
    user: dbSettings.user,
  });

  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}
