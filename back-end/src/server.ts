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

server.on("error", (error: NodeJS.ErrnoException) => {
    if (error.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use.`);
    } else if (error.code === "EACCES") {
        console.error(`Insufficient privileges to bind to port ${PORT}.`);
    } else {
        console.error("Error starting server:", error);
    }
    process.exit(1);
});
export default server;
