import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import cors from "cors";
import bodyParser from "body-parser";
import "./interfaces/controllers/UserController";
import { initializeContainer } from "./infrastructure/shared/di/container";

async function bootstrap() {
    try {
        const container = await initializeContainer();
        
        const server = new InversifyExpressServer(container);

        server.setConfig((app) => {
            app.use(cors());
            app.use(bodyParser.json());
        });

        const app = server.build();
        app.listen(3000, () => {
            console.log("Server running on port 3000");
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
}

bootstrap();
