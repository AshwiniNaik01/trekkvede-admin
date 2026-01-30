import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import Dashboard from "../pages/Dashboard";
import Treks from "../pages/Treks";
import TrekForm from "../pages/TrekForm";


export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/treks" element={<Treks />} />
        <Route path="/treks/create" element={<TrekForm />} />
      </Route>
    </Routes>
  );
}
