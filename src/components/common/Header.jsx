import { FaBars, FaBell } from "react-icons/fa";

export default function Header({ onToggleSidebar }) {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* LEFT: Hamburger + Title */}
      <div className="flex items-center gap-4">
        {/* Hamburger for collapsing sidebar */}
    

        {/* Dashboard Title */}
        <h2 className="font-semibold text-xl text-gray-800">
          Admin Dashboard
        </h2>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="p-2 rounded-full hover:bg-gray-100 transition relative">
          <FaBell className="text-gray-700" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2">
          <img
            src="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg"
            alt="Admin Avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-gray-700 font-medium">Admin</span>
        </div>

        {/* Logout */}
        <button className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition">
          Logout
        </button>
      </div>
    </header>
  );
}
 