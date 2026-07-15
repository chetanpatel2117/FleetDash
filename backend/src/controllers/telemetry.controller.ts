import type { Request, Response } from "express";
import { processTelemetry } from "../services/telemetry.service";
import { getVehicleHistory } from "../services/telemetryStorage.service";

export const receiveTelemetry = async (req: Request, res: Response) => {
  try {
    const result = await processTelemetry(req.body);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getTelemetryHistory = async (req: Request, res: Response) => {
  try {
    const vehicleId = req.params.vehicleId;
    const safeVehicleId = typeof vehicleId === "string" ? vehicleId : "";

    if (!safeVehicleId) {
      return res.status(400).json({
        success: false,
        message: "Vehicle ID is required",
      });
    }

    const asString = (value: unknown): string | undefined => {
      if (Array.isArray(value)) {
        return value[0] ? String(value[0]) : undefined;
      }

      return typeof value === "string" ? value : undefined;
    };

    const fromValue = asString(req.query.from);
    const toValue = asString(req.query.to);
    const limitValue = req.query.limit ? Number(asString(req.query.limit) ?? 0) : undefined;

    const history = await getVehicleHistory(safeVehicleId, {
      ...(fromValue !== undefined ? { from: fromValue } : {}),
      ...(toValue !== undefined ? { to: toValue } : {}),
      ...(limitValue !== undefined ? { limit: limitValue } : {}),
    });

    return res.status(200).json({
      success: true,
      message: "Telemetry history retrieved successfully",
      data: history,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
