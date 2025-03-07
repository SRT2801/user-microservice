import "reflect-metadata";
import dotenv from "dotenv";

dotenv.config();

import { InversifyExpressServer } from "inversify-express-utils";
import cors from "cors";
import bodyParser from "body-parser";
import { initializeContainer } from "./infrastructure/inversify/di/container";
import { ENVIROMENTS } from "./infrastructure/enviroments/enviroments";


import "./infrastructure/http/controllers/UserController";
import "./infrastructure/http/controllers/AuthController";

async function bootstrap() {
  try {
   
    const container = await initializeContainer();
    const server = new InversifyExpressServer(container);

    server.setConfig((app) => {
      app.use(cors());
      app.use(bodyParser.json());
    });

    const port = ENVIROMENTS.SERVER_PORT || 3000;
    const app = server.build();

    app.listen(port, () => {
      console.log(`Servidor ejecutándose en el puerto ${port}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
}

bootstrap();
