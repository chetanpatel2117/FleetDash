# FleetDash

FleetDash is a real-time fleet monitoring dashboard with vehicle telemetry, geofence alerts, and a React frontend backed by an Express/TypeScript backend.

## Project structure

- `backend/` — Node.js + Express API, MongoDB, Redis Pub/Sub, Socket.io, geofence processing, authentication
- `frontend/` — React + TypeScript + Vite UI, map and vehicle dashboard components
- `package-lock.json` — root lock file for dependency consistency

## Prerequisites

- Node.js 18+ or later
- npm 10+ or later
- MongoDB running and accessible
- Redis running on `localhost:6379` or configured via environment variables

## Environment variables

Create a `.env` file in `backend/` and set at least:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/fleetdash
ADMIN_USER=admin
ADMIN_PASS=admin123
ADMIN_ROLE=admin
CLIENT_URL=http://localhost:5173
# REDIS_URL=redis://127.0.0.1:6379
```

> If Redis is not available, the backend will still start, but publisher/subscriber features will be disabled.

## Backend setup

```bash
cd backend
npm install
npm run dev
```

The backend runs on `http://localhost:5000` by default.

## Frontend setup

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` by default.

## Running tests

### Backend

```bash
cd backend
npm test
```

### Frontend

```bash
cd frontend
npm run lint
```

## Notes

- `frontend/README.md` is the default Vite starter README and does not describe FleetDash specifically.
- The root `package-lock.json` should be kept in sync with the repository package manifests.

## License

This project does not currently include a license file.
