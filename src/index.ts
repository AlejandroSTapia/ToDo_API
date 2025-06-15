import dotenv from "dotenv";
import path from "path";

const env = process.env.NODE_ENV || 'dev';

if (env !== "production") {
  dotenv.config({ path: path.resolve(__dirname, `../.env.${env}`) });
}

import app from "./app";

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});

