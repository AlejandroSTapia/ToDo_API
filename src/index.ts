import * as dotenv from "dotenv";

  dotenv.config({ 
    path: process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev"
  });


import app from "./app";

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});

