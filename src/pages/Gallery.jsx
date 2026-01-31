import { useState } from "react";
import { FaImages, FaPlus, FaTrash, FaCloudUploadAlt, FaExpand } from "react-icons/fa";
import ImageUploader from "../components/form/ImageUploader";

export default function Gallery() {
    const [images, setImages] = useState([
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1434725039720-abb26e22ebe8?auto=format&fit=crop&q=80&w=800",
    ]);

    const handleUpload = (newImages) => {
        setImages([...images, ...newImages]);
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
                            <FaImages />
                        </div>
                        Media Gallery
                    </h1>
                    <p className="text-gray-500 font-medium mt-1">Manage expedition photos and visual content</p>
                </div>
                <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition shadow-lg shadow-emerald-500/20">
                    <FaCloudUploadAlt /> Bulk Upload
                </button>
            </header>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {/* Upload Card */}
                <div className="aspect-square rounded-3xl border-2 border-dashed border-emerald-100 bg-emerald-50/30 flex flex-col items-center justify-center gap-3 hover:bg-emerald-100 hover:border-emerald-300 transition-all cursor-pointer group">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm group-hover:scale-110 transition-transform">
                        <FaPlus />
                    </div>
                    <span className="text-xs font-black text-emerald-800 uppercase tracking-widest">Add Media</span>
                </div>

                {/* Existing Images */}
                {images.map((src, i) => (
                    <div key={i} className="group aspect-square rounded-[2rem] overflow-hidden relative border border-gray-100 shadow-lg animate-in zoom-in duration-300">
                        <img src={src} alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <button className="p-3 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-2xl transition-all" title="View Full">
                                <FaExpand />
                            </button>
                            <button
                                onClick={() => removeImage(i)}
                                className="p-3 bg-rose-500/20 hover:bg-rose-500/40 backdrop-blur-md text-white rounded-2xl transition-all" title="Delete">
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
