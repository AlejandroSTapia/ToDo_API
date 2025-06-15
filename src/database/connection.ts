import sql from "mssql";

export async function getConnection() {
  const env = process.env.NODE_ENV || "dev";

  if (env === "production" && process.env.DB_CONNECTION_STRING) {
    // ✅ En producción, usa cadena de conexión directa
    try {
      const pool = await sql.connect(process.env.DB_CONNECTION_STRING);
      console.log("Conectado a SQL en producción");
      return pool;
    } catch (error) {
      console.error("Error de conexión en producción:", error);
      throw error;
    }
  } else {
    // ✅ En desarrollo, usa los valores individuales
    const dbSettings: sql.config = {
      user: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,
      server: process.env.DB_SERVER!,
      database: process.env.DB_DATABASE!,
      options: {
        encrypt: process.env.DB_ENCRYPT === "true",
        trustServerCertificate: process.env.DB_TRUST_CERT === "true",
      },
    };

    console.log("Conectando a SQL en dev con:", {
      server: dbSettings.server,
      database: dbSettings.database,
      user: dbSettings.user,
    });

    try {
      const pool = await sql.connect(dbSettings);
      return pool;
    } catch (error) {
      console.error("Error de conexión en dev:", error);
      throw error;
    }
  }
}
