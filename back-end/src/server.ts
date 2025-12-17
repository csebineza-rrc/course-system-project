import app from "./app";
import { Server } from "http";
import pino from "pino";

const logger = pino();

// Define the port which the server should listen
const PORT: string | number = process.env.PORT || 3000;

// Start the server and log the message
const server: Server = app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

export default server;
