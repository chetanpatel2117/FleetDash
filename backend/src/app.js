"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const health_routes_1 = __importDefault(require("./routes/health.routes"));
const telemetry_routes_1 = __importDefault(require("./routes/telemetry.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./config/swagger"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use("/", health_routes_1.default);
app.use("/", telemetry_routes_1.default);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
app.use(error_middleware_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map