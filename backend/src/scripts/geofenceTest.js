"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geofence_service_1 = require("../services/geofence.service");
const testLocations = [
    {
        name: "Inside Warehouse",
        latitude: 18.525,
        longitude: 73.855,
    },
    {
        name: "Inside Delivery Zone",
        latitude: 18.535,
        longitude: 73.865,
    },
    {
        name: "Outside All Zones",
        latitude: 18.6,
        longitude: 73.9,
    },
];
for (const location of testLocations) {
    const result = (0, geofence_service_1.checkVehicleBoundary)(location.latitude, location.longitude);
    console.log(location.name, result);
}
//# sourceMappingURL=geofenceTest.js.map