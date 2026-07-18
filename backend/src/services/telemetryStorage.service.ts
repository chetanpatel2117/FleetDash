import { connectDatabase } from "../database/database";
import { TelemetryBucket, type TelemetryPoint } from "../database/telemetryBucket.model";
import type { TelemetryData } from "../interfaces/telemetry.interface";

export interface TelemetryHistoryItem {
  vehicleId: string;
  date: string;
  hour: number;
  locations: TelemetryPoint[];
}

export const saveTelemetry = async (data: TelemetryData): Promise<void> => {
  await connectDatabase();

  const date = new Date();
  const bucketDate = date.toISOString().slice(0, 10);
  const bucketHour = date.getUTCHours();

  const point: TelemetryPoint = {
    latitude: data.latitude,
    longitude: data.longitude,
    speed: data.speed,
    timestamp: date,
  };

  await TelemetryBucket.updateOne(
    {
      vehicleId: data.vehicleId,
      date: bucketDate,
      hour: bucketHour,
    },
    {
      $setOnInsert: {
        vehicleId: data.vehicleId,
        date: bucketDate,
        hour: bucketHour,
      },
      $push: {
        locations: {
          $each: [point],
          $slice: -1000,
        },
      },
    },
    { upsert: true }
  );
};

export const getVehicleHistory = async (
  vehicleId: string,
  options?: { from?: string; to?: string; limit?: number }
): Promise<TelemetryHistoryItem[]> => {
  await connectDatabase();

  const filters: Record<string, unknown> = { vehicleId };

  if (options?.from || options?.to) {
    filters.date = {} as Record<string, string>;

    if (options?.from) {
      (filters.date as Record<string, string>).$gte = options.from;
    }

    if (options?.to) {
      (filters.date as Record<string, string>).$lte = options.to;
    }
  }

  const query = TelemetryBucket.find(filters)
    .sort({ date: 1, hour: 1 })
    .lean();

  if (options?.limit) {
    query.limit(options.limit);
  }

  const buckets = await query;

  return buckets.map((bucket) => ({
    vehicleId: bucket.vehicleId,
    date: bucket.date,
    hour: bucket.hour,
    locations: bucket.locations,
  }));
};
