import { Schema, model, type Document } from "mongoose";

export interface TelemetryPoint {
  latitude: number;
  longitude: number;
  speed: number;
  timestamp: Date;
}

export interface TelemetryBucketDocument extends Document {
  vehicleId: string;
  date: string;
  hour: number;
  locations: TelemetryPoint[];
  createdAt: Date;
  updatedAt: Date;
}

const telemetryPointSchema = new Schema<TelemetryPoint>(
  {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    speed: { type: Number, required: true },
    timestamp: { type: Date, required: true, default: Date.now },
  },
  { _id: false }
);

const telemetryBucketSchema = new Schema<TelemetryBucketDocument>(
  {
    vehicleId: { type: String, required: true, index: true },
    date: { type: String, required: true, index: true },
    hour: { type: Number, required: true, index: true },
    locations: { type: [telemetryPointSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

telemetryBucketSchema.index({ vehicleId: 1, date: 1, hour: 1 }, { unique: true });

export const TelemetryBucket = model<TelemetryBucketDocument>(
  "TelemetryBucket",
  telemetryBucketSchema
);
