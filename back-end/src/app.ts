import express, { Request, Response, Express } from "express";
import morgan from "morgan";
import courseEnrollmentRoutes from "./api/v1/routes/courseEnrollmentRoutes";
import courseRoutes from "../src/api/v1/routes/co"


import courseRoutes from "./api/v1/routes/courseRoutes";
import setupSwagger from "./config/swagger";

const app: Express = express();

// Use morgan for HTTP request logging
app.use(morgan("combined"));
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
    res.json({message: "Server is healthy."})
})

// Routes handler for all courses
app.use("/api/v1/courses", courseRoutes);

// Route handler for course enrollment
app.use("/api/v1/registrations", courseEnrollmentRoutes);

setupSwagger(app);

export default app;
