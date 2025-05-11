import app from "./app";
import dotenv from "dotenv";
import path from "path";

const env = process.env.NODE_ENV || 'dev';
dotenv.config({ path: path.resolve(__dirname, `.env.${env}`) });

app.listen(3000);
console.log('Servidor iniciado en port 3000');
