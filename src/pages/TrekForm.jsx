import { useState } from "react";
import {
  FaImage,
  FaInfoCircle,
  FaRupeeSign,
  FaCalendarAlt,
  FaPlus,
  FaTrash,
  FaChartBar,
  FaFileAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaClock,
  FaHiking
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

export default function TrekForm() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    difficulty: "Moderate",
    category: "",
    duration: "",
    groupSize: "",
    price: 0,
    discount: 0,
    featured: false,
    isActive: true,
    season: "",
    altitude: "",
    tags: [],
    highlight: "",
    bestFor: "",
    description: "",
    status: "Upcoming",
    startDate: null,
    endDate: null,
    feeDetails: {
      baseFee: 0,
      gstPercent: 5,
      insurance: 180,
      transport: 2800,
    },
    links: {
      inclusions: "",
      terms: "",
      cancellation: "",
      scholarships: "",
    },
    proTrekkerBenefit: "",
    govtEligibility: "",
    trekInfo: [
      { title: "TREK DIFFICULTY", value: "" },
      { title: "TREK DURATION", value: "" },
      { title: "HIGHEST ALTITUDE", value: "" },
      { title: "SUITABLE FOR", value: "" },
    ],
    addons: [],
    months: [],
    reviewsData: [],
    image: "",
    gallery: [],
  });

  const [activeTab, setActiveTab] = useState("basic");

  // Constants
  const difficulties = [
    "Easy", "Moderate", "Challenging", "Difficult", "Extreme"
  ];

  const statuses = [
    { value: "Upcoming", label: "Upcoming" },
    { value: "Ongoing", label: "Ongoing" },
    { value: "Completed", label: "Completed" },
  ];

  const trekInfoTitles = [
    "TREK DIFFICULTY", "TREK DURATION", "HIGHEST ALTITUDE", "SUITABLE FOR",
    "BASECAMP", "ACCOMMODATION", "FITNESS CRITERIA", "PICKUP", "DROPOFF",
    "GEAR RENTAL", "CLOAKROOM", "OFFLOADING"
  ];

  const handleArrayChange = (index, field, value, section) => {
    const updated = [...formData[section]];
    updated[index][field] = value;
    setFormData({ ...formData, [section]: updated });
  };

  const addArrayItem = (section, defaultObj) => {
    setFormData({ ...formData, [section]: [...formData[section], defaultObj] });
  };

  const removeArrayItem = (section, index) => {
    const updated = [...formData[section]];
    updated.splice(index, 1);
    setFormData({ ...formData, [section]: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Data:", formData);
    alert("Check console for form data!");
  };

  const SectionTitle = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-2 mb-6 border-b pb-2">
      <Icon className="text-emerald-600 text-xl" />
      <h2 className="text-xl font-bold text-gray-800 tracking-tight">{title}</h2>
    </div>
  );

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Create New Trek</h1>
            <p className="text-gray-500 font-medium italic">Configure trek details as per the database schema</p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2 text-gray-500 font-bold hover:text-gray-800 transition-colors">Discard</button>
            <button
              onClick={handleSubmit}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-2"
            >
              Verify & Save Trek
            </button>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 bg-gray-200/50 p-1.5 rounded-2xl w-fit">
          {[
            { id: "basic", label: "Basic Info", icon: FaInfoCircle },
            { id: "details", label: "Specifications", icon: FaChartBar },
            { id: "logistics", label: "Content", icon: FaCalendarAlt },
            { id: "fees", label: "Pricing", icon: FaRupeeSign },
            { id: "media", label: "Media", icon: FaImage },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all
                ${activeTab === tab.id
                  ? "bg-white text-emerald-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"}`}
            >
              <tab.icon className="text-lg" />
              {tab.label}
            </button>
          ))}
        </div>

        <form className="bg-white p-6 md:p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 min-h-[600px]">

          {/* --- BASIC INFO --- */}
          {activeTab === "basic" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <SectionTitle icon={FaInfoCircle} title="Primary Details" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <InputField
                    label="Trek Name"
                    icon={FaHiking}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter official trek title"
                  />
                </div>

                <InputField
                  label="Trek Location"
                  icon={FaMapMarkerAlt}
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Region, State (e.g. Ladakh, India)"
                />

                <InputField
                  label="Trek Duration"
                  icon={FaClock}
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="E.g. 10 Days / 9 Nights"
                />

                <InputField
                  label="Target Group Size"
                  icon={FaUsers}
                  value={formData.groupSize}
                  onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                  placeholder="E.g. 12-15 Base Campers"
                />

                <div>
                  <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">Registration Status</label>
                  <CustomSelect
                    options={statuses}
                    value={statuses.find(s => s.value === formData.status)}
                    onChange={(val) => setFormData({ ...formData, status: val.value })}
                  />
                </div>

                <div className="md:col-span-2 space-y-3">
                  <label className="block text-sm font-bold text-gray-700 ml-1">Complexity Level</label>
                  <div className="flex flex-wrap gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    {difficulties.map(level => (
                      <RadioButton
                        key={level}
                        id={`diff-${level}`}
                        name="difficulty"
                        label={level}
                        value={level}
                        checked={formData.difficulty === level}
                        onChange={(val) => setFormData({ ...formData, difficulty: val })}
                      />
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2 flex items-center gap-8 p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <Checkbox
                    id="feat"
                    label="Mark as Featured (Landing Page)"
                    checked={formData.featured}
                    onChange={(val) => setFormData({ ...formData, featured: val })}
                  />
                  <Checkbox
                    id="act"
                    label="Publicly Visible"
                    checked={formData.isActive}
                    onChange={(val) => setFormData({ ...formData, isActive: val })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* --- SPECIFICATIONS --- */}
          {activeTab === "details" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <SectionTitle icon={FaChartBar} title="Technical Data" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputField
                  label="Peak Altitude"
                  value={formData.altitude}
                  onChange={(e) => setFormData({ ...formData, altitude: e.target.value })}
                  placeholder="E.g. 5,364m / 17,598ft"
                />

                <InputField
                  label="Recommended Season"
                  value={formData.season}
                  onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                  placeholder="E.g. June to September"
                />

                <div className="md:col-span-2">
                  <TagsInput
                    label="Filter Tags"
                    value={formData.tags}
                    onChange={(tags) => setFormData({ ...formData, tags })}
                    placeholder="Type tag and press enter..."
                  />
                </div>

                <div className="md:col-span-2 p-6 bg-gray-50 rounded-3xl border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Trek Parameter Mapping</h3>
                    <button
                      type="button"
                      onClick={() => addArrayItem("trekInfo", { title: "TREK DIFFICULTY", value: "" })}
                      className="flex items-center gap-1.5 text-xs font-black text-emerald-600 bg-emerald-100 px-3 py-1.5 rounded-lg hover:bg-emerald-200 transition-colors uppercase"
                    >
                      <FaPlus /> Add Parameter
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {formData.trekInfo.map((info, index) => (
                      <div key={index} className="group relative bg-white p-4 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <select
                          value={info.title}
                          onChange={(e) => handleArrayChange(index, "title", e.target.value, "trekInfo")}
                          className="w-full text-[10px] font-black text-emerald-600 bg-transparent border-none outline-none mb-2 focus:ring-0 uppercase tracking-tighter"
                        >
                          {trekInfoTitles.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <div className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={info.value}
                            onChange={(e) => handleArrayChange(index, "value", e.target.value, "trekInfo")}
                            className="flex-1 bg-gray-50 border-none rounded-xl text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/20"
                            placeholder="Data value..."
                          />
                          <button
                            type="button"
                            onClick={() => removeArrayItem("trekInfo", index)}
                            className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- CONTENT --- */}
          {activeTab === "logistics" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <SectionTitle icon={FaCalendarAlt} title="Descriptions & Planning" />

              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">Trek Date Range</label>
                  <CustomDatePicker
                    startDate={formData.startDate}
                    endDate={formData.endDate}
                    onChange={(dates) => setFormData({ ...formData, startDate: dates[0], endDate: dates[1] })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">Full Story / Itinerary Overview</label>
                  <RichTextEditor
                    value={formData.description}
                    onChange={(content) => setFormData({ ...formData, description: content })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputField
                    label="Target Audience (Best For)"
                    value={formData.bestFor}
                    onChange={(e) => setFormData({ ...formData, bestFor: e.target.value })}
                    placeholder="E.g. Weekend Warriors, Pro Solos"
                  />
                  <InputField
                    label="Pro-Trekker Incentives"
                    value={formData.proTrekkerBenefit}
                    onChange={(e) => setFormData({ ...formData, proTrekkerBenefit: e.target.value })}
                    placeholder="Special perks for returning trekkers"
                  />
                </div>
              </div>
            </div>
          )}

          {/* --- PRICING --- */}
          {activeTab === "fees" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <SectionTitle icon={FaRupeeSign} title="Commercial Configuration" />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 bg-gradient-to-br from-emerald-600 to-emerald-800 p-8 rounded-[2rem] shadow-xl shadow-emerald-900/20 flex flex-col justify-center text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 scale-150 transform group-hover:rotate-12 transition-transform">
                    <FaRupeeSign size={100} />
                  </div>
                  <label className="block mb-2 text-[10px] uppercase font-black text-emerald-100 tracking-widest opacity-80">Base Platform Fee</label>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-black opacity-60">₹</span>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="bg-transparent text-5xl font-black border-none outline-none w-full focus:ring-0 placeholder:text-emerald-400/50"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="lg:col-span-2 grid grid-cols-2 gap-6 bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
                  <InputField
                    label="Group Insurance Cost"
                    type="number"
                    value={formData.feeDetails.insurance}
                    onChange={(e) => setFormData({
                      ...formData,
                      feeDetails: { ...formData.feeDetails, insurance: Number(e.target.value) }
                    })}
                  />
                  <InputField
                    label="Expedition Transport"
                    type="number"
                    value={formData.feeDetails.transport}
                    onChange={(e) => setFormData({
                      ...formData,
                      feeDetails: { ...formData.feeDetails, transport: Number(e.target.value) }
                    })}
                  />
                  <div className="col-span-2">
                    <InputField
                      label="GST %"
                      type="number"
                      value={formData.feeDetails.gstPercent}
                      onChange={(e) => setFormData({
                        ...formData,
                        feeDetails: { ...formData.feeDetails, gstPercent: Number(e.target.value) }
                      })}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-12 space-y-6">
                <SectionTitle icon={FaFileAlt} title="Resource Endpoints" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Inclusions PDF" value={formData.links.inclusions} onChange={(e) => setFormData({ ...formData, links: { ...formData.links, inclusions: e.target.value } })} placeholder="https://..." />
                  <InputField label="Terms & Conditions" value={formData.links.terms} onChange={(e) => setFormData({ ...formData, links: { ...formData.links, terms: e.target.value } })} placeholder="https://..." />
                  <InputField label="Cancellation Policy" value={formData.links.cancellation} onChange={(e) => setFormData({ ...formData, links: { ...formData.links, cancellation: e.target.value } })} placeholder="https://..." />
                  <InputField label="Scholarship Details" value={formData.links.scholarships} onChange={(e) => setFormData({ ...formData, links: { ...formData.links, scholarships: e.target.value } })} placeholder="https://..." />
                </div>
              </div>
            </div>
          )}

          {/* --- MEDIA --- */}
          {activeTab === "media" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <SectionTitle icon={FaImage} title="Media Assets Management" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <ImageUploader
                    label="Hero Representation (Single)"
                    value={formData.image}
                    onChange={(img) => setFormData({ ...formData, image: img })}
                  />

                  <div className="pt-4 border-t border-gray-100">
                    <ImageUploader
                      label="Expedition Gallery (Max 10)"
                      isMultiple
                      maxFiles={10}
                      value={formData.gallery}
                      onChange={(imgs) => setFormData({ ...formData, gallery: imgs })}
                    />
                  </div>
                </div>

                <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">Add-on Services</h3>
                      <p className="text-sm text-gray-500">Optional gear or porter services</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => addArrayItem("addons", { name: "", price: 0, description: "" })}
                      className="p-2 bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-colors"
                    >
                      <FaPlus size={18} />
                    </button>
                  </div>

                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {formData.addons.map((addon, index) => (
                      <div key={index} className="group p-5 bg-white rounded-2xl border border-gray-200 relative animate-in zoom-in duration-300">
                        <button
                          type="button"
                          onClick={() => removeArrayItem("addons", index)}
                          className="absolute -top-2 -right-2 w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white border border-red-100 shadow-sm"
                        >
                          <FaTrash size={12} />
                        </button>
                        <div className="space-y-4">
                          <input
                            type="text"
                            value={addon.name}
                            onChange={(e) => handleArrayChange(index, "name", e.target.value, "addons")}
                            className="w-full bg-transparent font-bold text-gray-800 outline-none border-b border-gray-100 focus:border-emerald-500 transition-colors"
                            placeholder="Service Name (e.g. Sleeping Bag Rental)"
                          />
                          <div className="flex gap-4 items-center">
                            <div className="flex-1 flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                              <span className="text-emerald-600 font-black">₹</span>
                              <input
                                type="number"
                                value={addon.price}
                                onChange={(e) => handleArrayChange(index, "price", Number(e.target.value), "addons")}
                                className="w-full bg-transparent outline-none font-bold text-gray-700 placeholder:text-gray-300"
                                placeholder="0"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {formData.addons.length === 0 && (
                      <div className="py-20 text-center space-y-2 opacity-30">
                        <FaHiking className="mx-auto text-4xl" />
                        <p className="text-sm font-bold">No optional services added</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

        </form>
      </div>
    </div>
  );
}
