import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";

function AppRoutes () {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
