// import React, { useState, useEffect } from "react";
// import {
//   FiCalendar,
//   FiClock,
//   FiUsers,
//   FiAlertCircle,
//   FiCheck,
//   FiX,
//   FiTrendingUp,
//   FiMapPin,
//   FiLoader,
// } from "react-icons/fi";
// import { MdEventAvailable, MdEventBusy, MdSpeed } from "react-icons/md";
// import { HiSparkles } from "react-icons/hi";
// import { addSlot, getAllSlots } from "../api/slotsApi";

// const CreateSlotForm = () => {
//   const [formData, setFormData] = useState({
//     startDate: "",
//     endDate: "",
//     displayRange: "",
//     status: "AVBL",
//     totalSeats: 20,
//     bookedSeats: 0,
//   });

//   const [slots, setSlots] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fetchingSlots, setFetchingSlots] = useState(true);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [editMode, setEditMode] = useState(false);
//   const [editingSlotId, setEditingSlotId] = useState(null);

//   // Fetch all slots on component mount
//   useEffect(() => {
//     fetchSlots();
//   }, []);

//   const fetchSlots = async () => {
//     try {
//       setFetchingSlots(true);
//       setError(null);
//       const response = await getAllSlots();
//       setSlots(response.data || response || []);
//     } catch (err) {
//       setError("Failed to fetch slots. Please try again.");
//       console.error("Error fetching slots:", err);
//     } finally {
//       setFetchingSlots(false);
//     }
//   };

//   const handleEdit = (slot) => {
//     setEditMode(true);
//     setEditingSlotId(slot._id || slot.id);
//     setFormData({
//       startDate: slot.startDate.split("T")[0],
//       endDate: slot.endDate.split("T")[0],
//       displayRange: slot.displayRange,
//       status: slot.status,
//       totalSeats: slot.totalSeats,
//       bookedSeats: slot.bookedSeats,
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleCancelEdit = () => {
//     setEditMode(false);
//     setEditingSlotId(null);
//     setFormData({
//       startDate: "",
//       endDate: "",
//       displayRange: "",
//       status: "AVBL",
//       totalSeats: 20,
//       bookedSeats: 0,
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     // Auto-generate display range when both dates are selected
//     if (name === "startDate" || name === "endDate") {
//       const start = name === "startDate" ? value : formData.startDate;
//       const end = name === "endDate" ? value : formData.endDate;

//       if (start && end) {
//         const displayRange = formatDateRange(start, end);
//         setFormData((prev) => ({
//           ...prev,
//           displayRange,
//         }));
//       }
//     }
//   };

//   const formatDateRange = (start, end) => {
//     const startDate = new Date(start);
//     const endDate = new Date(end);

//     const formatDay = (date) => {
//       const day = date.getDate();
//       const suffix = ["th", "st", "nd", "rd"][
//         day % 10 > 3 ? 0 : (((day % 100) - (day % 10) !== 10) * day) % 10
//       ];
//       const month = date.toLocaleDateString("en-US", { month: "short" });
//       return `${day}${suffix} ${month}`;
//     };

//     return `${formatDay(startDate)} - ${formatDay(endDate)}`;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       setError(null);
//       setSuccessMessage("");

//       const slotData = new FormData();
//       slotData.append("startDate", formData.startDate);
//       slotData.append("endDate", formData.endDate);
//       slotData.append("displayRange", formData.displayRange);
//       slotData.append("status", formData.status);
//       slotData.append("totalSeats", formData.totalSeats);
//       slotData.append("bookedSeats", formData.bookedSeats);

//       if (editMode) {
//         setSlots(
//           slots.map((slot) =>
//             (slot._id || slot.id) === editingSlotId
//               ? { ...slot, ...formData }
//               : slot,
//           ),
//         );
//         setSuccessMessage("Slot updated successfully!");
//         setEditMode(false);
//         setEditingSlotId(null);
//       } else {
//         await addSlot(slotData);
//         setSuccessMessage("Slot created successfully!");
//         await fetchSlots();
//       }

//       setFormData({
//         startDate: "",
//         endDate: "",
//         displayRange: "",
//         status: "AVBL",
//         totalSeats: 20,
//         bookedSeats: 0,
//       });

//       setTimeout(() => {
//         setSuccessMessage("");
//       }, 3000);
//     } catch (err) {
//       setError(
//         err.message ||
//           `Failed to ${editMode ? "update" : "create"} slot. Please try again.`,
//       );
//       console.error(`Error ${editMode ? "updating" : "creating"} slot:`, err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatusConfig = (status) => {
//     const configs = {
//       AVBL: {
//         color: "bg-emerald-500",
//         bgColor: "bg-emerald-500/10",
//         borderColor: "border-emerald-500/30",
//         textColor: "text-emerald-400",
//         icon: MdEventAvailable,
//         label: "Available",
//       },
//       "FAST FILLING": {
//         color: "bg-amber-500",
//         bgColor: "bg-amber-500/10",
//         borderColor: "border-amber-500/30",
//         textColor: "text-amber-400",
//         icon: MdSpeed,
//         label: "Fast Filling",
//       },
//       LIMITED: {
//         color: "bg-orange-500",
//         bgColor: "bg-orange-500/10",
//         borderColor: "border-orange-500/30",
//         textColor: "text-orange-400",
//         icon: FiAlertCircle,
//         label: "Limited Seats",
//       },
//       FULL: {
//         color: "bg-red-500",
//         bgColor: "bg-red-500/10",
//         borderColor: "border-red-500/30",
//         textColor: "text-red-400",
//         icon: MdEventBusy,
//         label: "Fully Booked",
//       },
//     };
//     return configs[status] || configs["AVBL"];
//   };

//   const calculateAvailability = (slot) => {
//     const available = slot.totalSeats - slot.bookedSeats;
//     const percentage =
//       ((slot.totalSeats - slot.bookedSeats) / slot.totalSeats) * 100;
//     return { available, percentage };
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4 md:p-6 font-['Outfit']">
//       {/* Decorative Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
//       </div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Header */}
//         <div className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//           <div>
//             <div className="flex items-center gap-2 md:gap-3 mb-2">
//               <div className="p-1.5 md:p-2 bg-emerald-50 rounded-lg border border-emerald-200">
//                 <FiCalendar className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
//               </div>
//               <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
//                 Slot Management
//               </h1>
//               <HiSparkles className="w-5 h-5 md:w-6 md:h-6 text-amber-500 animate-pulse" />
//             </div>
//             <p className="text-gray-600 text-xs md:text-sm ml-8 md:ml-14">
//               Configure and manage trek availability slots
//             </p>
//           </div>

//           <div className="flex items-center gap-3 bg-white shadow-sm px-4 md:px-5 py-2.5 md:py-3 rounded-xl border border-gray-200">
//             <div className="flex items-center gap-2">
//               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
//               <span className="text-xs md:text-sm text-gray-700 font-medium">
//                 {slots.length} Active Slots
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-4 md:mb-6 bg-red-50 border border-red-200 rounded-xl p-3 md:p-4 flex items-start gap-2 md:gap-3 animate-shake">
//             <FiAlertCircle className="w-4 h-4 md:w-5 md:h-5 text-red-600 flex-shrink-0 mt-0.5" />
//             <div className="flex-1 min-w-0">
//               <h3 className="text-xs md:text-sm font-semibold text-red-800">
//                 Error
//               </h3>
//               <p className="text-xs md:text-sm text-red-700 mt-1">{error}</p>
//             </div>
//             <button
//               onClick={() => setError(null)}
//               className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0"
//             >
//               <FiX className="w-4 h-4 md:w-5 md:h-5" />
//             </button>
//           </div>
//         )}

//         {/* Success Message */}
//         {successMessage && (
//           <div className="mb-4 md:mb-6 bg-emerald-50 border border-emerald-200 rounded-xl p-3 md:p-4 flex items-start gap-2 md:gap-3 animate-slideDown">
//             <FiCheck className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
//             <div className="flex-1 min-w-0">
//               <h3 className="text-xs md:text-sm font-semibold text-emerald-800">
//                 Success
//               </h3>
//               <p className="text-xs md:text-sm text-emerald-700 mt-1">
//                 {successMessage}
//               </p>
//             </div>
//             <button
//               onClick={() => setSuccessMessage("")}
//               className="text-emerald-400 hover:text-emerald-600 transition-colors flex-shrink-0"
//             >
//               <FiX className="w-4 h-4 md:w-5 md:h-5" />
//             </button>
//           </div>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
//           {/* Create New Slot Form */}
//           <div className="lg:col-span-1">
//             <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 shadow-lg">
//               <div className="flex items-center gap-2 mb-4 md:mb-6">
//                 <div className="p-1.5 bg-emerald-50 rounded-lg">
//                   <FiCalendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-600" />
//                 </div>
//                 <h2 className="text-lg md:text-xl font-bold text-gray-900">
//                   {editMode ? "Edit Slot" : "Create New Slot"}
//                 </h2>
//                 {editMode && (
//                   <button
//                     onClick={handleCancelEdit}
//                     className="ml-auto text-xs md:text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
//                   >
//                     <FiX className="w-3.5 h-3.5 md:w-4 md:h-4" />
//                     Cancel
//                   </button>
//                 )}
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
//                 {/* Start Date */}
//                 <div className="group">
//                   <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                     <FiCalendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-600" />
//                     Start Date
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="date"
//                       name="startDate"
//                       value={formData.startDate}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
//                     />
//                   </div>
//                 </div>

//                 {/* End Date */}
//                 <div className="group">
//                   <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                     <FiCalendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-600" />
//                     End Date
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="date"
//                       name="endDate"
//                       value={formData.endDate}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
//                     />
//                   </div>
//                 </div>

//                 {/* Display Range */}
//                 <div className="group">
//                   <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                     <FiMapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-600" />
//                     Display Range
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       name="displayRange"
//                       value={formData.displayRange}
//                       readOnly
//                       placeholder="Auto-generated from dates"
//                       className="w-full bg-gray-100 border border-gray-200 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-gray-500 placeholder-gray-400 cursor-not-allowed"
//                     />
//                   </div>
//                 </div>

//                 {/* Total Seats */}
//                 <div className="group">
//                   <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                     <FiUsers className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-600" />
//                     Total Seats
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       name="totalSeats"
//                       value={formData.totalSeats}
//                       onChange={handleInputChange}
//                       min="1"
//                       required
//                       className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
//                     />
//                   </div>
//                 </div>

//                 {/* Booked Seats */}
//                 <div className="group">
//                   <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                     <FiCheck className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-600" />
//                     Booked Seats
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       name="bookedSeats"
//                       value={formData.bookedSeats}
//                       onChange={handleInputChange}
//                       min="0"
//                       max={formData.totalSeats}
//                       required
//                       className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
//                     />
//                   </div>
//                 </div>

//                 {/* Status */}
//                 <div className="group">
//                   <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                     <FiAlertCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-600" />
//                     Slot Status
//                   </label>
//                   <select
//                     name="status"
//                     value={formData.status}
//                     onChange={handleInputChange}
//                     className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 cursor-pointer"
//                   >
//                     <option value="AVBL">Available</option>
//                     <option value="FAST FILLING">Fast Filling</option>
//                     <option value="LIMITED">Limited Seats</option>
//                     <option value="FULL">Fully Booked</option>
//                   </select>
//                 </div>

//                 {/* Submit Button */}
//                 <div className="pt-3 md:pt-4 border-t border-gray-200">
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold py-2.5 md:py-3.5 px-4 md:px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 group text-sm md:text-base"
//                   >
//                     {loading ? (
//                       <>
//                         <FiLoader className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
//                         {editMode ? "Updating Slot..." : "Creating Slot..."}
//                       </>
//                     ) : (
//                       <>
//                         <FiCheck className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
//                         {editMode ? "Update Slot" : "Create Slot"}
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>

//           {/* Existing Slots List */}
//           <div className="lg:col-span-2">
//             <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 shadow-lg max-h-[600px] md:max-h-[800px] lg:max-h-screen overflow-hidden flex flex-col">
//               <div className="flex items-center gap-2 mb-4 md:mb-6 flex-shrink-0">
//                 <div className="p-1.5 bg-teal-50 rounded-lg">
//                   <FiTrendingUp className="w-3.5 h-3.5 md:w-4 md:h-4 text-teal-600" />
//                 </div>
//                 <h2 className="text-lg md:text-xl font-bold text-gray-900">
//                   Active Slots
//                 </h2>
//                 <span className="ml-auto text-xs md:text-sm text-gray-600 bg-gray-100 px-2 md:px-3 py-1 rounded-full">
//                   {slots.length} total
//                 </span>
//               </div>

//               <div className="space-y-3 md:space-y-4 flex-1 overflow-y-auto pr-1 md:pr-2 custom-scrollbar">
//                 {fetchingSlots ? (
//                   <div className="text-center py-12 md:py-16">
//                     <FiLoader className="w-12 h-12 md:w-16 md:h-16 text-emerald-500 mx-auto mb-4 animate-spin" />
//                     <p className="text-gray-500 text-base md:text-lg">
//                       Loading slots...
//                     </p>
//                   </div>
//                 ) : slots.length === 0 ? (
//                   <div className="text-center py-12 md:py-16">
//                     <FiCalendar className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-4" />
//                     <p className="text-gray-500 text-base md:text-lg">
//                       No slots created yet
//                     </p>
//                     <p className="text-gray-400 text-xs md:text-sm mt-2">
//                       Create your first slot to get started
//                     </p>
//                   </div>
//                 ) : (
//                   slots.map((slot) => {
//                     const statusConfig = getStatusConfig(slot.status);
//                     const { available, percentage } =
//                       calculateAvailability(slot);
//                     const StatusIcon = statusConfig.icon;

//                     return (
//                       <div
//                         key={slot._id || slot.id}
//                         className="bg-gray-50 border border-gray-200 rounded-xl p-3 md:p-5 hover:border-emerald-300 hover:shadow-md transition-all duration-300 group"
//                       >
//                         <div className="flex items-start justify-between mb-3 md:mb-4 gap-2">
//                           <div className="flex-1 min-w-0">
//                             <div className="flex items-center gap-2 md:gap-3 mb-2">
//                               <div className="p-1.5 md:p-2 bg-white rounded-lg border border-gray-200 shadow-sm flex-shrink-0">
//                                 <FiCalendar className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
//                               </div>
//                               <h3 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors truncate">
//                                 {slot.displayRange}
//                               </h3>
//                             </div>

//                             <div className="flex flex-wrap items-center gap-1 md:gap-2 text-xs md:text-sm text-gray-600 ml-8 md:ml-14">
//                               <FiClock className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
//                               <span className="truncate">
//                                 {new Date(slot.startDate).toLocaleDateString(
//                                   "en-US",
//                                   {
//                                     weekday: "short",
//                                     year: "numeric",
//                                     month: "short",
//                                     day: "numeric",
//                                   },
//                                 )}
//                               </span>
//                               <span className="flex-shrink-0">→</span>
//                               <span className="truncate">
//                                 {new Date(slot.endDate).toLocaleDateString(
//                                   "en-US",
//                                   {
//                                     weekday: "short",
//                                     year: "numeric",
//                                     month: "short",
//                                     day: "numeric",
//                                   },
//                                 )}
//                               </span>
//                             </div>
//                           </div>

//                           <div
//                             className={`flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-lg ${statusConfig.bgColor} border ${statusConfig.borderColor} flex-shrink-0`}
//                           >
//                             <StatusIcon
//                               className={`w-3 h-3 md:w-4 md:h-4 ${statusConfig.textColor}`}
//                             />
//                             <span
//                               className={`text-xs md:text-sm font-semibold ${statusConfig.textColor} whitespace-nowrap`}
//                             >
//                               {statusConfig.label}
//                             </span>
//                           </div>
//                         </div>

//                         {/* Availability Bar */}
//                         <div className="space-y-2">
//                           <div className="flex items-center justify-between text-xs md:text-sm gap-2">
//                             <span className="text-gray-600 flex items-center gap-1.5 md:gap-2">
//                               <FiUsers className="w-3 h-3 md:w-4 md:h-4" />
//                               Seat Availability
//                             </span>
//                             <span className="font-semibold text-gray-900 whitespace-nowrap">
//                               {available} / {slot.totalSeats} available
//                             </span>
//                           </div>

//                           <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                             <div
//                               className={`h-full transition-all duration-500 rounded-full ${
//                                 percentage > 50
//                                   ? "bg-gradient-to-r from-emerald-500 to-teal-500"
//                                   : percentage > 20
//                                     ? "bg-gradient-to-r from-amber-500 to-orange-500"
//                                     : "bg-gradient-to-r from-orange-500 to-red-500"
//                               }`}
//                               style={{ width: `${percentage}%` }}
//                             ></div>
//                           </div>

//                           <div className="flex items-center justify-between text-xs text-gray-500">
//                             <span>{slot.bookedSeats} booked</span>
//                             <span>{percentage.toFixed(0)}% available</span>
//                           </div>
//                         </div>

//                         {/* Action Buttons */}
//                         <div className="flex gap-2 mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-200">
//                           <button
//                             onClick={() => handleEdit(slot)}
//                             className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 font-medium py-1.5 md:py-2 px-3 md:px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 md:gap-2 border border-emerald-200 hover:border-emerald-300 text-xs md:text-sm"
//                           >
//                             <FiCheck className="w-3 h-3 md:w-4 md:h-4" />
//                             Edit
//                           </button>
//                           <button className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 font-medium py-1.5 md:py-2 px-3 md:px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 md:gap-2 border border-red-200 hover:border-red-300 text-xs md:text-sm">
//                             <FiX className="w-3 h-3 md:w-4 md:h-4" />
//                             Delete
//                           </button>
//                         </div>
//                       </div>
//                     );
//                   })
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Quick Stats Footer */}
//         <div className="mt-4 md:mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
//           {[
//             {
//               label: "Total Slots",
//               value: slots.length,
//               icon: FiCalendar,
//               color: "emerald",
//               gradient: "from-emerald-50 to-teal-50",
//               border: "border-emerald-200",
//             },
//             {
//               label: "Available Slots",
//               value: slots.filter((s) => s.status === "AVBL").length,
//               icon: MdEventAvailable,
//               color: "green",
//               gradient: "from-green-50 to-emerald-50",
//               border: "border-green-200",
//             },
//             {
//               label: "Fast Filling",
//               value: slots.filter((s) => s.status === "FAST FILLING").length,
//               icon: MdSpeed,
//               color: "amber",
//               gradient: "from-amber-50 to-orange-50",
//               border: "border-amber-200",
//             },
//             {
//               label: "Total Capacity",
//               value: slots.reduce((sum, slot) => sum + slot.totalSeats, 0),
//               icon: FiUsers,
//               color: "teal",
//               gradient: "from-teal-50 to-cyan-50",
//               border: "border-teal-200",
//             },
//           ].map((stat, index) => {
//             const Icon = stat.icon;
//             return (
//               <div
//                 key={index}
//                 className={`bg-gradient-to-br ${stat.gradient} border ${stat.border} rounded-xl p-3 md:p-4 hover:scale-105 transition-transform duration-300 shadow-sm`}
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="min-w-0 flex-1">
//                     <p className="text-gray-600 text-xs md:text-sm font-medium mb-1 truncate">
//                       {stat.label}
//                     </p>
//                     <p
//                       className={`text-xl md:text-2xl lg:text-3xl font-bold text-${stat.color}-600`}
//                     >
//                       {stat.value}
//                     </p>
//                   </div>
//                   <div
//                     className={`p-2 md:p-3 bg-white rounded-xl border ${stat.border} shadow-sm flex-shrink-0`}
//                   >
//                     <Icon
//                       className={`w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-${stat.color}-600`}
//                     />
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 4px;
//         }
//         @media (min-width: 768px) {
//           .custom-scrollbar::-webkit-scrollbar {
//             width: 6px;
//           }
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: rgba(229, 231, 235, 0.5);
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: rgba(5, 150, 105, 0.4);
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: rgba(5, 150, 105, 0.6);
//         }
//         @keyframes shake {
//           0%,
//           100% {
//             transform: translateX(0);
//           }
//           25% {
//             transform: translateX(-5px);
//           }
//           75% {
//             transform: translateX(5px);
//           }
//         }
//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-shake {
//           animation: shake 0.3s ease-in-out;
//         }
//         .animate-slideDown {
//           animation: slideDown 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CreateSlotForm;

import React, { useState, useEffect } from "react";
import {
  FiCalendar,
  FiClock,
  FiUsers,
  FiAlertCircle,
  FiCheck,
  FiX,
  FiTrendingUp,
  FiMapPin,
  FiLoader,
  FiTrash2,
} from "react-icons/fi";
import { MdEventAvailable, MdEventBusy, MdSpeed } from "react-icons/md";
import { HiSparkles } from "react-icons/hi";
import { addSlot, getAllSlots, deleteSlot, updateSlot } from "../api/slotsApi";

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
  const [fetchingSlots, setFetchingSlots] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editingSlotId, setEditingSlotId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [slotToDelete, setSlotToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch all slots on component mount
  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      setFetchingSlots(true);
      setError(null);
      const response = await getAllSlots();
      setSlots(response.data || response || []);
    } catch (err) {
      setError("Failed to fetch slots. Please try again.");
      console.error("Error fetching slots:", err);
    } finally {
      setFetchingSlots(false);
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

  const handleDeleteClick = (slot) => {
    setSlotToDelete(slot);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!slotToDelete) return;

    try {
      setDeleting(true);
      setError(null);

      // Call delete API
      await deleteSlot(slotToDelete._id || slotToDelete.id);

      // Update local state
      setSlots(
        slots.filter(
          (slot) =>
            (slot._id || slot.id) !== (slotToDelete._id || slotToDelete.id),
        ),
      );

      setSuccessMessage("Slot deleted successfully!");
      setDeleteModalOpen(false);
      setSlotToDelete(null);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      setError(err.message || "Failed to delete slot. Please try again.");
      console.error("Error deleting slot:", err);
      setDeleteModalOpen(false);
      setSlotToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setSlotToDelete(null);
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
        // Update existing slot via API
        await updateSlot(editingSlotId, slotData);
        setSuccessMessage("Slot updated successfully!");
        setEditMode(false);
        setEditingSlotId(null);
        // Refresh slots list
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

  const calculateAvailability = (slot) => {
    const available = slot.totalSeats - slot.bookedSeats;
    const percentage =
      ((slot.totalSeats - slot.bookedSeats) / slot.totalSeats) * 100;
    return { available, percentage };
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Create New Slot Form */}
          <div className="lg:col-span-1">
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
                  <div className="relative">
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* End Date */}
                <div className="group">
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FiCalendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-600" />
                    End Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Display Range */}
                <div className="group">
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FiMapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-600" />
                    Display Range
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="displayRange"
                      value={formData.displayRange}
                      readOnly
                      placeholder="Auto-generated from dates"
                      className="w-full bg-gray-100 border border-gray-200 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-gray-500 placeholder-gray-400 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Total Seats */}
                <div className="group">
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FiUsers className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-600" />
                    Total Seats
                  </label>
                  <div className="relative">
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
                </div>

                {/* Booked Seats */}
                <div className="group">
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FiCheck className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-600" />
                    Booked Seats
                  </label>
                  <div className="relative">
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

          {/* Existing Slots List */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 shadow-lg max-h-[600px] md:max-h-[800px] lg:max-h-screen overflow-hidden flex flex-col">
              <div className="flex items-center gap-2 mb-4 md:mb-6 flex-shrink-0">
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
                    const { available, percentage } =
                      calculateAvailability(slot);
                    const StatusIcon = statusConfig.icon;

                    return (
                      <div
                        key={slot._id || slot.id}
                        className="bg-gray-50 border border-gray-200 rounded-xl p-3 md:p-5 hover:border-emerald-300 hover:shadow-md transition-all duration-300 group"
                      >
                        <div className="flex items-start justify-between mb-3 md:mb-4 gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 md:gap-3 mb-2">
                              <div className="p-1.5 md:p-2 bg-white rounded-lg border border-gray-200 shadow-sm flex-shrink-0">
                                <FiCalendar className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                              </div>
                              <h3 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors truncate">
                                {slot.displayRange}
                              </h3>
                            </div>

                            <div className="flex flex-wrap items-center gap-1 md:gap-2 text-xs md:text-sm text-gray-600 ml-8 md:ml-14">
                              <FiClock className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
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
                              <span className="flex-shrink-0">→</span>
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
                            className={`flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-lg ${statusConfig.bgColor} border ${statusConfig.borderColor} flex-shrink-0`}
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

                        {/* Availability Bar */}
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
                                  ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                                  : percentage > 20
                                    ? "bg-gradient-to-r from-amber-500 to-orange-500"
                                    : "bg-gradient-to-r from-orange-500 to-red-500"
                              }`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>

                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{slot.bookedSeats} booked</span>
                            <span>{percentage.toFixed(0)}% available</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-200">
                          <button
                            onClick={() => handleEdit(slot)}
                            className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 font-medium py-1.5 md:py-2 px-3 md:px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 md:gap-2 border border-emerald-200 hover:border-emerald-300 text-xs md:text-sm"
                          >
                            <FiCheck className="w-3 h-3 md:w-4 md:h-4" />
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
          </div>
        </div>

        {/* Quick Stats Footer */}
        <div className="mt-4 md:mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
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
                className={`bg-gradient-to-br ${stat.gradient} border ${stat.border} rounded-xl p-3 md:p-4 hover:scale-105 transition-transform duration-300 shadow-sm`}
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
                    className={`p-2 md:p-3 bg-white rounded-xl border ${stat.border} shadow-sm flex-shrink-0`}
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
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-500/25"
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

export default CreateSlotForm;
