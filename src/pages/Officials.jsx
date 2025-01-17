import { useState, useEffect } from "react";
import OfficialsModal from "../Modal/OfficialsModal";
import EditOfficialModal from "../Modal/EditOfficialModal";
import "../App.css";
import axios from "axios";

import { FaPlus, FaEdit, FaFileExport } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Officials() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit modal
  const [deleteModal, setIsdeleteModal] = useState(false);
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [officials, setOfficials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOfficial, setSelectedOfficial] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Function to open and close edit modal
  const openEditModal = (official) => {
    setSelectedOfficial(official);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => setIsEditModalOpen(false);

  function closeDeleteModal() {
    setIsdeleteModal(false);
    setSelectedOfficial(null);
  }

  const handleEntriesChange = (event) => {
    setEntriesToShow(Number(event.target.value));
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchOfficials = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/officials`);
        setOfficials(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOfficials();
  }, []);

  const totalPages = Math.ceil(officials.length / entriesToShow);
  const startIndex = (currentPage - 1) * entriesToShow;
  const endIndex = startIndex + entriesToShow;

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleDelete = async () => {
    if (selectedOfficial && selectedOfficial._id) {
      try {
        await axios.delete(`${API_BASE_URL}/api/officials/${selectedOfficial._id}`);
        setOfficials(officials.filter((official) => official._id !== selectedOfficial._id));
      } catch (err) {
        setError(err.message);
      } finally {
        closeDeleteModal();
      }
    } else {
      console.error("No official selected for deletion");
    }
  };

  const handleEditSave = async (updatedOfficial) => {
    if (updatedOfficial && updatedOfficial._id) {
      try {
        await axios.put(`${API_BASE_URL}/api/officials/${updatedOfficial._id}`, updatedOfficial);
        setOfficials(
          officials.map((official) =>
            official._id === updatedOfficial._id ? updatedOfficial : official
          )
        );
      } catch (err) {
        setError(err.message);
      } finally {
        closeEditModal();
      }
    } else {
      console.error("No official selected for editing");
    }
  };

  const filteredOfficials = officials.filter((official) =>
    official.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="">
      <div className="">
        <div className="flex justify-between items-center px-3 h-14 w-full border-b-2 border-gray-400">
          <p className="text-2xl font-semibold">Barangay Officials</p>

          <div className="flex items-center gapy-5">
            <button
              onClick={openModal}
              className="flex justify-center items-center gap-x-1 bg-Green text-white rounded-md px-3 py-1 hover:bg-green-500"
            >
              <FaPlus /> Official
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center py-4">
          <div>
            <label htmlFor="">Show Entries: </label>
            <select
              name="entries"
              id="entries"
              value={entriesToShow}
              onChange={handleEntriesChange}
              className="p-1 px-3 border border-gray-300 rounded-md"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <form action="">
            <label htmlFor="search">Search: </label>
            <input
              type="text"
              name="search"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-Green"
            />
          </form>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-40">
            <div className="loading">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        {error && (
          <p className="bg-red-100 text-red-600 border border-red-500 px-4 py-2 rounded-md">
            Error: {error}
          </p>
        )}

        {filteredOfficials.length === 0 && !loading && (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500 text-lg">There is no record of officials.</p>
          </div>
        )}

        {filteredOfficials.length > 0 && (
          <div className="text-sm">
            <table className="w-full border border-gray-100 border-collapse">
              <thead className="bg-Green">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">
                    Picture
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">
                    Name
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">
                    Position
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">
                    Date Added
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="text-center divide-y divide-gray-300">
                {filteredOfficials.slice(startIndex, endIndex).map((official, index) => (
                  <tr key={index} className="hover:bg-white">
                    <td className="py-4 flex justify-center items-center">
                      <img src={official.imageUrl || "https://via.placeholder.com/50"} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                    </td>
                    <td className="py-3">{official.fullname}</td>
                    <td className="py-3">{official.position}</td>
                    <td className="py-3">
                      {new Date(official.dateAdded).toLocaleDateString()}
                    </td>
                    <td className="py-3">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${official.status === "Active" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                        {official.status}
                      </span>
                    </td>
                    <td className="space-x-2 py-3">
                      <button onClick={() => openEditModal(official)} title="Edit" className="text-xl text-blue-500 hover:text-blue-700 focus:outline-none">
                        <FaEdit />
                      </button>
                      <button onClick={() => { setSelectedOfficial(official); setIsdeleteModal(true); }} title="Delete" className="text-xl text-red-500 hover:text-red-700 focus:outline-none">
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-between items-center p-5 text-sm">
          <button
            onClick={handlePreviousPage}
            className={`p-2 border border-Green rounded-md ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            className={`p-2 border border-Green rounded-md ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      <OfficialsModal isOpen={isModalOpen} onClose={closeModal} />

      {isEditModalOpen && selectedOfficial && (
        <EditOfficialModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          officialData={selectedOfficial}
          onUpdateOfficial={handleEditSave}
        />
      )}

      {deleteModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <IoWarningOutline className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Confirmation</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this official? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleDelete}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={closeDeleteModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Officials;