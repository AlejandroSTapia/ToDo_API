"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnection = getConnection;
const mssql_1 = __importDefault(require("mssql"));
function getConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        // 1. Al entrar en la función, ya sabemos que process.env tiene valores
        const dbSettings = {
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            server: process.env.DB_SERVER, // <-- aquí debe haber un string
            database: process.env.DB_DATABASE,
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
            const pool = yield mssql_1.default.connect(dbSettings);
            return pool;
        }
        catch (error) {
            console.error("Database connection error:", error);
            throw error;
        }
    });
}
