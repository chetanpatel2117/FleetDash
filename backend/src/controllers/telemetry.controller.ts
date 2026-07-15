import { Request, Response } from "express";
import { processTelemetry } from "../services/telemetry.service";

export const receiveTelemetry = async (
  req: Request,
  res: Response
) => {
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