import React from 'react';
import { RxDashboard } from 'react-icons/rx';
import { FaUsers, FaCertificate, FaUserTie } from 'react-icons/fa6';
import { FaBullhorn } from 'react-icons/fa';
import { BsClockHistory, BsPersonFillSlash } from 'react-icons/bs';

function NewSidebar({ isSidebarOpen, activeSection, setActiveSection }) {
    
    const menuItems = [
        { label: 'Dashboard', icon: <RxDashboard /> },
        // { label: 'Residence Record', icon: <FaUsers /> },
        { label: 'Certificates', icon: <FaCertificate /> },
        { label: 'Officials', icon: <FaUserTie /> },
        { label: 'Announcement', icon: <FaBullhorn /> },
        { label: 'Block listed', icon: <BsPersonFillSlash /> },
        { label: 'Transaction History', icon: <BsClockHistory /> },
    ];

    return (
        <aside className={`fixed left-3 h-full flex flex-col gap-2 bg-white transition-all duration-300 ${isSidebarOpen ? 'w-56' : 'w-11'}`}>
            {menuItems.map((item) => (
                <button key={item.label} className={`flex items-center gap-2 text-lg p-2 px-3 w-full rounded-lg ${activeSection === item.label ? 'bg-green-300 text-green-800' : 'hover:text-green-600' }`} onClick={() => setActiveSection(item.label)}>
                    {item.icon}
                    {isSidebarOpen && <p className="whitespace-nowrap overflow-hidden">{item.label}</p>}
                </button>
            ))}
        </aside>
    );
}

export default NewSidebar;
