import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCategory, getCategoryById, updateCategory } from "../api/trekCategoriesApi";
import { FaLayerGroup, FaImage, FaCheckCircle, FaTimesCircle, FaChevronRight, FaInfoCircle, FaTags, FaChartLine } from "react-icons/fa";
import InputField from "../components/form/InputField";
import ImageUploader from "../components/form/ImageUploader";
import Checkbox from "../components/form/Checkbox";
import CustomSelect from "../components/form/CustomSelect";
import RichTextEditor from "../components/form/RichTextEditor";
import TagsInput from "../components/form/TagsInput";

/* Standardized Category Form */
export default function CategoryForm() {
    const [formData, setFormData] = useState({
        categoryId: "",
        title: "",
        description: "",
        tags: [], // Using array for UI
        difficulty: "Easy",
        catImage: "",
        isActive: true,
    });

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const difficulties = [
        { value: "Easy", label: "Easy" },
        { value: "Moderate", label: "Moderate" },
        { value: "Challenging", label: "Challenging" },
        { value: "Difficult", label: "Difficult" },
        { value: "Expert", label: "Expert" },
    ];

    useEffect(() => {
        if (isEditMode) {
            const fetchCategory = async () => {
                try {
                    setLoading(true);
                    const data = await getCategoryById(id);
                    setFormData({
                        categoryId: data.categoryId || "",
                        title: data.title || "",
                        description: data.description || "",
                        tags: data.tag ? data.tag.split(",").map(t => t.trim()) : [],
                        difficulty: data.difficulty || "Easy",
                        catImage: data.catImage || "",
                        isActive: data.isActive ?? true,
                    });
                    setLoading(false);
                } catch (err) {
                    console.error("Fetch error:", err);
                    setErrorMessage("Failed to load category details.");
                    setLoading(false);
                }
            };
            fetchCategory();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        try {
            // Use FormData to match Multer expectation
            const data = new FormData();

            // Append all fields except the image and tags first
            const { catImage, tags, ...otherData } = formData;
            Object.keys(otherData).forEach(key => {
                data.append(key, otherData[key]);
            });

            // Handle tags: joining into a comma-separated string to match schema
            data.append("tag", tags.join(", "));

            // Append the image file with the field name expected by backend: 'TrekCategoryImage'
            if (catImage) {
                // If it's a data URL (from imageCompression), we should convert it back to a file or handled as is if backend supports
                // But usually, ImageUploader provides a Base64/DataURL. 
                // If the backend expects a multi-part file, we might need to blob it.
                data.append("TrekCategoryImage", catImage);
            }

            if (isEditMode) {
                await updateCategory(id, data);
                alert("Category updated successfully!");
            } else {
                await createCategory(data);
                alert("Category created successfully!");
            }
            navigate("/categories/manage");
        } catch (err) {
            console.error("Submission error:", err);
            setErrorMessage(err.message || "An error occurred while saving category.");
            alert(`Error: ${err.message || "Failed to save category"}`);
        } finally {
            setLoading(false);
        }
    };

    const SectionTitle = ({ icon: Icon, title }) => (
        <div className="flex items-center gap-2 mb-6 border-b pb-2">
            <Icon className="text-emerald-600 text-xl" />
            <h2 className="text-xl font-bold text-gray-800 tracking-tight">{title}</h2>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
                                <FaLayerGroup />
                            </div>
                            {isEditMode ? "Update Category" : "Create Category"}
                        </h1>
                        <p className="text-gray-500 font-medium mt-1">
                            {isEditMode ? `ID: ${id}` : "Define a new category for your trekking expeditions"}
                        </p>
                    </div>
                </header>

                <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-white rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50/50 p-8 md:p-10 space-y-10">

                        {/* Section: Basic Metadata */}
                        <div>
                            <SectionTitle icon={FaInfoCircle} title="Primary Details" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <InputField
                                    label="Category Unique ID"
                                    placeholder="e.g., beginners, high-altitude"
                                    value={formData.categoryId}
                                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                />
                                <InputField
                                    label="Category Title"
                                    placeholder="e.g., Easy Walks"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                                <div className="md:col-span-2 space-y-2">
                                    <label className="block text-sm font-bold text-gray-700 ml-1">Brief Description</label>
                                    <RichTextEditor
                                        value={formData.description}
                                        onChange={(content) => setFormData({ ...formData, description: content })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section: Filtering & Logic */}
                        <div className="pt-2">
                            <SectionTitle icon={FaTags} title="Expedition Logic & Media" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <TagsInput
                                        label="Season Tags"
                                        placeholder="Add tag (e.g. Summer, Monsoon)"
                                        value={formData.tags}
                                        onChange={(newTags) => setFormData({ ...formData, tags: newTags })}
                                    />
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-gray-700 ml-1">Ideal Difficulty</label>
                                        <CustomSelect
                                            options={difficulties}
                                            value={difficulties.find(d => d.value === formData.difficulty)}
                                            onChange={(val) => setFormData({ ...formData, difficulty: val.value })}
                                        />
                                    </div>
                                    <div className="pt-4 p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
                                        <Checkbox
                                            id="cat-active"
                                            label="Publicly Active Category"
                                            checked={formData.isActive}
                                            onChange={(val) => setFormData({ ...formData, isActive: val })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <ImageUploader
                                        label="Category Cover Image"
                                        value={formData.catImage}
                                        onChange={(img) => setFormData({ ...formData, catImage: img })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={() => navigate("/categories/manage")}
                                className="px-6 py-2 text-gray-400 font-bold hover:text-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`flex items-center gap-2 bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                {loading ? "Proccessing..." : isEditMode ? "Update Category" : "Save Category"}
                                <FaChevronRight size={12} />
                            </button>
                        </div>
                    </div>
                </form>

                {errorMessage && (
                    <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 font-bold text-sm flex items-center gap-2">
                        <FaTimesCircle /> {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
}
