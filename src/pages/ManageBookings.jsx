import { useEffect, useState } from "react";
import {
  FaTicketAlt,
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaCalendarCheck,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaEye,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";

import DataTable from "../components/table/DataTable";
import Modal from "../components/modal/Modal";

export default function ManageBookings() {
  const [data, setData] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editBooking, setEditBooking] = useState(null);

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  /* ---------------- MOCK DATA (Replace with API) ---------------- */
  useEffect(() => {
    setData([
      {
        _id: "BK-1021",
        name: "karan sharma",
        phone: "+91 9876543210",
        email: "karan@gmail.com",
        trek: "Harishchandragad Trek",
        date: "2026-02-15",
        people: 4,
        status: "Confirmed",
        createdAt: "10:45 AM",
      },
      {
        _id: "BK-1022",
        name: "Amit Patil",
        phone: "+91 9123456780",
        email: "amit@gmail.com",
        trek: "Rajgad Night Trek",
        date: "2026-03-01",
        people: 2,
        status: "Pending",
        createdAt: "02:15 PM",
      },
    ]);
  }, []);

  /* ---------------- Handlers ---------------- */
  const handleView = (row) => {
    setSelectedBooking(row);
    setIsViewOpen(true);
  };

  const handleEdit = (row) => {
    setEditBooking(row);
    setIsEditOpen(true);
  };

  const handleDelete = (row) => {
    if (window.confirm(`Delete booking ${row._id}?`)) {
      setData((prev) => prev.filter((b) => b._id !== row._id));
    }
  };

  const handleUpdateBooking = (e) => {
    e.preventDefault();

    setData((prev) =>
      prev.map((b) => (b._id === editBooking._id ? editBooking : b)),
    );

    setIsEditOpen(false);
    alert("Booking updated successfully");
  };

  /* ---------------- Table Columns ---------------- */
  const columns = [
    {
      label: "Booking",
      render: (row) => (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <FaTicketAlt />
          </div>
          <div>
            <p className="font-black text-gray-900">{row._id}</p>
            <p className="text-[10px] uppercase font-bold text-gray-400">
              {row.trek}
            </p>
          </div>
        </div>
      ),
    },
    {
      label: "Customer",
      render: (row) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-bold text-gray-700">
            <FaUser size={12} /> {row.name}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <FaPhoneAlt size={10} /> {row.phone}
          </div>
        </div>
      ),
    },
    {
      label: "Date / PAX",
      render: (row) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
            <FaCalendarCheck /> {row.date}
          </div>
          <div className="text-[10px] text-gray-400 font-bold uppercase">
            <FaUsers className="inline mr-1" /> {row.people} People
          </div>
        </div>
      ),
    },
    {
      label: "Status",
      render: (row) => {
        if (row.status === "Confirmed") {
          return (
            <span className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 text-[10px] font-black uppercase">
              <FaCheckCircle /> Confirmed
            </span>
          );
        }
        if (row.status === "Pending") {
          return (
            <span className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-600 rounded-xl border border-amber-100 text-[10px] font-black uppercase">
              <FaClock /> Pending
            </span>
          );
        }
        return (
          <span className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-xl border border-red-100 text-[10px] font-black uppercase">
            <FaTimesCircle /> Cancelled
          </span>
        );
      },
    },
  ];

  const rowActions = [
    { label: "View Booking", icon: <FaEye />, onClick: handleView },
    { label: "Edit Booking", icon: <FaEdit />, onClick: handleEdit },
    {
      label: "Delete Booking",
      icon: <FaTrashAlt />,
      onClick: handleDelete,
      variant: "danger",
    },
  ];

  /* ---------------- JSX ---------------- */
  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-emerald-100 text-emerald-600">
            <FaTicketAlt size={22} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900">
              Manage Bookings
            </h1>
            <p className="text-gray-500 font-medium">
              Track, edit and manage trek reservations
            </p>
          </div>
        </header>

        {/* Table */}
        <DataTable columns={columns} data={data} rowActions={rowActions} />
      </div>

      {/* ---------------- View Modal ---------------- */}

      <Modal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        title="Booking Details"
        size="lg"
      >
        {selectedBooking && (
          <div className="bg-[#F7FAF9] rounded-2xl p-8">
            {/* CARD */}
            <div className="bg-white rounded-2xl border border-[#E4EFEA] p-8 space-y-8">
              {/* GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoRow label="Customer Name" value={selectedBooking.name} />
                <InfoRow label="Email" value={selectedBooking.email} />
                <InfoRow label="Phone" value={selectedBooking.phone} />
                <InfoRow label="Booking ID" value={selectedBooking._id} />
                <InfoRow label="Trek" value={selectedBooking.trek} />
                <InfoRow label="Departure Date" value={selectedBooking.date} />
                <InfoRow
                  label="People"
                  value={`${selectedBooking.people} PAX`}
                />

                <div
                  className="flex items-center justify-between bg-[#F7FAF9]
            border border-[#E4EFEA] rounded-xl px-5 py-4"
                >
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#6B8B82]">
                      Status
                    </p>
                    <p className="text-lg font-semibold text-[#1F2D2A]">
                      {selectedBooking.status}
                    </p>
                  </div>
                  <span className="h-3 w-3 rounded-full bg-[#8FB8A8]" />
                </div>
              </div>

              {/* ACTION */}
              <div className="flex justify-end pt-6 border-t border-[#E4EFEA]">
                <button
                  onClick={() => handleEdit(selectedBooking)}
                  className="
              px-8 py-3 rounded-xl font-medium
              bg-[#1F2D2A] text-white
              hover:bg-[#172421]
              transition
            "
                >
                  Edit Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* ---------------- Edit Modal ---------------- */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Booking"
        size="lg"
      >
        {editBooking && (
          <form
            onSubmit={handleUpdateBooking}
            className="space-y-6 animate-in fade-in slide-in-from-bottom-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EditField
                label="Customer Name"
                value={editBooking.name}
                onChange={(e) =>
                  setEditBooking({ ...editBooking, name: e.target.value })
                }
              />
              <EditField
                label="Phone"
                value={editBooking.phone}
                onChange={(e) =>
                  setEditBooking({ ...editBooking, phone: e.target.value })
                }
              />
              <EditField
                label="Email"
                value={editBooking.email}
                onChange={(e) =>
                  setEditBooking({ ...editBooking, email: e.target.value })
                }
              />
              <EditField
                label="Departure Date"
                type="date"
                value={editBooking.date}
                onChange={(e) =>
                  setEditBooking({ ...editBooking, date: e.target.value })
                }
              />
              <EditField
                label="No. of People"
                type="number"
                value={editBooking.people}
                onChange={(e) =>
                  setEditBooking({
                    ...editBooking,
                    people: e.target.value,
                  })
                }
              />

              <div>
                <label className="text-[10px] uppercase font-black text-gray-400">
                  Booking Status
                </label>
                <select
                  value={editBooking.status}
                  onChange={(e) =>
                    setEditBooking({
                      ...editBooking,
                      status: e.target.value,
                    })
                  }
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 font-bold focus:ring-2 focus:ring-emerald-500"
                >
                  <option>Confirmed</option>
                  <option>Pending</option>
                  <option>Cancelled</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="px-6 py-3 font-bold text-gray-400 hover:text-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-emerald-500/20 flex items-center gap-2"
              >
                <FaCheckCircle /> Save Changes
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}

/* ---------------- Small Components ---------------- */

const Info = ({ label, value }) => (
  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
    <p className="text-[10px] uppercase font-black text-gray-400 mb-1">
      {label}
    </p>
    <p className="font-bold text-gray-800">{value}</p>
  </div>
);

const EditField = ({ label, type = "text", ...props }) => (
  <div>
    <label className="text-[10px] uppercase font-black text-gray-400">
      {label}
    </label>
    <input
      type={type}
      {...props}
      className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 font-bold focus:ring-2 focus:ring-emerald-500"
    />
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="bg-[#F7FAF9] border border-[#E4EFEA] rounded-xl px-5 py-4">
    <p className="text-xs uppercase tracking-widest text-[#6B8B82] mb-1">
      {label}
    </p>
    <p className="text-lg font-semibold text-[#1F2D2A]">{value}</p>
  </div>
);
