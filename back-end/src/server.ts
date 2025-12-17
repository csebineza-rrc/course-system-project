import app from "./app";
import { Server } from "http";

// Define the port which the server should listen
const PORT: string | number = process.env.PORT || 3000;

// Start the server and log the message
const server: Server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default server;
