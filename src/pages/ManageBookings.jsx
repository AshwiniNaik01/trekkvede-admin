import { useState, useEffect } from "react";
import DataTable from "../components/table/DataTable";
import { FaTicketAlt, FaCheckCircle, FaClock, FaTimesCircle, FaUser, FaMountain } from "react-icons/fa";

export default function ManageBookings() {
  // Simulated data for now
  const [data, setData] = useState([
    { _id: "1", bookingId: "BK-902", user: "Rahul Sharma", trek: "Everest Base Camp", date: "2026-01-28", status: "Confirmed", amount: 45000, pax: 2 },
    { _id: "2", bookingId: "BK-901", user: "Sneha Patil", trek: "Harishchandragad", date: "2026-01-27", status: "Pending", amount: 2500, pax: 1 },
    { _id: "3", bookingId: "BK-900", user: "Amit Varma", trek: "Kedarkantha Winter", date: "2026-01-26", status: "Confirmed", amount: 12800, pax: 4 },
    { _id: "4", bookingId: "BK-899", user: "Priya Das", trek: "Sandakphu Trek", date: "2026-01-25", status: "Cancelled", amount: 9200, pax: 2 },
  ]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      label: "Booking ID",
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
            <FaTicketAlt size={12} />
          </div>
          <span className="font-black text-gray-900">{row.bookingId}</span>
        </div>
      )
    },
    {
      label: "Traveler",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
            <FaUser size={10} />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-xs">{row.user}</p>
            <p className="text-[10px] text-gray-400 font-medium">{row.pax} Person(s)</p>
          </div>
        </div>
      )
    },
    {
      label: "Trek Expedition",
      render: (row) => (
        <div className="flex items-center gap-2">
          <FaMountain className="text-gray-300" />
          <span className="font-bold text-gray-700 text-xs">{row.trek}</span>
        </div>
      )
    },
    {
      label: "Amount",
      render: (row) => (
        <span className="font-black text-emerald-700">₹ {row.amount.toLocaleString()}</span>
      )
    },
    {
      label: "Status",
      render: (row) => {
        const colors = {
          Confirmed: "bg-emerald-100 text-emerald-700 border-emerald-200",
          Pending: "bg-amber-100 text-amber-700 border-amber-200",
          Cancelled: "bg-rose-100 text-rose-700 border-rose-200",
        };
        return (
          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${colors[row.status]}`}>
            {row.status}
          </span>
        );
      }
    },
    {
      label: "Date",
      render: (row) => (
        <span className="text-gray-400 text-[10px] font-bold uppercase">{row.date}</span>
      )
    }
  ];

  const rowActions = [
    { label: "Approve Payment", icon: <FaCheckCircle />, onClick: (row) => alert(`Approving ${row.bookingId}`) },
    { label: "Cancel Booking", icon: <FaTimesCircle />, onClick: (row) => alert(`Cancelling ${row.bookingId}`), variant: 'danger' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
            <FaTicketAlt />
          </div>
          Manage Bookings
        </h1>
        <p className="text-gray-500 font-medium mt-1">Review and process trek reservations</p>
      </header>

      <div className="bg-white p-2 rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden">
        <DataTable
          columns={columns}
          data={data}
          loading={loading}
          rowActions={rowActions}
        />
      </div>
    </div>
  );
}
