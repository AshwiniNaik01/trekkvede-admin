import { useState } from "react";
import { FiUpload, FiImage, FiType, FiSun } from "react-icons/fi";

// UI Components
import InputField from "../components/form/InputField";
import Checkbox from "../components/form/Checkbox";
import CustomSelect from "../components/form/CustomSelect";

const months = [
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
];

const years = [
  { value: "2023", label: "2023" },
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
];
const experiences = [
  { value: "Beginner", label: "Beginner" },
  { value: "Moderate", label: "Moderate" },
  { value: "Advanced", label: "Advanced" },
];
const seasons = [
  { value: "Winter", label: "Winter" },
  { value: "Spring", label: "Spring" },
  { value: "Summer", label: "Summer" },
  { value: "Autumn", label: "Autumn" },
];
const regions = [
  { value: "Uttarakhand", label: "Uttarakhand" },
  { value: "Himachal", label: "Himachal" },
  { value: "Kashmir", label: "Kashmir" },
  { value: "Nepal", label: "Nepal" },
  { value: "Sikkim", label: "Sikkim" },
];

export default function TrekGalleryForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    month: "",
    year: "",
    experience: "",
    season: "",
    region: "",
    photo: null,
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#F7FAF9] p-10 rounded-3xl max-w-5xl mx-auto"
    >
      {/* CARD */}
      <div className="bg-white rounded-3xl border border-[#E4EFEA] shadow-sm p-10 space-y-10">
        {/* HEADER */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 tracking-tight">
            Add Trek Gallery Item
          </h2>
          <p className="text-base text-[#6B8B82] mt-2">
            Upload and organize premium trek moments
          </p>
        </div>

        {/* PHOTO */}

        <label className="block">
          <div
            className="
                border-2 border-dashed border-[#DCEAE4]
                rounded-3xl
                h-72 md:h-80
                flex flex-col items-center justify-center
                cursor-pointer
                bg-[#FBFDFC]
                hover:bg-[#F1F7F4]
                transition
            "
          >
            <FiImage className="text-5xl text-[#8FB8A8]" />
            <p className="mt-4 text-sm font-medium text-[#6B8B82]">
              Upload Trek Photo
            </p>
            <p className="text-xs text-[#9BB7AE] mt-1">
              JPG, PNG • High quality recommended
            </p>

            <input
              type="file"
              name="photo"
              icon={FiImage}
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              required
            />
          </div>
        </label>

        {/* TITLE */}
        <InputField
          label="Title"
          name="title"
          icon={FiType}
          placeholder="Harishchandragad Sunrise"
          value={form.title}
          onChange={handleChange}
        />

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">
              Month
            </label>
            <CustomSelect label="Month" name="month" options={months} />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">
              Year
            </label>
            <CustomSelect label="Year" name="year" options={years} />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">
              Experience Level
            </label>
            <CustomSelect
              label="Experience Level"
              name="experience"
              options={experiences}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">
              Season
            </label>
            <CustomSelect
              label="Season"
              name="season"
              options={seasons}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">
              Region
            </label>
            <CustomSelect
              label="Region"
              name="region"
              options={regions}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ACTIVE */}
        <div className="flex items-center gap-3">
          <Checkbox
            type="checkbox"
            name="isActive"
            // icon={FiCheckCircle}
            checked={form.isActive}
            onChange={handleChange}
            className="w-5 h-5 accent-[#3E6B5B]"
          />
          <span className="text-sm text-[#1F2D2A]">Mark as Active</span>
        </div>

        {/* ACTION */}
        <div className="flex justify-end pt-6 border-t border-[#E4EFEA]">
          <button
            type="submit"
            className="
              px-10 py-3 rounded-xl
              bg-[#3E5F52] text-white
              hover:bg-[#334E45]
              transition flex items-center gap-2
            "
          >
            <FiUpload />
            Save Gallery Item
          </button>
        </div>
      </div>
    </form>
  );
}

/* REUSABLE COMPONENTS */

const Input = ({ label, ...props }) => (
  <div>
    <p className="text-xs uppercase tracking-widest text-[#6B8B82] mb-2">
      {label}
    </p>
    <input
      {...props}
      required
      className="
        w-full px-5 py-3 rounded-xl
        border border-[#E4EFEA]
        bg-[#FBFDFC]
        focus:outline-none focus:ring-2 focus:ring-[#CDE6DA]
      "
    />
  </div>
);

const Select = ({ label, name, options, onChange }) => (
  <div>
    <p className="text-xs uppercase tracking-widest text-[#6B8B82] mb-2">
      {label}
    </p>
    <select
      name={name}
      onChange={onChange}
      required
      className="
        w-full px-5 py-3 rounded-xl
        border border-[#E4EFEA]
        bg-[#FBFDFC]
        focus:outline-none focus:ring-2 focus:ring-[#CDE6DA]
      "
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);
