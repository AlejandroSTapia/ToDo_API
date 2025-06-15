"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnection = getConnection;
const mssql_1 = __importDefault(require("mssql"));
async function getConnection() {
    const env = process.env.NODE_ENV || "dev";
    if (env === "production" && process.env.DB_CONNECTION_STRING) {
        // ✅ En producción, usa cadena de conexión directa
        try {
            const pool = await mssql_1.default.connect(process.env.DB_CONNECTION_STRING);
            console.log("Conectado a SQL en producción");
            return pool;
        }
        catch (error) {
            console.error("Error de conexión en producción:", error);
            throw error;
        }
    }
    else {
        // ✅ En desarrollo, usa los valores individuales
        const dbSettings = {
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            server: process.env.DB_SERVER,
            database: process.env.DB_DATABASE,
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
            const pool = await mssql_1.default.connect(dbSettings);
            return pool;
        }
        catch (error) {
            console.error("Error de conexión en dev:", error);
            throw error;
        }
    }
}
