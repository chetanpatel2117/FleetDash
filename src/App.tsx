import { useMemo } from "react"
import { useVehicleStream } from "./hooks/useVehicleStream"
import "./App.css"

function App() {
  const { vehicles, connectionStatus, error, refreshConnection, stopConnection } = useVehicleStream()

  const statusClass = useMemo(() => {
    switch (connectionStatus) {
      case "connected":
        return "status-connected"
      case "connecting":
        return "status-connecting"
      case "error":
        return "status-error"
      default:
        return "status-disconnected"
    }
  }, [connectionStatus])

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>FleetDash Live Telemetry</h1>
          <p>Socket.io connection status: <strong className={statusClass}>{connectionStatus}</strong></p>
          {error ? <p className="error-text">{error}</p> : null}
        </div>
        <div className="connection-controls">
          <button type="button" onClick={refreshConnection} disabled={connectionStatus === "connecting" || connectionStatus === "connected"}>
            Connect
          </button>
          <button type="button" onClick={stopConnection} disabled={connectionStatus !== "connected"}>
            Disconnect
          </button>
        </div>
      </header>

      <main className="vehicle-grid">
        {vehicles.length === 0 ? (
          <div className="empty-state">Waiting for live vehicle telemetry...</div>
        ) : (
          vehicles.map((vehicle) => (
            <article key={vehicle.vehicleId} className="vehicle-card">
              <h2>{vehicle.vehicleId}</h2>
              <dl>
                <div>
                  <dt>Latitude</dt>
                  <dd>{vehicle.latitude.toFixed(5)}</dd>
                </div>
                <div>
                  <dt>Longitude</dt>
                  <dd>{vehicle.longitude.toFixed(5)}</dd>
                </div>
                <div>
                  <dt>Speed</dt>
                  <dd>{vehicle.speed.toFixed(1)} km/h</dd>
                </div>
                {vehicle.heading !== undefined ? (
                  <div>
                    <dt>Heading</dt>
                    <dd>{vehicle.heading.toFixed(0)}°</dd>
                  </div>
                ) : null}
                {vehicle.status ? (
                  <div>
                    <dt>Status</dt>
                    <dd>{vehicle.status}</dd>
                  </div>
                ) : null}
                <div>
                  <dt>Last update</dt>
                  <dd>{vehicle.timestamp}</dd>
                </div>
              </dl>
            </article>
          ))
        )}
      </main>
    </div>
  )
}

export default App
