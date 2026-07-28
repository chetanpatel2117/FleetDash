import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes";
import telemetryRoutes from "./routes/telemetry.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middleware/error.middleware";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/", healthRoutes);
app.use("/", authRoutes);
app.use("/", telemetryRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});
app.use(errorHandler);
export default app;
