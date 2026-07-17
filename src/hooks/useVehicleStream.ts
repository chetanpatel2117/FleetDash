import { useCallback, useEffect, useMemo, useState } from "react"
import { connectSocket, disconnectSocket, socket } from "../services/socket"
import type { VehicleTelemetry } from "../types/vehicle"

export type ConnectionStatus = "connected" | "connecting" | "disconnected" | "error"

export function useVehicleStream() {
  const [status, setStatus] = useState<ConnectionStatus>("disconnected")
  const [vehicles, setVehicles] = useState<Record<string, VehicleTelemetry>>({})
  const [error, setError] = useState<string | null>(null)

  const updateVehicle = useCallback((telemetry: VehicleTelemetry) => {
    setVehicles((current) => ({
      ...current,
      [telemetry.vehicleId]: {
        ...current[telemetry.vehicleId],
        ...telemetry,
        timestamp: telemetry.timestamp ?? new Date().toISOString(),
      },
    }))
  }, [])

  useEffect(() => {
    const onConnect = () => {
      setStatus("connected")
      setError(null)
    }

    const onDisconnect = () => {
      setStatus("disconnected")
    }

    const onConnectError = (err: unknown) => {
      const message =
        typeof err === "string"
          ? err
          : err instanceof Error
          ? err.message
          : "Connection failed"
      setStatus("error")
      setError(message)
    }

    const onTelemetry = (payload: VehicleTelemetry) => {
      updateVehicle(payload)
    }

    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)
    socket.on("connect_error", onConnectError)
    socket.on("telemetry", onTelemetry)

    setStatus("connecting")
    connectSocket()

    return () => {
      socket.off("connect", onConnect)
      socket.off("disconnect", onDisconnect)
      socket.off("connect_error", onConnectError)
      socket.off("telemetry", onTelemetry)
      disconnectSocket()
    }
  }, [updateVehicle])

  const vehiclesArray = useMemo(() => Object.values(vehicles), [vehicles])

  const refreshConnection = useCallback(() => {
    if (socket.connected || socket.connecting) {
      return
    }
    setStatus("connecting")
    setError(null)
    connectSocket()
  }, [])

  const stopConnection = useCallback(() => {
    disconnectSocket()
  }, [])

  return {
    vehicles: vehiclesArray,
    connectionStatus: status,
    error,
    refreshConnection,
    stopConnection,
  }
}
