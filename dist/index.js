"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const env = process.env.NODE_ENV || 'dev';
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, `../.env.${env}`) });
const app_1 = __importDefault(require("./app"));
const PORT = Number(process.env.PORT) || 3000;
app_1.default.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT} (env=${env})`);
});
