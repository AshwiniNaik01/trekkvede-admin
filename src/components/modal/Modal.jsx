import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

/**
 * Reusable Premium Modal Component.
 * @param {Boolean} isOpen - Whether the modal is visible.
 * @param {Function} onClose - Function to close the modal.
 * @param {String} title - Modal heading.
 * @param {ReactNode} children - Modal content.
 * @param {String} size - Modal width (sm, md, lg, xl, full).
 */
export default function Modal({ isOpen, onClose, title, children, size = "md" }) {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => (document.body.style.overflow = "auto");
    }, [isOpen]);

    if (!isOpen) return null;

    const sizeClasses = {
        sm: "max-w-md",
        md: "max-w-2xl",
        lg: "max-w-4xl",
        xl: "max-w-6xl",
        full: "max-w-[95%]",
    };

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className={`relative w-full ${sizeClasses[size]} mx-auto my-6 transition-all duration-300 transform scale-100 animate-in fade-in zoom-in-95`}>
                <div className="relative flex flex-col w-full bg-white border border-emerald-50 rounded-[2.5rem] shadow-2xl shadow-emerald-900/20 outline-none focus:outline-none overflow-hidden">

                    {/* Header */}
                    <div className="flex items-center justify-between p-6 sm:p-8 border-b border-gray-100 bg-gradient-to-r from-emerald-50/50 to-amber-50/50">
                        <h3 className="text-2xl font-black text-emerald-900 tracking-tight">
                            {title}
                        </h3>
                        <button
                            className="p-2 ml-auto bg-white border border-emerald-100 text-emerald-400 hover:text-amber-600 hover:border-amber-200 transition-all rounded-xl shadow-sm"
                            onClick={onClose}
                        >
                            <FaTimes size={18} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="relative p-6 sm:p-8 flex-auto max-h-[70vh] overflow-y-auto custom-scrollbar">
                        {children}
                    </div>

                    {/* Optional Footer can be added here if needed */}
                </div>
            </div>
        </div>
    );
}
