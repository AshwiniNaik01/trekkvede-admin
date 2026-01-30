import { useState, useEffect } from "react";
import { getTreks } from "../api/trekApi";
import DataTable from "../components/table/DataTable";
import { FaMountain, FaPlus, FaCheckCircle, FaTimesCircle, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ManageTreks() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTreks();
    }, []);

    const fetchTreks = async () => {
        try {
            setLoading(true);
            const res = await getTreks();
            // Adjust based on the actual API response structure (assuming res.data contains the array)
            setData(res.data || []);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching treks:", err);
            setError("Failed to load treks. Please try again.");
            setLoading(false);
        }
    };

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

                <DataTable columns={columns} data={data} loading={loading} />
            </div>
        </div>
    );
}
