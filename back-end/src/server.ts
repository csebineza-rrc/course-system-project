import app from "./app";
import { Server } from "http";

// Define the port which the server should listen
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) || 3000 : 3000;

// Start the server and log the message
const server: Server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default server;
