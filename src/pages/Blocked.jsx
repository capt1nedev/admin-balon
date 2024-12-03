import { useState } from 'react';
import ResidenceModal from '../Modal/ResidenceModal';
import {useNavigate} from 'react-router-dom'
import ViewResidentProfile from '../view/ViewResidentProfile';
import BlocklistModal from '../Modal/BlocklistModal';
import '../App.css'

import { FaPlus, FaEdit, FaFileExport, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ImBlocked } from "react-icons/im";
import { BsPersonFillDash } from "react-icons/bs";
import {RiArrowDownSLine} from "react-icons/ri"
import {IoWarningOutline} from "react-icons/io5"
import { IoMdSearch } from "react-icons/io";

function Blocked() {

  const [deleteModal, setIsDeleteModal] = useState(false);
  const [blockModal, setIsBlockModal] = useState(false);
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownIndex, setDropdownIndex] = useState(null);

  const navigate = useNavigate();

  const handleAction = (action) => {
    switch (action) {
      case 'edit':
        navigate('/edit-form');
        break;
      case 'viewDetails':
        navigate('/view-resident-profile');
        break;
      case 'delete':
        setIsDeleteModal(true);
        break;
      case 'unblock':
        setIsBlockModal(true);
        break;
      default:
        break;
    }
    setDropdownIndex(null);
  };

  const handleEntriesChange = (event) => {
    setEntriesToShow(Number(event.target.value));
    setCurrentPage(1);
  }

  const blocked = [
    {fname: 'Justine', mname: 'Ribano', lname: 'Santos', gender: 'Male', age: '21', status: 'Active'},
  ];

  const totalPages = Math.ceil(blocked.length / entriesToShow);
  const startIndex = (currentPage - 1) * entriesToShow;
  const endIndex = startIndex + entriesToShow;

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <section className="hide-scrollbar">
      <div className="">
        <div className="flex justify-between items-center h-16 w-full border-b-2 border-gray-400">
          <p className="text-2xl">Block Listed</p>

          <div>
            <button className="flex justify-center items-center gap-x-1 bg-green-500 text-white rounded-md px-3 py-1 hover:bg-green-600">
              <FaPlus /> Blocklist
            </button>
          </div>
        </div>
        

        <div className="flex justify-between items-center py-3">
          <div>
            <label htmlFor="">Show Entries:  </label>
            <select name="entries" id="entries" value={entriesToShow} onChange={handleEntriesChange} className='p-1 px-2 rounded-md border border-gray-300'>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div className="flex items-center my-2 px-3 bg-gray-300 rounded-full">
            <IoMdSearch className="text-x text-gray-700" />

            <input type="text" placeholder="Search" className="bg-gray-300 p-1.5 w-full outline-none"/>
          </div>
        </div>
        
        <table className="w-full border-collapse">
          <thead className="bg-Green">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Picture</th>
              <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">First Name</th>
              <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Middle Name</th>
              <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Last Name</th>
              <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Gender</th>
              <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Age</th>
              <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Voter Status</th>
              <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody className="text-center divide-y divide-gray-200">

            {blocked.slice(startIndex, endIndex).map((block, index) => (
              <tr key={index} className="hover:bg-gray-200">
                <td className="px-6 py-4 flex justify-center items-center">
                  <img src="https://via.placeholder.com/50" alt="Profile" className="w-10 h-10 rounded-full" />
                </td>
                <td className="px-6 py-3">{block.fname}</td>
                <td className="px-6 py-3">{block.mname}</td>
                <td className="px-6 py-3">{block.lname}</td>
                <td className="px-6 py-3">{block.gender}</td>
                <td className="px-6 py-3">{block.age}</td>
                <td className="px-6 py-3">
                  <span className={`inline-block bg-green-200 text-green-800 rounded-full px-2 py-1 text-xs font-medium ${block.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {block.status}
                  </span>
                </td>
                <td className="relative">
                  <button onClick={() => setDropdownIndex(index === dropdownIndex ? null : index)} className='h-8 border px-3 bg-Green text-White border-Green rounded-md outline-none'>
                    <span className='flex items-center justify-center'>Action <RiArrowDownSLine /></span>
                  </button>
                  {dropdownIndex === index && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                      <button onClick={() => handleAction('edit')} className="flex items-center px-4 py-2 text-md text-Green hover:bg-gray-100 w-full">
                        <FaEdit className="mr-2"/> Edit
                      </button>
                      <button onClick={() => handleAction('viewDetails')} className="flex items-center px-4 py-2 text-md text-Blue hover:bg-gray-100 w-full">
                        <FaEye className="mr-2"/> View Details
                      </button>
                      <button onClick={() => handleAction('delete')} className="flex items-center px-4 py-2 text-md text-Red hover:bg-gray-100 w-full">
                        <MdDelete className="mr-2"/> Delete
                      </button>
                      <button onClick={() => handleAction('unblock')} className="flex items-center px-4 py-2 text-md text-gray-700 hover:bg-gray-100 w-full">
                        <BsPersonFillDash className="mr-2"/> Unblock
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* This is for Previous and Next Button */}
        <div className="flex justify-between items-center p-5">
          <button
            onClick={handlePreviousPage}
            className={`p-2 border border-Green rounded-md ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={handleNextPage}
            className={`p-2 border border-Green rounded-md ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* This is Modal for Delete Button in Action */}
      {deleteModal && 
        <div className='fixed top-0 left-0 m-0 h-full w-full flex justify-center items-center z-50'>
          <div className='bg-white w-96 h-72 rounded-xl shadow-xl drop-shadow-xl flex flex-col justify-center items-center gap-y-5'>
            <IoWarningOutline className='text-6xl p-2 rounded-full bg-red-200 text-red-600 font-bold'/>
            <p className='text-center px-5'>This action cannot be undone. All information of this person will be lost.</p>
            <div className='w-full px-5 flex flex-col gap-y-3'>
              <button className='bg-Red text-White w-full p-1 rounded-md font-semibold'>Delete</button>
              <button onClick={() => setIsDeleteModal(false)} className='text-black w-full p-1 rounded-md border border-gray-300 font-semibold'>Cancel</button>
            </div>
          </div>
        </div>
      }

      {/* This is Modal for Block Button in Action */}
      {blockModal && 
        <div className='fixed top-0 left-0 m-0 h-full w-full flex justify-center items-center z-50'>
          <div className='bg-white w-96 h-72 rounded-xl shadow-xl drop-shadow-xl flex flex-col justify-center items-center gap-y-5'>
            <IoWarningOutline className='text-6xl p-2 rounded-full bg-red-200 text-black font-bold'/>
            <p className='text-center px-5'>Are you sure you want to Unblock this person?</p>
            <div className='w-full px-5 flex flex-col gap-y-3'>
              <button className='bg-black text-White w-full p-1 rounded-md font-semibold'>Unblock</button>
              <button onClick={() => setIsBlockModal(false)} className='text-black w-full p-1 rounded-md border border-gray-300 font-semibold'>Cancel</button>
            </div>
          </div>
        </div>
      }

    </section>
  )
}

export default Blocked;