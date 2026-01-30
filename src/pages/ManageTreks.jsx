import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { deleteTrek, getTreks } from "../api/trekApi";
import DataTable from "../components/table/DataTable";
import Modal from "../components/modal/Modal";
import { FaMountain, FaPlus, FaCheckCircle, FaTimesCircle, FaMapMarkerAlt, FaCalendarAlt, FaEdit, FaEye, FaTrashAlt, FaInfoCircle } from "react-icons/fa";

export default function ManageTreks() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTrek, setSelectedTrek] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    useEffect(() => {
        fetchTreks();
    }, []);

    const fetchTreks = async () => {
        try {
            setLoading(true);
            const res = await getTreks();
            setData(res.data || []);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching treks:", err);
            setError("Failed to load treks. Please try again.");
            setLoading(false);
        }
    };

    const handleEdit = (row) => {
        navigate(`/treks/edit/${row._id}`);
    };

    const handleView = (row) => {
        setSelectedTrek(row);
        setIsViewModalOpen(true);
    };

    const handleDelete = async (row) => {
        if (window.confirm(`Are you sure you want to permanently delete "${row.title}"?`)) {
            try {
                setLoading(true);
                await deleteTrek(row._id);
                alert("Trek deleted successfully");
                fetchTreks(); // Refresh data
            } catch (err) {
                console.error("Delete error:", err);
                alert(`Error deleting trek: ${err.message || err}`);
                setLoading(false);
            }
        }
    };

    const rowActions = [
        { label: "View Details", icon: <FaEye />, onClick: handleView },
        { label: "Edit Trek", icon: <FaEdit />, onClick: handleEdit },
        { label: "Delete", icon: <FaTrashAlt />, onClick: handleDelete, variant: 'danger' },
    ];

    const columns = [
        {
            label: "Trek Info",
            render: (row) => (
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl border-2 border-emerald-100 overflow-hidden flex-shrink-0 bg-gray-50 flex items-center justify-center">
                        {row.image ? (
                            <img src={row.image} alt={row.title} className="w-full h-full object-cover" />
                        ) : (
                            <FaMountain className="text-emerald-200 text-xl" />
                        )}
                    </div>
                    <div>
                        <div className="font-black text-gray-900 leading-tight">{row.title}</div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase mt-0.5 flex items-center gap-1">
                            <FaMapMarkerAlt size={8} /> {row.location}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            label: "Difficulty",
            render: (row) => {
                const colors = {
                    Easy: "bg-green-100 text-green-700",
                    Moderate: "bg-blue-100 text-blue-700",
                    Challenging: "bg-orange-100 text-orange-700",
                    Difficult: "bg-red-100 text-red-700",
                    Extreme: "bg-purple-100 text-purple-700",
                };
                return (
                    <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${colors[row.difficulty] || "bg-gray-100 text-gray-600"}`}>
                        {row.difficulty}
                    </span>
                );
            },
        },
        {
            label: "Duration / Size",
            render: (row) => (
                <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 font-bold">
                        <FaCalendarAlt size={12} className="text-emerald-500" /> {row.duration}
                    </div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase">
                        Size: {row.groupSize}
                    </div>
                </div>
            ),
        },
        {
            label: "Price",
            render: (row) => (
                <div className="font-black text-gray-900">
                    ₹ {row.price.toLocaleString()}
                    {row.discount > 0 && (
                        <div className="text-[10px] text-emerald-500 font-black">-{row.discount}% Off</div>
                    )}
                </div>
            ),
        },
        {
            label: "Status",
            render: (row) => (
                <div className="flex items-center gap-2">
                    {row.isActive ? (
                        <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
                            <FaCheckCircle size={10} />
                            <span className="text-[10px] font-black uppercase tracking-wider">Active</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-50 text-gray-400 border border-gray-100">
                            <FaTimesCircle size={10} />
                            <span className="text-[10px] font-black uppercase tracking-wider">Inactive</span>
                        </div>
                    )}
                    {row.featured && (
                        <div className="px-2 py-1 rounded bg-amber-100 text-amber-600 border border-amber-200 text-[8px] font-black uppercase">
                            Featured
                        </div>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-8">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
                                <FaMountain />
                            </div>
                            Manage Treks
                        </h1>
                        <p className="text-gray-500 font-medium mt-1">View and manage your expedition catalog</p>
                    </div>
                    <Link
                        to="/treks/create"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-2 w-fit"
                    >
                        <FaPlus /> Create New Trek
                    </Link>
                </header>

                {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-2xl font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
                        <FaTimesCircle />
                        {error}
                        <button onClick={fetchTreks} className="ml-auto underline">Try Again</button>
                    </div>
                )}

                <DataTable
                    columns={columns}
                    data={data}
                    loading={loading}
                    rowActions={rowActions}
                />
            </div>

            {/* View Details Modal */}
            <Modal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                title="Trek Expedition Details"
                size="lg"
            >
                {selectedTrek && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Hero Info */}
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="w-full md:w-1/3 rounded-[2rem] overflow-hidden border-4 border-emerald-50 shadow-xl">
                                {selectedTrek.image ? (
                                    <img src={selectedTrek.image} alt={selectedTrek.title} className="w-full h-64 object-cover" />
                                ) : (
                                    <div className="w-full h-64 bg-emerald-50 flex items-center justify-center text-emerald-200">
                                        <FaMountain size={64} />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-200">
                                        {selectedTrek.difficulty}
                                    </span>
                                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-200">
                                        {selectedTrek.status}
                                    </span>
                                </div>
                                <h2 className="text-4xl font-black text-emerald-950 leading-tight">
                                    {selectedTrek.title}
                                </h2>
                                <div className="flex items-center gap-4 text-emerald-600 font-bold">
                                    <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-2xl">
                                        <FaMapMarkerAlt /> {selectedTrek.location}
                                    </div>
                                    <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-2xl text-amber-700">
                                        <FaCalendarAlt /> {selectedTrek.duration}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pricing & Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 bg-gradient-to-br from- emerald-50 to-white border border-emerald-100 rounded-3xl">
                                <p className="text-xs font-black text-emerald-800/40 uppercase tracking-widest mb-1">Base Price</p>
                                <p className="text-3xl font-black text-emerald-950">₹ {selectedTrek.price.toLocaleString()}</p>
                                {selectedTrek.discount > 0 && <p className="text-sm font-bold text-amber-600 mt-1">{selectedTrek.discount}% Instant Discount</p>}
                            </div>
                            <div className="p-6 bg-gradient-to-br from-amber-50 to-white border border-amber-100 rounded-3xl">
                                <p className="text-xs font-black text-amber-800/40 uppercase tracking-widest mb-1">Group Size</p>
                                <p className="text-3xl font-black text-emerald-950">{selectedTrek.groupSize} PAX</p>
                                <p className="text-sm font-bold text-emerald-600 mt-1">Recommended</p>
                            </div>
                            <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm">
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Altitude</p>
                                <p className="text-3xl font-black text-emerald-950">{selectedTrek.altitude || "N/A"} FT</p>
                            </div>
                        </div>

                        {/* Highlights section */}
                        <div className="space-y-4">
                            <h4 className="text-xl font-black text-emerald-900 flex items-center gap-2">
                                <FaInfoCircle className="text-amber-500" /> Expedition Highlights
                            </h4>
                            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    {selectedTrek.highlight || "No highlights provided for this trek."}
                                </p>
                            </div>
                        </div>

                        {/* Actions in Modal */}
                        <div className="flex justify-end pt-4 gap-4 border-t border-gray-100">
                            <button
                                onClick={() => setIsViewModalOpen(false)}
                                className="px-6 py-3 font-bold text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                Close Window
                            </button>
                            <button
                                onClick={() => handleEdit(selectedTrek)}
                                className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all flex items-center gap-2"
                            >
                                <FaEdit /> Edit Full Profile
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
