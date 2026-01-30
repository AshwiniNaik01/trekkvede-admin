import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import Dashboard from "../pages/Dashboard";
import ManageTreks from "../pages/ManageTreks";
import TrekForm from "../pages/TrekForm";


export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/treks" element={<TrekForm />} />
        <Route path="/treks/manage" element={<ManageTreks />} />
        <Route path="/treks/create" element={<TrekForm />} />
      </Route>
    </Routes>
  );
}
