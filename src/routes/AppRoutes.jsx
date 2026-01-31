import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import Dashboard from "../pages/Dashboard";
import ManageTreks from "../pages/ManageTreks";
import TrekForm from "../pages/TrekForm";
import ManageBookings from "../pages/ManageBookings";
import TrekBookingForm from "../pages/TrekBookingForm";
import TrekGalleryForm from "../pages/TrekGalleryForm";
import ManageTrekGallery from "../pages/ManageTrekGallery";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/treks" element={<TrekForm />} />
        <Route path="/treks/manage" element={<ManageTreks />} />
        <Route path="/treks/create" element={<TrekForm />} />
        <Route path="/treks/edit/:id" element={<TrekForm />} />
        <Route path="/bookings/create" element={<TrekBookingForm />} />
        <Route path="/bookings/manage" element={<ManageBookings />} />
        <Route path="/gallery/create" element={<TrekGalleryForm />} />
        <Route path="/gallery/manage" element={<ManageTrekGallery />} />
      </Route>
    </Routes>
  );
}
