import React, { useState, useEffect, useRef } from "react";

// Import the Display icon
import displayIcon from "../assets/icons/Display.svg";

const DropdownMenu = ({ grouping, ordering, setGrouping, setOrdering }) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility
  const dropdownRef = useRef(null); // Ref for the dropdown container

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false); // Close the dropdown if clicked outside
    }
  };

  useEffect(() => {
    // Attach the click event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup the event listener when the component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      {/* Button to toggle dropdown */}
      <button className="dropdown-button" onClick={toggleDropdown}>
        <img src={displayIcon} alt="Display Icon" className="display-icon" />
        <span className="button-label">Display</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="currentColor"
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-section">
            <label htmlFor="grouping">Grouping</label>
            <select
              id="grouping"
              value={grouping}
              onChange={(e) => setGrouping(e.target.value)}
            >
              <option value="status">Status</option>
              <option value="userId">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="dropdown-section">
            <label htmlFor="ordering">Ordering</label>
            <select
              id="ordering"
              value={ordering}
              onChange={(e) => setOrdering(e.target.value)}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
