import { type TelemetryPoint } from "../database/telemetryBucket.model";
import type { TelemetryData } from "../interfaces/telemetry.interface";
export interface TelemetryHistoryItem {
    vehicleId: string;
    date: string;
    hour: number;
    locations: TelemetryPoint[];
}
export declare const saveTelemetry: (data: TelemetryData) => Promise<void>;
export declare const getVehicleHistory: (vehicleId: string, options?: {
    from?: string;
    to?: string;
    limit?: number;
}) => Promise<TelemetryHistoryItem[]>;
//# sourceMappingURL=telemetryStorage.service.d.ts.map