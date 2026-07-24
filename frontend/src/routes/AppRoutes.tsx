import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import VehiclesPage from "../pages/VehiclePage";
import AnalyticsPage from "../pages/AnalyticsPage";
import AlertsPage from "../pages/AlertsPage";
import SettingsPage from "../pages/SettingsPage";
import LiveMapPage from "../pages/LiveMapPage";

function AppRoutes () {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<Dashboard />} />

        <Route path='/vehicles' element={<VehiclesPage />} />

        <Route path='/map' element={<LiveMapPage />} />

        <Route path='/analytics' element={<AnalyticsPage />} />

        <Route path='/alerts' element={<AlertsPage />} />

        <Route path='/settings' element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
