import http from "http";
import app from "./src/app.js";
import { initSocket } from "./src/socket/index.js";
import { env } from "./src/config/env.js";
import logger from "./src/loggers/logger.js";

const httpServer = http.createServer(app);

initSocket(httpServer);

httpServer.listen(env.PORT, () => {
  logger.info(`Server listening on port ${env.PORT} [${env.NODE_ENV}]`);
});