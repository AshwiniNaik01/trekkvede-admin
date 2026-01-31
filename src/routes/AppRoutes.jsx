import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import Dashboard from "../pages/Dashboard";
import ManageTreks from "../pages/ManageTreks";
import TrekForm from "../pages/TrekForm";
import ManageBookings from "../pages/ManageBookings";
import TrekBookingForm from "../pages/TrekBookingForm";
import ManageCategories from "../pages/ManageCategories";
import CategoryForm from "../pages/CategoryForm";
import Gallery from "../pages/Gallery";

import ManageReviews from "../pages/ManageReviews";
import ManagePayments from "../pages/ManagePayments";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />} />
        {/* Treks */}
        <Route path="/treks" element={<TrekForm />} />
        <Route path="/treks/manage" element={<ManageTreks />} />
        <Route path="/treks/create" element={<TrekForm />} />
        <Route path="/treks/edit/:id" element={<TrekForm />} />

        {/* Categories */}
        <Route path="/categories/manage" element={<ManageCategories />} />
        <Route path="/categories/create" element={<CategoryForm />} />
        <Route path="/categories/edit/:id" element={<CategoryForm />} />

        {/* Bookings */}
        <Route path="/bookings/create" element={<TrekBookingForm />} />
        <Route path="/bookings/manage" element={<ManageBookings />} />

        {/* Reviews */}
        <Route path="/reviews/manage" element={<ManageReviews />} />

        {/* Payments */}
        <Route path="/payments/manage" element={<ManagePayments />} />

        {/* Media */}
        <Route path="/gallery" element={<Gallery />} />
      </Route>
    </Routes>
  );
}
