// import { useState, useEffect } from "react";
// import {
//   FiImage,
//   FiEdit,
//   FiTrash2,
//   FiCheckCircle,
//   FiXCircle,
//   FiUpload,
// } from "react-icons/fi";
// import TrekGalleryForm from "./TrekGalleryForm";
// import Modal from "../components/modal/Modal";
// // import { getGalleryItems, deleteGalleryItem } from "../api/galleryApi";

// export default function ManageTrekGallery() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);

//   useEffect(() => {
//     fetchGallery();
//   }, []);

//   const fetchGallery = async () => {
//     try {
//       setLoading(true);
//       const res = await getGalleryItems();
//       setData(res.data || []);
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setLoading(false);
//     }
//   };

//   const handleView = (item) => {
//     setSelectedItem(item);
//     setIsModalOpen(true);
//     setIsEditMode(false);
//   };

//   const handleEdit = (item) => {
//     setSelectedItem(item);
//     setIsModalOpen(true);
//     setIsEditMode(true);
//   };

//   const handleDelete = async (item) => {
//     if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
//       try {
//         await deleteGalleryItem(item.id);
//         fetchGallery();
//       } catch (err) {
//         console.error(err);
//         alert("Failed to delete item");
//       }
//     }
//   };

//   const toggleActive = (item) => {
//     setData((prev) =>
//       prev.map((g) => (g.id === item.id ? { ...g, isActive: !g.isActive } : g)),
//     );
//   };

//   return (
//     <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl md:text-4xl font-black text-gray-900 flex items-center gap-3">
//             <FiImage className="text-emerald-500 bg-emerald-100 p-2 rounded-2xl" />
//             Trek Gallery
//           </h1>
//           <p className="text-gray-500 mt-1">
//             View, edit, and manage all your trek photos
//           </p>
//         </div>
//         <button
//           onClick={() => {
//             setIsEditMode(true);
//             setIsModalOpen(true);
//             setSelectedItem(null);
//           }}
//           className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow-md flex items-center gap-2 mt-4 md:mt-0"
//         >
//           <FiUpload /> Add New Photo
//         </button>
//       </div>

//       {/* Gallery Grid */}
//       {loading ? (
//         <div className="text-center py-20 text-gray-400">
//           Loading gallery items...
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {data.map((item) => (
//             <div
//               key={item.id}
//               className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
//             >
//               <div className="relative">
//                 {item.photo ? (
//                   <img
//                     src={URL.createObjectURL(item.photo)}
//                     alt={item.title}
//                     className="w-full h-56 object-cover"
//                     onClick={() => handleView(item)}
//                   />
//                 ) : (
//                   <div className="w-full h-56 bg-gray-100 flex items-center justify-center text-gray-300 text-4xl">
//                     <FiImage />
//                   </div>
//                 )}
//                 <button
//                   onClick={() => toggleActive(item)}
//                   className="absolute top-2 right-2 p-2 rounded-full bg-white border shadow hover:bg-gray-100 transition"
//                 >
//                   {item.isActive ? (
//                     <FiCheckCircle className="text-green-500" />
//                   ) : (
//                     <FiXCircle className="text-red-500" />
//                   )}
//                 </button>
//               </div>

//               <div className="p-4 space-y-2">
//                 <h3 className="font-black text-gray-900 text-lg truncate">
//                   {item.title}
//                 </h3>
//                 <p className="text-sm text-gray-500">
//                   {item.month} {item.year} • {item.experience}
//                 </p>
//                 <p className="text-sm text-gray-500">Season: {item.season}</p>
//                 <p className="text-sm text-gray-500">Region: {item.region}</p>

//                 <div className="flex justify-end gap-2 mt-2">
//                   <button
//                     onClick={() => handleEdit(item)}
//                     className="px-3 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition text-sm flex items-center gap-1"
//                   >
//                     <FiEdit /> Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(item)}
//                     className="px-3 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition text-sm flex items-center gap-1"
//                   >
//                     <FiTrash2 /> Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Modal for View / Edit */}
//       {isModalOpen && (
//         <Modal
//           isOpen={isModalOpen}
//           onClose={() => {
//             setSelectedItem(null);
//             setIsModalOpen(false);
//             setIsEditMode(false);
//           }}
//           title={isEditMode ? "Edit Gallery Item" : "View Photo"}
//           size="lg"
//         >
//           {isEditMode ? (
//             <TrekGalleryForm
//               onSubmit={() => {
//                 fetchGallery();
//                 setIsModalOpen(false);
//                 setIsEditMode(false);
//               }}
//               initialData={selectedItem}
//             />
//           ) : selectedItem ? (
//             <div className="space-y-6">
//               <div className="w-full h-80 rounded-2xl overflow-hidden border border-gray-100">
//                 {selectedItem.photo ? (
//                   <img
//                     src={URL.createObjectURL(selectedItem.photo)}
//                     alt={selectedItem.title}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300">
//                     <FiImage size={64} />
//                   </div>
//                 )}
//               </div>
//               <div className="space-y-1">
//                 <h2 className="text-2xl font-black text-gray-900">
//                   {selectedItem.title}
//                 </h2>
//                 <p className="text-sm text-gray-500">
//                   {selectedItem.month} {selectedItem.year} •{" "}
//                   {selectedItem.experience}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   Season: {selectedItem.season}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   Region: {selectedItem.region}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   Status: {selectedItem.isActive ? "Active" : "Inactive"}
//                 </p>
//               </div>
//             </div>
//           ) : null}
//         </Modal>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import {
  FiImage,
  FiEdit,
  FiTrash2,
  FiCheckCircle,
  FiXCircle,
  FiUpload,
} from "react-icons/fi";
import TrekGalleryForm from "./TrekGalleryForm";
import Modal from "../components/modal/Modal";
import { useNavigate } from "react-router-dom";

export default function ManageTrekGallery() {
  const Navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Default gallery items
  const defaultGalleryItems = [
    {
      id: 1,
      title: "Harishchandragad Sunrise",
      month: "January",
      year: "2024",
      experience: "Moderate",
      season: "Winter",
      region: "Maharashtra",
      isActive: true,
      photo:
        "https://harishchandragad.in/wp-content/uploads/2022/08/kokankada-sunset-scaled.jpg",
    },
    {
      id: 2,
      title: "Kedarkantha Adventure",
      month: "February",
      year: "2025",
      experience: "Beginner",
      season: "Winter",
      region: "Uttarakhand",
      isActive: true,
      photo:
        "https://gafindia.in/wp-content/uploads/2024/12/indian-himalayas-kedar-kantha01.webp",
    },
    {
      id: 3,
      title: "Roopkund Trek",
      month: "May",
      year: "2024",
      experience: "Advanced",
      season: "Summer",
      region: "Uttarakhand",
      isActive: false,
      photo:
        "https://www.pikaadventure.com/wp-content/uploads/2025/04/blog-details-2.webp",
    },
    {
      id: 4,
      title: "Triund Hill Camping",
      month: "March",
      year: "2024",
      experience: "Beginner",
      season: "Spring",
      region: "Himachal",
      isActive: true,
      photo:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      title: "Valley of Flowers",
      month: "July",
      year: "2024",
      experience: "Moderate",
      season: "Summer",
      region: "Uttarakhand",
      isActive: true,
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQldi6VB10EasZOitGDFbJh8xyeeh74EEZSow&s",
    },
  ];

  // Load default gallery on mount
  useEffect(() => {
    setData(defaultGalleryItems);
  }, []);

  const handleView = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    setIsEditMode(false);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    setIsEditMode(true);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
      setData((prev) => prev.filter((g) => g.id !== item.id));
    }
  };

  const toggleActive = (item) => {
    setData((prev) =>
      prev.map((g) => (g.id === item.id ? { ...g, isActive: !g.isActive } : g)),
    );
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 flex items-center gap-3">
            <FiImage className="text-emerald-500 bg-emerald-100 p-2 rounded-2xl" />{" "}
            Trek Gallery
          </h1>
          <p className="text-gray-500 mt-1">
            View, edit, and manage your trek photos
          </p>
        </div>
        <button
          onClick={() => Navigate("/gallery/create")}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow-md flex items-center gap-2 mt-4 md:mt-0"
        >
          <FiUpload /> Add New Photo
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="relative">
              {item.photo ? (
                <img
                  src={item.photo}
                  alt={item.title}
                  className="w-full h-56 object-cover"
                  onClick={() => handleView(item)}
                />
              ) : (
                <div className="w-full h-56 bg-gray-100 flex items-center justify-center text-gray-300 text-4xl">
                  <FiImage />
                </div>
              )}
              <button
                onClick={() => toggleActive(item)}
                className="absolute top-2 right-2 p-2 rounded-full bg-white border shadow hover:bg-gray-100 transition"
              >
                {item.isActive ? (
                  <FiCheckCircle className="text-green-500" />
                ) : (
                  <FiXCircle className="text-red-500" />
                )}
              </button>
            </div>

            <div className="p-4 space-y-2">
              <h3 className="font-black text-gray-900 text-lg truncate">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500">
                {item.month} {item.year} • {item.experience}
              </p>
              <p className="text-sm text-gray-500">Season: {item.season}</p>
              <p className="text-sm text-gray-500">Region: {item.region}</p>

              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-3 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition text-sm flex items-center gap-1"
                >
                  <FiEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="px-3 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition text-sm flex items-center gap-1"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for View / Edit */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setSelectedItem(null);
            setIsModalOpen(false);
            setIsEditMode(false);
          }}
          title={isEditMode ? "Edit Gallery Item" : "View Photo"}
          size="lg"
        >
          {isEditMode ? (
            <TrekGalleryForm
              onSubmit={() => {
                setIsModalOpen(false);
                setIsEditMode(false);
              }}
              initialData={selectedItem}
            />
          ) : selectedItem ? (
            <div className="space-y-6">
              <div className="w-full h-80 rounded-2xl overflow-hidden border border-gray-100">
                {selectedItem.photo ? (
                  <img
                    src={selectedItem.photo}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300">
                    <FiImage size={64} />
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-gray-900">
                  {selectedItem.title}
                </h2>
                <p className="text-sm text-gray-500">
                  {selectedItem.month} {selectedItem.year} •{" "}
                  {selectedItem.experience}
                </p>
                <p className="text-sm text-gray-500">
                  Season: {selectedItem.season}
                </p>
                <p className="text-sm text-gray-500">
                  Region: {selectedItem.region}
                </p>
                <p className="text-sm text-gray-500">
                  Status: {selectedItem.isActive ? "Active" : "Inactive"}
                </p>
              </div>
            </div>
          ) : null}
        </Modal>
      )}
    </div>
  );
}
