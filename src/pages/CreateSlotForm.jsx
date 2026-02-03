import React, { useState, useEffect } from "react";
import {
  FiCalendar,
  FiUsers,
  FiAlertCircle,
  FiCheck,
  FiX,
  FiMapPin,
  FiLoader,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";
import { addSlot, getAllSlots, updateSlot } from "../api/slotsApi";

const CreateSlotForm = () => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    displayRange: "",
    status: "AVBL",
    totalSeats: 20,
    bookedSeats: 0,
  });

  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editingSlotId, setEditingSlotId] = useState(null);

  // Fetch all slots on component mount
  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      setError(null);
      const response = await getAllSlots();
      setSlots(response.data || response || []);
    } catch (err) {
      setError("Failed to fetch slots. Please try again.");
      console.error("Error fetching slots:", err);
    }
  };

  const handleEdit = (slot) => {
    setEditMode(true);
    setEditingSlotId(slot._id || slot.id);
    setFormData({
      startDate: slot.startDate.split("T")[0],
      endDate: slot.endDate.split("T")[0],
      displayRange: slot.displayRange,
      status: slot.status,
      totalSeats: slot.totalSeats,
      bookedSeats: slot.bookedSeats,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditingSlotId(null);
    setFormData({
      startDate: "",
      endDate: "",
      displayRange: "",
      status: "AVBL",
      totalSeats: 20,
      bookedSeats: 0,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-generate display range when both dates are selected
    if (name === "startDate" || name === "endDate") {
      const start = name === "startDate" ? value : formData.startDate;
      const end = name === "endDate" ? value : formData.endDate;

      if (start && end) {
        const displayRange = formatDateRange(start, end);
        setFormData((prev) => ({
          ...prev,
          displayRange,
        }));
      }
    }
  };

  const formatDateRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const formatDay = (date) => {
      const day = date.getDate();
      const suffix = ["th", "st", "nd", "rd"][
        day % 10 > 3 ? 0 : (((day % 100) - (day % 10) !== 10) * day) % 10
      ];
      const month = date.toLocaleDateString("en-US", { month: "short" });
      return `${day}${suffix} ${month}`;
    };

    return `${formatDay(startDate)} - ${formatDay(endDate)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      setSuccessMessage("");

      const slotData = new FormData();
      slotData.append("startDate", formData.startDate);
      slotData.append("endDate", formData.endDate);
      slotData.append("displayRange", formData.displayRange);
      slotData.append("status", formData.status);
      slotData.append("totalSeats", formData.totalSeats);
      slotData.append("bookedSeats", formData.bookedSeats);

      if (editMode) {
        await updateSlot(editingSlotId, slotData);
        setSuccessMessage("Slot updated successfully!");
        setEditMode(false);
        setEditingSlotId(null);
        await fetchSlots();
      } else {
        await addSlot(slotData);
        setSuccessMessage("Slot created successfully!");
        await fetchSlots();
      }

      setFormData({
        startDate: "",
        endDate: "",
        displayRange: "",
        status: "AVBL",
        totalSeats: 20,
        bookedSeats: 0,
      });

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      setError(
        err.message ||
          `Failed to ${editMode ? "update" : "create"} slot. Please try again.`,
      );
      console.error(`Error ${editMode ? "updating" : "creating"} slot:`, err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4 md:p-6 font-['Outfit']">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 md:gap-3 mb-2">
              <div className="p-1.5 md:p-2 bg-emerald-50 rounded-lg border border-emerald-200">
                <FiCalendar className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                Slot Management
              </h1>
              <HiSparkles className="w-5 h-5 md:w-6 md:h-6 text-amber-500 animate-pulse" />
            </div>
            <p className="text-gray-600 text-xs md:text-sm ml-8 md:ml-14">
              Configure and manage trek availability slots
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white shadow-sm px-4 md:px-5 py-2.5 md:py-3 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs md:text-sm text-gray-700 font-medium">
                {slots.length} Active Slots
              </span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 md:mb-6 bg-red-50 border border-red-200 rounded-xl p-3 md:p-4 flex items-start gap-2 md:gap-3 animate-shake">
            <FiAlertCircle className="w-4 h-4 md:w-5 md:h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h3 className="text-xs md:text-sm font-semibold text-red-800">
                Error
              </h3>
              <p className="text-xs md:text-sm text-red-700 mt-1">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0"
            >
              <FiX className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 md:mb-6 bg-emerald-50 border border-emerald-200 rounded-xl p-3 md:p-4 flex items-start gap-2 md:gap-3 animate-slideDown">
            <FiCheck className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h3 className="text-xs md:text-sm font-semibold text-emerald-800">
                Success
              </h3>
              <p className="text-xs md:text-sm text-emerald-700 mt-1">
                {successMessage}
              </p>
            </div>
            <button
              onClick={() => setSuccessMessage("")}
              className="text-emerald-400 hover:text-emerald-600 transition-colors flex-shrink-0"
            >
              <FiX className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        )}

        {/* Create/Edit Slot Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <div className="p-1.5 bg-emerald-50 rounded-lg">
                <FiCalendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-600" />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900">
                {editMode ? "Edit Slot" : "Create New Slot"}
              </h2>
              {editMode && (
                <button
                  onClick={handleCancelEdit}
                  className="ml-auto text-xs md:text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                  <FiX className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  Cancel
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              {/* Start Date */}
              <div className="group">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FiCalendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-600" />
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                />
              </div>

              {/* End Date */}
              <div className="group">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FiCalendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-600" />
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                />
              </div>

              {/* Display Range */}
              <div className="group">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FiMapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-600" />
                  Display Range
                </label>
                <input
                  type="text"
                  name="displayRange"
                  value={formData.displayRange}
                  readOnly
                  placeholder="Auto-generated from dates"
                  className="w-full bg-gray-100 border border-gray-200 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-gray-500 placeholder-gray-400 cursor-not-allowed"
                />
              </div>

              {/* Total Seats */}
              <div className="group">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FiUsers className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-600" />
                  Total Seats
                </label>
                <input
                  type="number"
                  name="totalSeats"
                  value={formData.totalSeats}
                  onChange={handleInputChange}
                  min="1"
                  required
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                />
              </div>

              {/* Booked Seats */}
              <div className="group">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FiCheck className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-600" />
                  Booked Seats
                </label>
                <input
                  type="number"
                  name="bookedSeats"
                  value={formData.bookedSeats}
                  onChange={handleInputChange}
                  min="0"
                  max={formData.totalSeats}
                  required
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                />
              </div>

              {/* Status */}
              <div className="group">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FiAlertCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-600" />
                  Slot Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 cursor-pointer"
                >
                  <option value="AVBL">Available</option>
                  <option value="FAST FILLING">Fast Filling</option>
                  <option value="LIMITED">Limited Seats</option>
                  <option value="FULL">Fully Booked</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="pt-3 md:pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold py-2.5 md:py-3.5 px-4 md:px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 group text-sm md:text-base"
                >
                  {loading ? (
                    <>
                      <FiLoader className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                      {editMode ? "Updating Slot..." : "Creating Slot..."}
                    </>
                  ) : (
                    <>
                      <FiCheck className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                      {editMode ? "Update Slot" : "Create Slot"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CreateSlotForm;
