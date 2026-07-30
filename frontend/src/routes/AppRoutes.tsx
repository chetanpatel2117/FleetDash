import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import RequireAuth from "../components/RequireAuth";

import Dashboard from "../pages/Dashboard";
import VehiclesPage from "../pages/VehiclePage";
import AnalyticsPage from "../pages/AnalyticsPage";
import AlertsPage from "../pages/AlertsPage";
import SettingsPage from "../pages/SettingsPage";
import LiveMapPage from "../pages/LiveMapPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";

function AppRoutes () {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        element={
          <RequireAuth>
            <MainLayout />
          </RequireAuth>
        }
      >
          <Route index element={<Dashboard />} />
        <Route path='vehicles' element={<VehiclesPage />} />
        <Route path='map' element={<LiveMapPage />} />
        <Route path='analytics' element={<AnalyticsPage />} />
        <Route path='alerts' element={<AlertsPage />} />
        <Route path='settings' element={<SettingsPage />} />
        <Route path='profile' element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
