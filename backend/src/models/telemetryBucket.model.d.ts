import { type Document } from "mongoose";
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
export declare const TelemetryBucket: import("mongoose").Model<TelemetryBucketDocument, {}, {}, {}, Document<unknown, {}, TelemetryBucketDocument, {}, import("mongoose").DefaultSchemaOptions> & TelemetryBucketDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, TelemetryBucketDocument>;
//# sourceMappingURL=telemetryBucket.model.d.ts.map