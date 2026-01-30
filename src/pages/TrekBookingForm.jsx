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
  const [members, setMembers] = useState([{ name: "", whatsapp: "" }]);

  const genders = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];
  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const addMember = () => {
    setMembers([...members, { name: "", whatsapp: "" }]);
  };

  const removeMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
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

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ID */}
          <InputField
            label="Booking ID"
            placeholder="Auto-generated"
            disabled
          />

          {/* Name */}
          <InputField
            label="Full Name"
            icon={FiUser}
            placeholder="Your full name"
          />

          {/* WhatsApp */}
          <InputField
            label="WhatsApp Number"
            icon={FiPhone}
            placeholder="+91 XXXXX XXXXX"
          />

          {/* Email */}
          <InputField
            label="Email Address"
            type="email"
            icon={FiMail}
            placeholder="you@example.com"
          />

          {/* DOB */}
          <InputField label="Date of Birth" icon={FiCalendar} type="date" />

          {/* Gender */}
          <div>
            <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">
              Gender
            </label>
            <CustomSelect label="Gender" icon={FaVenusMars} options={genders} />
          </div>

          {/* Pickup Point */}
          <InputField
            label="Pickup Point"
            icon={FiMapPin}
            placeholder="City / Location"
          />

          {/* Blood Group */}
          <div>
            <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">
              Blood Group
            </label>
            <CustomSelect
              label="Blood Group"
              icon={FaTint}
              options={bloodGroups.map((bg) => ({ value: bg, label: bg }))}
            />
          </div>

          {/* Medical History */}
          <div className="w-full md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">
              Medical History
            </label>
            <RichTextEditor className="h-28 mt-1 w-full" />
          </div>

          {/* Emergency Number */}
          <InputField
            label="Alternate / Emergency Number"
            icon={FiAlertCircle}
            placeholder="+91 XXXXX XXXXX"
          />

          {/* Departure Date */}
          <InputField label="Departure Date" icon={FiCalendar} type="date" />

          {/* No of People */}
          <InputField
            label="Number of People"
            icon={FiUsers}
            type="number"
            min="1"
          />

          {/* Booking Time */}
          <InputField label="Booking Time" icon={FiClock} type="time" />

          {/* Need Couple Tent */}
          <Checkbox label="Need Couple Tent?" icon={FaBed} />

          {/* Need Private Room */}
          <Checkbox label="Need Private Room?" icon={FaBed} />
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
              <InputField placeholder="Member Name" icon={FiUser} />
              <InputField placeholder="WhatsApp Number" icon={FiPhone} />
              {members.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMember(index)}
                  className="text-red-600 font-medium hover:underline self-center"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addMember}
            icon={FiPlusCircle}
            className="text-green-700 font-semibold hover:underline flex items-center gap-2"
          >
            <FiPlusCircle className="text-lg" />
            Add Another Member
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 mt-10 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold text-lg transition"
        >
          <FiCheckCircle className="text-xl" />
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
