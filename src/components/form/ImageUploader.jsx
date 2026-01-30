import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import { HiOutlineCloudArrowUp, HiXMark, HiPhoto } from "react-icons/hi2";

const ImageUploader = ({ label, value, onChange, isMultiple = false, maxFiles = 5 }) => {
    const [compressing, setCompressing] = useState(false);

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        setCompressing(true);

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1200,
            useWebWorker: true,
        };

        try {
            const compressedFiles = await Promise.all(
                files.map(async (file) => {
                    const compressed = await imageCompression(file, options);
                    return await imageCompression.getDataUrlFromFile(compressed);
                })
            );

            if (isMultiple) {
                onChange([...(value || []), ...compressedFiles].slice(0, maxFiles));
            } else {
                onChange(compressedFiles[0]);
            }
        } catch (error) {
            console.error("Compression failed:", error);
        } finally {
            setCompressing(false);
        }
    };

    const removeImage = (indexToRemove) => {
        if (isMultiple) {
            onChange(value.filter((_, index) => index !== indexToRemove));
        } else {
            onChange("");
        }
    };

    const displayFiles = isMultiple ? (value || []) : (value ? [value] : []);

    return (
        <div className="w-full space-y-1.5">
            {label && <label className="block text-sm font-bold text-gray-700 ml-1">{label}</label>}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {displayFiles.map((src, index) => (
                    <div key={index} className="relative group aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-md animate-in zoom-in duration-300">
                        <img src={src} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="p-2 bg-white/20 hover:bg-white/40 text-white rounded-full transition-colors backdrop-blur-md"
                            >
                                <HiXMark size={20} />
                            </button>
                        </div>
                    </div>
                ))}

                {(isMultiple ? displayFiles.length < maxFiles : displayFiles.length === 0) && (
                    <label className={`relative aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl hover:border-emerald-500 hover:bg-emerald-50 transition-all cursor-pointer group px-4 text-center ${compressing ? 'opacity-50 pointer-events-none' : ''}`}>
                        <input
                            type="file"
                            accept="image/*"
                            multiple={isMultiple}
                            className="sr-only"
                            onChange={handleFileChange}
                        />
                        {compressing ? (
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                                <span className="text-xs font-bold text-emerald-600">Compressing...</span>
                            </div>
                        ) : (
                            <>
                                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-100 group-hover:text-emerald-600 mb-2 transition-colors">
                                    <HiOutlineCloudArrowUp size={24} className="text-gray-400 group-hover:text-emerald-600" />
                                </div>
                                <span className="text-xs font-black text-gray-700 uppercase tracking-wider">
                                    {isMultiple ? "Upload Trek Gallery" : "Main Image"}
                                </span>
                                <span className="text-[10px] text-gray-400 font-medium mt-1">
                                    JPG, PNG up to 1MB
                                </span>
                            </>
                        )}
                    </label>
                )}
            </div>
        </div>
    );
};

export default ImageUploader;
