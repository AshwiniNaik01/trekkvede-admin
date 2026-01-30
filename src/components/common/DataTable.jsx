import { useState } from "react";
import {
    FaChevronLeft,
    FaChevronRight,
    FaSearch,
    FaFilter,
    FaSortAmountDown,
    FaEllipsisV
} from "react-icons/fa";

/**
 * Reusable DataTable component with pagination and search.
 * @param {Array} columns - Array of objects defining header labels and accessor keys/render functions.
 * @param {Array} data - Array of data objects to display.
 * @param {Boolean} loading - Loading state.
 * @param {Number} initialPageSize - Default results per page.
 */
export default function DataTable({ columns, data = [], loading = false, initialPageSize = 10 }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);

    // Filter logic
    const filteredData = data.filter((item) =>
        Object.values(item).some(
            (val) =>
                val &&
                val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Pagination logic
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);
    const currentItems = filteredData.slice(startIndex, endIndex);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
            {/* Header Actions */}
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/30">
                <div className="relative group w-full md:w-96">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm font-medium"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
                        <FaFilter className="text-gray-400" /> Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
                        <FaSortAmountDown className="text-gray-400" /> Sort
                    </button>
                    <select
                        className="px-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-sm font-bold text-gray-600 outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all"
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                    >
                        {[5, 10, 20, 50].map(size => (
                            <option key={size} value={size}>Show {size}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50">
                            {columns.map((col, idx) => (
                                <th
                                    key={idx}
                                    className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-100"
                                >
                                    {col.label}
                                </th>
                            ))}
                            <th className="px-6 py-4 border-b border-gray-100"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {loading ? (
                            [...Array(pageSize)].map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    {columns.map((_, j) => (
                                        <td key={j} className="px-6 py-5">
                                            <div className="h-4 bg-gray-100 rounded-full w-24"></div>
                                        </td>
                                    ))}
                                    <td className="px-6 py-5"></td>
                                </tr>
                            ))
                        ) : totalItems > 0 ? (
                            currentItems.map((row, rowIdx) => (
                                <tr key={rowIdx} className="hover:bg-gray-50/50 transition-colors group">
                                    {columns.map((col, colIdx) => (
                                        <td key={colIdx} className="px-6 py-5 text-sm font-medium text-gray-600">
                                            {col.render ? col.render(row) : row[col.accessor]}
                                        </td>
                                    ))}
                                    <td className="px-6 py-5 text-right">
                                        <button className="p-2 text-gray-300 hover:text-gray-600 hover:bg-white rounded-xl transition-all shadow-sm">
                                            <FaEllipsisV />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length + 1} className="px-6 py-20 text-center">
                                    <div className="flex flex-col items-center gap-2 opacity-30 text-gray-400">
                                        <FaSearch size={48} />
                                        <p className="text-lg font-bold uppercase tracking-widest">No results found</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm font-bold text-gray-500 tracking-tight">
                    Showing <span className="text-gray-900">{totalItems > 0 ? startIndex + 1 : 0}</span> to <span className="text-gray-900">{endIndex}</span> of <span className="text-gray-900">{totalItems}</span> records
                </p>

                <div className="flex items-center gap-2">
                    <button
                        disabled={currentPage === 1 || loading}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="p-2.5 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                        <FaChevronLeft size={14} />
                    </button>

                    <div className="flex items-center gap-1">
                        {[...Array(totalPages)].map((_, i) => {
                            const page = i + 1;
                            if (
                                page === 1 ||
                                page === totalPages ||
                                (page >= currentPage - 1 && page <= currentPage + 1)
                            ) {
                                return (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`min-w-[40px] h-10 rounded-xl text-sm font-black transition-all
                      ${currentPage === page
                                                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                                                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm"}`}
                                    >
                                        {page}
                                    </button>
                                );
                            } else if (page === currentPage - 2 || page === currentPage + 2) {
                                return <span key={page} className="px-1 text-gray-400 font-bold">...</span>;
                            }
                            return null;
                        })}
                    </div>

                    <button
                        disabled={currentPage === totalPages || totalPages === 0 || loading}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="p-2.5 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                        <FaChevronRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}
