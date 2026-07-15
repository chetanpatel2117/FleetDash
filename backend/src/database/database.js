
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnectionStatus = exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/fleetdash";
let isConnected = false;
const connectDatabase = async () => {
    if (isConnected) {
        return;
    }
    try {
        await mongoose_1.default.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        isConnected = true;
        console.log("✅ MongoDB connected");
    }
    catch (error) {
        console.error("❌ MongoDB connection failed", error);
        throw error;
    }
};
exports.connectDatabase = connectDatabase;
const getConnectionStatus = () => mongoose_1.default.connection.readyState;
exports.getConnectionStatus = getConnectionStatus;