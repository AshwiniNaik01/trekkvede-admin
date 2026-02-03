import { useState, useEffect } from "react";
import { FiUpload, FiImage, FiType } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// UI Components
import InputField from "../components/form/InputField";
import Checkbox from "../components/form/Checkbox";
import CustomSelect from "../components/form/CustomSelect";

// API
import { addGallery, updateGallery } from "../api/galleryApi";

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
  { value: "2026", label: "2026" },
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

export default function TrekGalleryForm({
  onSubmit,
  initialData = null,
  isEditMode = false,
}) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    month: "",
    year: "",
    experience: "Beginner",
    season: "Winter",
    region: "",
    photo: null,
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    console.log("TrekGalleryForm - isEditMode:", isEditMode);
    console.log("TrekGalleryForm - initialData:", initialData);

    if (isEditMode && initialData) {
      // Populate form fields with existing data
      setForm({
        title: initialData.title || "",
        month: initialData.month || "",
        year: initialData.year || "",
        experience: initialData.experience || "Beginner",
        season: initialData.season || "Winter",
        region: initialData.region || "",
        photo: null, // Don't set the existing photo file
        isActive:
          initialData.isActive !== undefined ? initialData.isActive : true,
      });

      // Set photo preview from existing data
      if (initialData.photo?.cdnUrl) {
        setPreviewImage(initialData.photo.cdnUrl);
        console.log("Setting photo preview:", initialData.photo.cdnUrl);
      } else if (typeof initialData.photo === "string") {
        setPreviewImage(initialData.photo);
        console.log("Setting photo preview (string):", initialData.photo);
      }
    } else {
      // Reset form when not in edit mode
      setForm({
        title: "",
        month: "",
        year: "",
        experience: "Beginner",
        season: "Winter",
        region: "",
        photo: null,
        isActive: true,
      });
      setPreviewImage(null);
    }
  }, [initialData, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && files && files[0]) {
      setForm({ ...form, [name]: files[0] });

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm({
        ...form,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSelectChange = (field, option) => {
    setForm((prev) => ({
      ...prev,
      [field]: option ? option.value : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Create FormData for file upload
      const formData = new FormData();

      // Append the image file (only if a new one is selected)
      if (form.photo) {
        formData.append("TrekGalleryImage", form.photo);
      }

      // Append other form fields
      formData.append("title", form.title);
      formData.append("month", form.month);
      formData.append("year", form.year);
      formData.append("experience", form.experience);
      formData.append("season", form.season);
      formData.append("region", form.region);
      formData.append("isActive", form.isActive);

      let response;

      // Call appropriate API based on mode
      if (isEditMode && initialData?._id) {
        // Update existing gallery item
        response = await updateGallery(initialData._id, formData);
        console.log("Update successful:", response);
        alert("Trek gallery item updated successfully!");
      } else {
        // Create new gallery item
        response = await addGallery(formData);
        console.log("Upload successful:", response);
        alert("Trek gallery item added successfully!");
      }

      // Call the onSubmit callback if provided
      if (onSubmit) {
        onSubmit(response);
      }

      // Reset form only if not in edit mode
      if (!isEditMode) {
        setForm({
          title: "",
          month: "",
          year: "",
          experience: "Beginner",
          season: "Winter",
          region: "",
          photo: null,
          isActive: true,
        });
        setPreviewImage(null);
      }

      // Navigate to gallery management page
      navigate("/gallery/manage");
    } catch (error) {
      console.error("Failed to save gallery item:", error);
      alert(
        error?.message ||
          "Failed to save gallery item. Please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
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
            {isEditMode ? "Edit Trek Gallery Item" : "Add Trek Gallery Item"}
          </h2>
          <p className="text-base text-[#6B8B82] mt-2">
            {isEditMode
              ? "Update trek gallery details"
              : "Upload and organize premium trek moments"}
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
                overflow-hidden
                relative
            "
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-cover absolute inset-0"
              />
            ) : (
              <>
                <FiImage className="text-5xl text-[#8FB8A8]" />
                <p className="mt-4 text-sm font-medium text-[#6B8B82]">
                  Upload Trek Photo
                </p>
                <p className="text-xs text-[#9BB7AE] mt-1">
                  JPG, PNG • High quality recommended
                </p>
              </>
            )}

            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              required={!isEditMode && !previewImage}
            />
          </div>
          {previewImage && (
            <p className="text-sm text-green-600 mt-2 text-center font-medium">
              ✓ Image {isEditMode ? "loaded" : "selected"} - Click to change
            </p>
          )}
        </label>

        {/* TITLE */}
        <InputField
          label="Title"
          name="title"
          icon={FiType}
          placeholder="Harishchandragad Sunrise"
          value={form.title}
          onChange={handleChange}
          required
        />

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">
              Month
            </label>
            <CustomSelect
              label="Month"
              name="month"
              options={months}
              value={months.find((m) => m.value === form.month) || null}
              onChange={(option) => handleSelectChange("month", option)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">
              Year
            </label>
            <CustomSelect
              label="Year"
              name="year"
              options={years}
              value={years.find((y) => y.value === form.year) || null}
              onChange={(option) => handleSelectChange("year", option)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">
              Experience Level
            </label>
            <CustomSelect
              label="Experience Level"
              name="experience"
              options={experiences}
              value={
                experiences.find((e) => e.value === form.experience) || null
              }
              onChange={(option) => handleSelectChange("experience", option)}
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
              value={seasons.find((s) => s.value === form.season) || null}
              onChange={(option) => handleSelectChange("season", option)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">
              Region
            </label>
            <CustomSelect
              name="region"
              options={regions}
              value={regions.find((r) => r.value === form.region) || null}
              onChange={(option) => handleSelectChange("region", option)}
            />
          </div>
        </div>

        {/* ACTIVE */}
        <div className="flex items-center gap-3">
          <Checkbox
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
            className="w-5 h-5 accent-[#3E6B5B]"
          />
          <span className="text-sm text-[#1F2D2A]">Mark as Active</span>
        </div>

        {/* ACTION */}
        <div className="flex justify-end gap-4 pt-6 border-t border-[#E4EFEA]">
          <button
            type="button"
            onClick={() => navigate("/gallery/manage")}
            className="
              px-10 py-3 rounded-xl
              bg-gray-200 text-gray-700
              hover:bg-gray-300
              transition flex items-center gap-2
            "
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="
              px-10 py-3 rounded-xl
              bg-[#3E5F52] text-white
              hover:bg-[#334E45]
              transition flex items-center gap-2
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            <FiUpload />
            {loading
              ? isEditMode
                ? "Updating..."
                : "Uploading..."
              : isEditMode
                ? "Update Gallery Item"
                : "Save Gallery Item"}
          </button>
        </div>
      </div>
    </form>
  );
}
