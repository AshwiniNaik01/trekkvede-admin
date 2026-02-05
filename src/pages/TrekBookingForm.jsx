import { useState } from "react";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiCalendar,
  FiMapPin,
  FiUsers,
  FiClock,
  FiPlusCircle,
  FiHeart,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";

import {
  FaVenusMars,
  FaTint,
  FaUserShield,
  FaBed,
  FaIdCard,
} from "react-icons/fa";

// API Import
import { createBooking } from "../api/bookingApi";

// UI Components
import InputField from "../components/form/InputField";
import Checkbox from "../components/form/Checkbox";
import RadioButton from "../components/form/RadioButton";
import TagsInput from "../components/form/TagsInput";
import ImageUploader from "../components/form/ImageUploader";
import CustomSelect from "../components/form/CustomSelect";
import CustomDatePicker from "../components/form/CustomDatePicker";
import RichTextEditor from "../components/form/RichTextEditor";

export default function TrekBookingForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    whatsappNumber: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    pickupPoint: "",
    bloodGroup: "",
    medicalHistory: "",
    emergencyNumber: "",
    departureDate: "",
    numberOfPeople: 1,
    bookingTime: "",
    needCoupleTent: false,
    needPrivateRoom: false,
  });

  const [members, setMembers] = useState([{ name: "", whatsapp: "" }]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [bookingId, setBookingId] = useState("");

  const genders = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  // Handle form field changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user types
    if (apiError) {
      setApiError("");
    }
  };

  // Handle checkbox changes
  const handleCheckboxChange = (field) => {
    setFormData((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Add member
  const addMember = () => {
    setMembers([...members, { name: "", whatsapp: "" }]);
  };

  // Remove member
  const removeMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  // Handle member change
  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setApiError("");
    setSuccessMessage("");

    try {
      // Prepare booking data
      const bookingData = {
        fullName: formData.fullName,
        whatsappNumber: formData.whatsappNumber,
        email: formData.email,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        pickupPoint: formData.pickupPoint,
        bloodGroup: formData.bloodGroup,
        medicalHistory: formData.medicalHistory,
        emergencyNumber: formData.emergencyNumber,
        departureDate: formData.departureDate,
        numberOfPeople: parseInt(formData.numberOfPeople),
        bookingTime: formData.bookingTime,
        needCoupleTent: formData.needCoupleTent,
        needPrivateRoom: formData.needPrivateRoom,
        additionalMembers: members.filter((m) => m.name && m.whatsapp),
      };

      // Call API
      const response = await createBooking(bookingData);

      // Handle success
      setSuccessMessage("Booking created successfully!");
      setBookingId(response.booking?._id || response._id || "N/A");

      // Reset form
      setFormData({
        fullName: "",
        whatsappNumber: "",
        email: "",
        dateOfBirth: "",
        gender: "",
        pickupPoint: "",
        bloodGroup: "",
        medicalHistory: "",
        emergencyNumber: "",
        departureDate: "",
        numberOfPeople: 1,
        bookingTime: "",
        needCoupleTent: false,
        needPrivateRoom: false,
      });
      setMembers([{ name: "", whatsapp: "" }]);

      // Scroll to top to see success message
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Booking error:", error);

      if (error.message) {
        setApiError(error.message);
      } else if (error.error) {
        setApiError(error.error);
      } else {
        setApiError("Failed to create booking. Please try again.");
      }

      // Scroll to top to see error message
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-6 md:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-700">
            Book Your Trek Adventure
          </h1>
          <p className="text-gray-500 mt-2">
            Fill in your details to confirm your TrekVede booking
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border-2 border-green-500 rounded-2xl">
            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-green-600 text-2xl" />
              <div>
                <p className="text-green-700 font-semibold">{successMessage}</p>
                {bookingId && (
                  <p className="text-green-600 text-sm mt-1">
                    Your Booking ID:{" "}
                    <span className="font-bold">{bookingId}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {apiError && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-2xl">
            <div className="flex items-center gap-3">
              <FiAlertCircle className="text-red-600 text-2xl" />
              <p className="text-red-700 font-semibold">{apiError}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* ID - Display only if booking created */}
          {bookingId && (
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">
                Booking ID
              </label>
              <input
                type="text"
                value={bookingId}
                disabled
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 font-semibold text-green-700"
              />
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                placeholder="Your full name"
                required
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">
              WhatsApp Number *
            </label>
            <div className="relative">
              <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                value={formData.whatsappNumber}
                onChange={(e) => handleChange("whatsappNumber", e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                required
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="you@example.com"
                required
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* DOB */}
          <div>
            <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">
              Date of Birth *
            </label>
            <div className="relative">
              <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                required
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">
              Gender *
            </label>
            <div className="relative">
              <FaVenusMars className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={formData.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                required
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
              >
                <option value="">Select Gender</option>
                {genders.map((g) => (
                  <option key={g.value} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Pickup Point */}
          <div>
            <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">
              Pickup Point *
            </label>
            <div className="relative">
              <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={formData.pickupPoint}
                onChange={(e) => handleChange("pickupPoint", e.target.value)}
                placeholder="City / Location"
                required
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">
              Blood Group *
            </label>
            <div className="relative">
              <FaTint className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={formData.bloodGroup}
                onChange={(e) => handleChange("bloodGroup", e.target.value)}
                required
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
              >
                <option value="">Select Blood Group</option>
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Emergency Number */}
          <div>
            <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">
              Alternate / Emergency Number *
            </label>
            <div className="relative">
              <FiAlertCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                value={formData.emergencyNumber}
                onChange={(e) =>
                  handleChange("emergencyNumber", e.target.value)
                }
                placeholder="+91 XXXXX XXXXX"
                required
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Departure Date */}
          <div>
            <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">
              Departure Date *
            </label>
            <div className="relative">
              <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                value={formData.departureDate}
                onChange={(e) => handleChange("departureDate", e.target.value)}
                required
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* No of People */}
          <div>
            <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">
              Number of People *
            </label>
            <div className="relative">
              <FiUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                value={formData.numberOfPeople}
                onChange={(e) => handleChange("numberOfPeople", e.target.value)}
                min="1"
                required
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Booking Time */}
          <div>
            <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">
              Booking Time
            </label>
            <div className="relative">
              <FiClock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="time"
                value={formData.bookingTime}
                onChange={(e) => handleChange("bookingTime", e.target.value)}
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Medical History */}
          <div className="w-full md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">
              Medical History
            </label>
            <textarea
              value={formData.medicalHistory}
              onChange={(e) => handleChange("medicalHistory", e.target.value)}
              placeholder="Any medical conditions we should know about..."
              rows="4"
              disabled={isLoading}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition disabled:opacity-50 disabled:cursor-not-allowed resize-none"
            />
          </div>

          {/* Need Couple Tent */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="coupleTent"
              checked={formData.needCoupleTent}
              onChange={() => handleCheckboxChange("needCoupleTent")}
              disabled={isLoading}
              className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <label
              htmlFor="coupleTent"
              className="flex items-center gap-2 text-sm font-bold text-gray-700 cursor-pointer"
            >
              <FaBed className="text-gray-400" />
              Need Couple Tent?
            </label>
          </div>

          {/* Need Private Room */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="privateRoom"
              checked={formData.needPrivateRoom}
              onChange={() => handleCheckboxChange("needPrivateRoom")}
              disabled={isLoading}
              className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <label
              htmlFor="privateRoom"
              className="flex items-center gap-2 text-sm font-bold text-gray-700 cursor-pointer"
            >
              <FaBed className="text-gray-400" />
              Need Private Room?
            </label>
          </div>
        </form>

        {/* Additional Members */}
        <div className="mt-10">
          <h2 className="text-sm font-bold text-gray-700 mb-4">
            Additional Members
          </h2>

          {members.map((member, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
            >
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) =>
                    handleMemberChange(index, "name", e.target.value)
                  }
                  placeholder="Member Name"
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div className="relative">
                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  value={member.whatsapp}
                  onChange={(e) =>
                    handleMemberChange(index, "whatsapp", e.target.value)
                  }
                  placeholder="WhatsApp Number"
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {members.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMember(index)}
                  disabled={isLoading}
                  className="text-red-600 font-medium hover:underline self-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addMember}
            disabled={isLoading}
            className="text-green-700 font-semibold hover:underline flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiPlusCircle className="text-lg" />
            Add Another Member
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 mt-10 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold text-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Creating Booking...
            </>
          ) : (
            <>
              <FiCheckCircle className="text-xl" />
              Confirm Booking
            </>
          )}
        </button>
      </div>
    </div>
  );
}
