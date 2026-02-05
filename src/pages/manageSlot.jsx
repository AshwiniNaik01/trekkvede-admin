import React, { useState, useEffect } from "react";
import {
  FiTrendingUp,
  FiLoader,
  FiCalendar,
  FiClock,
  FiUsers,
  FiCheck,
  FiTrash2,
  FiAlertCircle,
  FiEdit2,
  FiX,
  FiSave,
} from "react-icons/fi";
import { MdEventAvailable, MdSpeed, MdEventBusy } from "react-icons/md";
import { getAllSlots, deleteSlot, updateSlot } from "../api/slotsApi"; // Update path as needed
import { toast } from "react-hot-toast";

const ManageSlot = () => {
  const [slots, setSlots] = useState([]);
  const [fetchingSlots, setFetchingSlots] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [slotToDelete, setSlotToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Edit modal states
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [slotToEdit, setSlotToEdit] = useState(null);
  const [editFormData, setEditFormData] = useState({
    displayRange: "",
    startDate: "",
    endDate: "",
    totalSeats: "",
    bookedSeats: "",
    status: "AVBL",
  });
  const [updating, setUpdating] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Fetch slots on component mount
  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      setFetchingSlots(true);
      const response = await getAllSlots();

      // Assuming response structure: { success: true, data: [...] }
      // Adjust based on your actual API response structure
      const slotsData = response.data || response.slots || response;
      setSlots(Array.isArray(slotsData) ? slotsData : []);
    } catch (error) {
      console.error("Error fetching slots:", error);
      toast?.error?.(error.message || "Failed to fetch slots");
      setSlots([]);
    } finally {
      setFetchingSlots(false);
    }
  };

  const calculateAvailability = (slot) => {
    const available = slot.totalSeats - slot.bookedSeats;
    const percentage =
      ((slot.totalSeats - slot.bookedSeats) / slot.totalSeats) * 100;
    return { available, percentage };
  };

  const getStatusConfig = (status) => {
    const configs = {
      AVBL: {
        color: "bg-emerald-500",
        bgColor: "bg-emerald-500/10",
        borderColor: "border-emerald-500/30",
        textColor: "text-emerald-400",
        icon: MdEventAvailable,
        label: "Available",
      },
      "FAST FILLING": {
        color: "bg-amber-500",
        bgColor: "bg-amber-500/10",
        borderColor: "border-amber-500/30",
        textColor: "text-amber-400",
        icon: MdSpeed,
        label: "Fast Filling",
      },
      LIMITED: {
        color: "bg-orange-500",
        bgColor: "bg-orange-500/10",
        borderColor: "border-orange-500/30",
        textColor: "text-orange-400",
        icon: FiAlertCircle,
        label: "Limited Seats",
      },
      FULL: {
        color: "bg-red-500",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/30",
        textColor: "text-red-400",
        icon: MdEventBusy,
        label: "Fully Booked",
      },
    };
    return configs[status] || configs["AVBL"];
  };

  const handleEdit = (slot) => {
    setSlotToEdit(slot);

    // Format dates for datetime-local input (YYYY-MM-DDTHH:mm)
    const formatDateForInput = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    setEditFormData({
      displayRange: slot.displayRange || "",
      startDate: formatDateForInput(slot.startDate),
      endDate: formatDateForInput(slot.endDate),
      totalSeats: slot.totalSeats.toString(),
      bookedSeats: slot.bookedSeats.toString(),
      status: slot.status || "AVBL",
    });

    setFormErrors({});
    setEditModalOpen(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateEditForm = () => {
    const errors = {};

    if (!editFormData.displayRange.trim()) {
      errors.displayRange = "Display range is required";
    }

    if (!editFormData.startDate) {
      errors.startDate = "Start date is required";
    }

    if (!editFormData.endDate) {
      errors.endDate = "End date is required";
    }

    if (editFormData.startDate && editFormData.endDate) {
      const start = new Date(editFormData.startDate);
      const end = new Date(editFormData.endDate);
      if (end <= start) {
        errors.endDate = "End date must be after start date";
      }
    }

    const totalSeats = parseInt(editFormData.totalSeats);
    if (!editFormData.totalSeats || isNaN(totalSeats) || totalSeats <= 0) {
      errors.totalSeats = "Total seats must be a positive number";
    }

    const bookedSeats = parseInt(editFormData.bookedSeats);
    if (isNaN(bookedSeats) || bookedSeats < 0) {
      errors.bookedSeats = "Booked seats must be a non-negative number";
    }

    if (bookedSeats > totalSeats) {
      errors.bookedSeats = "Booked seats cannot exceed total seats";
    }

    return errors;
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateEditForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast?.error?.("Please fix the errors in the form");
      return;
    }

    try {
      setUpdating(true);

      // Prepare update data
      const updateData = {
        displayRange: editFormData.displayRange.trim(),
        startDate: new Date(editFormData.startDate).toISOString(),
        endDate: new Date(editFormData.endDate).toISOString(),
        totalSeats: parseInt(editFormData.totalSeats),
        bookedSeats: parseInt(editFormData.bookedSeats),
        status: editFormData.status,
      };

      // Call update API
      await updateSlot(slotToEdit._id, updateData);

      // Update slot in state
      setSlots(
        slots.map((slot) =>
          slot._id === slotToEdit._id ? { ...slot, ...updateData } : slot,
        ),
      );

      // Show success message
      toast?.success?.("Slot updated successfully");

      // Close modal
      setEditModalOpen(false);
      setSlotToEdit(null);
    } catch (error) {
      console.error("Error updating slot:", error);
      toast?.error?.(error.message || "Failed to update slot");
    } finally {
      setUpdating(false);
    }
  };

  const handleEditCancel = () => {
    setEditModalOpen(false);
    setSlotToEdit(null);
    setFormErrors({});
  };

  const handleDeleteClick = (slot) => {
    setSlotToDelete(slot);
    setDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setSlotToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (!slotToDelete) return;

    try {
      setDeleting(true);

      // Call the delete API
      await deleteSlot(slotToDelete._id);

      // Remove slot from state
      setSlots(slots.filter((slot) => slot._id !== slotToDelete._id));

      // Show success message
      toast?.success?.("Slot deleted successfully");

      // Close modal
      setDeleteModalOpen(false);
      setSlotToDelete(null);
    } catch (error) {
      console.error("Error deleting slot:", error);
      toast?.error?.(error.message || "Failed to delete slot");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
              <FiCalendar className="text-emerald-500 bg-emerald-100 p-2 rounded-2xl" />
              Manage Slots
            </h1>
            <p className="text-gray-500 mt-1">
              View, edit, and manage your trek slots
            </p>
          </div>
          {/* <button
            onClick={() => navigate("/gallery/create")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow-md flex items-center gap-2 mt-4 md:mt-0"
          >
            <FiUpload /> Add New Photo
          </button> */}
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 shadow-lg max-h-120 md:max-h-200 lg:max-h-screen overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 mb-4 md:mb-6 shrink-0">
            <div className="p-1.5 bg-teal-50 rounded-lg">
              <FiTrendingUp className="w-3.5 h-3.5 md:w-4 md:h-4 text-teal-600" />
            </div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              Active Slots
            </h2>
            <span className="ml-auto text-xs md:text-sm text-gray-600 bg-gray-100 px-2 md:px-3 py-1 rounded-full">
              {slots.length} total
            </span>
          </div>

          <div className="space-y-3 md:space-y-4 flex-1 overflow-y-auto pr-1 md:pr-2 custom-scrollbar">
            {fetchingSlots ? (
              <div className="text-center py-12 md:py-16">
                <FiLoader className="w-12 h-12 md:w-16 md:h-16 text-emerald-500 mx-auto mb-4 animate-spin" />
                <p className="text-gray-500 text-base md:text-lg">
                  Loading slots...
                </p>
              </div>
            ) : slots.length === 0 ? (
              <div className="text-center py-12 md:py-16">
                <FiCalendar className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-base md:text-lg">
                  No slots created yet
                </p>
                <p className="text-gray-400 text-xs md:text-sm mt-2">
                  Create your first slot to get started
                </p>
              </div>
            ) : (
              slots.map((slot) => {
                const statusConfig = getStatusConfig(slot.status);
                const { available, percentage } = calculateAvailability(slot);
                const StatusIcon = statusConfig.icon;

                return (
                  <div
                    key={slot._id || slot.id}
                    className="bg-gray-50 border border-gray-200 rounded-xl p-3 md:p-5 hover:border-emerald-300 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between mb-3 md:mb-4 gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 md:gap-3 mb-2">
                          <div className="p-1.5 md:p-2 bg-white rounded-lg border border-gray-200 shadow-sm shrink-0">
                            <FiCalendar className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                          </div>
                          <h3 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors truncate">
                            {slot.displayRange}
                          </h3>
                        </div>

                        <div className="flex flex-wrap items-center gap-1 md:gap-2 text-xs md:text-sm text-gray-600 ml-8 md:ml-14">
                          <FiClock className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
                          <span className="truncate">
                            {new Date(slot.startDate).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "short",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </span>
                          <span className="shrink-0">→</span>
                          <span className="truncate">
                            {new Date(slot.endDate).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "short",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-lg ${statusConfig.bgColor} border ${statusConfig.borderColor} shrink-0`}
                      >
                        <StatusIcon
                          className={`w-3 h-3 md:w-4 md:h-4 ${statusConfig.textColor}`}
                        />
                        <span
                          className={`text-xs md:text-sm font-semibold ${statusConfig.textColor} whitespace-nowrap`}
                        >
                          {statusConfig.label}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs md:text-sm gap-2">
                        <span className="text-gray-600 flex items-center gap-1.5 md:gap-2">
                          <FiUsers className="w-3 h-3 md:w-4 md:h-4" />
                          Seat Availability
                        </span>
                        <span className="font-semibold text-gray-900 whitespace-nowrap">
                          {available} / {slot.totalSeats} available
                        </span>
                      </div>

                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 rounded-full ${
                            percentage > 50
                              ? "bg-linear-to-r from-emerald-500 to-teal-500"
                              : percentage > 20
                                ? "bg-linear-to-r from-amber-500 to-orange-500"
                                : "bg-linear-to-r from-orange-500 to-red-500"
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{slot.bookedSeats} booked</span>
                        <span>{percentage.toFixed(0)}% available</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-200">
                      <button
                        onClick={() => handleEdit(slot)}
                        className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 font-medium py-1.5 md:py-2 px-3 md:px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 md:gap-2 border border-emerald-200 hover:border-emerald-300 text-xs md:text-sm"
                      >
                        <FiEdit2 className="w-3 h-3 md:w-4 md:h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(slot)}
                        className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 font-medium py-1.5 md:py-2 px-3 md:px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 md:gap-2 border border-red-200 hover:border-red-300 text-xs md:text-sm"
                      >
                        <FiTrash2 className="w-3 h-3 md:w-4 md:h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Quick Stats Footer */}
        <div className="mt-4 md:mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 shrink-0">
          {[
            {
              label: "Total Slots",
              value: slots.length,
              icon: FiCalendar,
              color: "emerald",
              gradient: "from-emerald-50 to-teal-50",
              border: "border-emerald-200",
            },
            {
              label: "Available Slots",
              value: slots.filter((s) => s.status === "AVBL").length,
              icon: MdEventAvailable,
              color: "green",
              gradient: "from-green-50 to-emerald-50",
              border: "border-green-200",
            },
            {
              label: "Fast Filling",
              value: slots.filter((s) => s.status === "FAST FILLING").length,
              icon: MdSpeed,
              color: "amber",
              gradient: "from-amber-50 to-orange-50",
              border: "border-amber-200",
            },
            {
              label: "Total Capacity",
              value: slots.reduce((sum, slot) => sum + slot.totalSeats, 0),
              icon: FiUsers,
              color: "teal",
              gradient: "from-teal-50 to-cyan-50",
              border: "border-teal-200",
            },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`bg-linear-to-br ${stat.gradient} border ${stat.border} rounded-xl p-3 md:p-4 hover:scale-105 transition-transform duration-300 shadow-sm`}
              >
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-gray-600 text-xs md:text-sm font-medium mb-1 truncate">
                      {stat.label}
                    </p>
                    <p
                      className={`text-xl md:text-2xl lg:text-3xl font-bold text-${stat.color}-600`}
                    >
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`p-2 md:p-3 bg-white rounded-xl border ${stat.border} shadow-sm shrink-0`}
                  >
                    <Icon
                      className={`w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-${stat.color}-600`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Modal */}
      {editModalOpen && slotToEdit && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-8 animate-scaleIn my-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-100 rounded-full">
                  <FiEdit2 className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                    Edit Slot
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Update slot details and availability
                  </p>
                </div>
              </div>
              <button
                onClick={handleEditCancel}
                disabled={updating}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              >
                <FiX className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-5">
              {/* Display Range */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Display Range
                </label>
                <input
                  type="text"
                  name="displayRange"
                  value={editFormData.displayRange}
                  onChange={handleEditFormChange}
                  placeholder="e.g., Jan 1-7, 2024"
                  className={`w-full px-4 py-3 border ${
                    formErrors.displayRange
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-emerald-500"
                  } rounded-lg focus:ring-2 focus:outline-none transition-all`}
                  disabled={updating}
                />
                {formErrors.displayRange && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <FiAlertCircle className="w-4 h-4" />
                    {formErrors.displayRange}
                  </p>
                )}
              </div>

              {/* Start Date and End Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Start Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    name="startDate"
                    value={editFormData.startDate}
                    onChange={handleEditFormChange}
                    className={`w-full px-4 py-3 border ${
                      formErrors.startDate
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-emerald-500"
                    } rounded-lg focus:ring-2 focus:outline-none transition-all`}
                    disabled={updating}
                  />
                  {formErrors.startDate && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <FiAlertCircle className="w-4 h-4" />
                      {formErrors.startDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    End Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    name="endDate"
                    value={editFormData.endDate}
                    onChange={handleEditFormChange}
                    className={`w-full px-4 py-3 border ${
                      formErrors.endDate
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-emerald-500"
                    } rounded-lg focus:ring-2 focus:outline-none transition-all`}
                    disabled={updating}
                  />
                  {formErrors.endDate && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <FiAlertCircle className="w-4 h-4" />
                      {formErrors.endDate}
                    </p>
                  )}
                </div>
              </div>

              {/* Total Seats and Booked Seats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Total Seats
                  </label>
                  <input
                    type="number"
                    name="totalSeats"
                    value={editFormData.totalSeats}
                    onChange={handleEditFormChange}
                    min="1"
                    placeholder="e.g., 100"
                    className={`w-full px-4 py-3 border ${
                      formErrors.totalSeats
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-emerald-500"
                    } rounded-lg focus:ring-2 focus:outline-none transition-all`}
                    disabled={updating}
                  />
                  {formErrors.totalSeats && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <FiAlertCircle className="w-4 h-4" />
                      {formErrors.totalSeats}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Booked Seats
                  </label>
                  <input
                    type="number"
                    name="bookedSeats"
                    value={editFormData.bookedSeats}
                    onChange={handleEditFormChange}
                    min="0"
                    placeholder="e.g., 45"
                    className={`w-full px-4 py-3 border ${
                      formErrors.bookedSeats
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-emerald-500"
                    } rounded-lg focus:ring-2 focus:outline-none transition-all`}
                    disabled={updating}
                  />
                  {formErrors.bookedSeats && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <FiAlertCircle className="w-4 h-4" />
                      {formErrors.bookedSeats}
                    </p>
                  )}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={editFormData.status}
                  onChange={handleEditFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                  disabled={updating}
                >
                  <option value="AVBL">Available</option>
                  <option value="FAST FILLING">Fast Filling</option>
                  <option value="LIMITED">Limited Seats</option>
                  <option value="FULL">Fully Booked</option>
                </select>
              </div>

              {/* Current Availability Preview */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Preview
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Available Seats:</span>
                    <span className="font-semibold text-gray-900">
                      {parseInt(editFormData.totalSeats || 0) -
                        parseInt(editFormData.bookedSeats || 0)}{" "}
                      / {editFormData.totalSeats || 0}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-emerald-500 to-teal-500 transition-all duration-300"
                      style={{
                        width: `${
                          editFormData.totalSeats > 0
                            ? ((parseInt(editFormData.totalSeats) -
                                parseInt(editFormData.bookedSeats || 0)) /
                                parseInt(editFormData.totalSeats)) *
                              100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleEditCancel}
                  disabled={updating}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/25"
                >
                  {updating ? (
                    <>
                      <FiLoader className="w-5 h-5 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <FiSave className="w-5 h-5" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 animate-scaleIn">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-100 rounded-full">
                <FiTrash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                  Delete Slot
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  This action cannot be undone
                </p>
              </div>
            </div>

            {slotToDelete && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <FiCalendar className="w-5 h-5 text-gray-600" />
                  <p className="font-semibold text-gray-900">
                    {slotToDelete.displayRange}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FiClock className="w-4 h-4" />
                  <span>
                    {new Date(slotToDelete.startDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                    {" → "}
                    {new Date(slotToDelete.endDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                  <FiUsers className="w-4 h-4" />
                  <span>
                    {slotToDelete.totalSeats} total seats (
                    {slotToDelete.bookedSeats} booked)
                  </span>
                </div>
              </div>
            )}

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this slot? All associated bookings
              and data will be permanently removed.
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleDeleteCancel}
                disabled={deleting}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="flex-1 bg-linear-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-500/25"
              >
                {deleting ? (
                  <>
                    <FiLoader className="w-5 h-5 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <FiTrash2 className="w-5 h-5" />
                    Delete Slot
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        @media (min-width: 768px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(229, 231, 235, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(5, 150, 105, 0.4);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(5, 150, 105, 0.6);
        }
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
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ManageSlot;
