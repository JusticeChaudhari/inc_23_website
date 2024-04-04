import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import inc_logo from "../../assets/images/logo.png";
import "../../components/styles/navbar.css";
import { logoutAdmin } from "../../api/index.js";
import { toast } from "../../components/index.js";
import { IoClose } from "react-icons/io5";

function AdminNavbar() {
  const [selected, setSelected] = useState("#home");
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [navbar, setNavbar] = useState(true)

  const [showOptions, setShowOptions] = useState(false);
  const [showCommitteeOptions, setshowCommitteeOptions] = useState(false);

  useEffect(() => {
    // Update selected based on the current path
    const path = location.pathname;
    setSelected(path === "/" ? "#home" : path);
  }, [location]);

  const handleSelect = (e) => {
    // Navigate to the corresponding URL based on the selected option
    navigate(`/admin/allocations/${e.target.value.toLowerCase()}`);
  };

  const handleDeallocationSelect = (e) => {
    // Navigate to the corresponding URL based on the selected option
    navigate(`/admin/deallocation/${e.target.value.toLowerCase()}`);
  };

  const handleLogout = () => {
    logoutAdmin()
    toast.success('logged out')
    navigate('/auth')
  };

  const closeNavbar = () => {
    setShowOptions(false)
    mobileMenuRef.current.classList.toggle("hidden");
    navbar ? setNavbar(false) : setNavbar(true)
  };
  function toggleMenu() {
    setShowOptions(false)
    setshowCommitteeOptions(false)
    mobileMenuRef.current.classList.toggle("hidden");
    navbar ? setNavbar(false) : setNavbar(true)
  }


  return (
    <nav className="navbar sticky w-full">
      <div className="shadow-lg shadow-light_blue/20 w-full border border-light_blue/50 bg-light_blue/30 backdrop-blur">
        <div className="max-w-full mx-auto px-4 py-2 text-white">
          <div className="flex justify-between text-lg">
            <div className="flex space-x-7">
              <a
                href="https://pictinc.org/admin/stats"
                className="flex items-center py-4 px-2"
              >
                <img src={inc_logo} alt="inc_Logo" className="h-12 w-12 mr-2" />
                <span className="font-black text-white text-2xl">
                  PICT InC 2024
                </span>
              </a>
              <div className="hidden lg:flex items-center justify-content space-x-3">
                <NavLink
                  to="/admin/stats"
                  className={`py-4 px-2 font-semibold transition duration-300`}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/admin/events/registrations/view"
                  className={`py-4 px-2 font-semibold transition duration-300`}
                >
                  registrations
                </NavLink>

                <NavLink
                  to="/admin/events/registrations/verify"
                  className={`py-4 px-2 font-semibold transition duration-300`}
                >
                  Verify
                </NavLink>

                <NavLink
                  to="/admin/judges/registrations/view"
                  className={`py-4 px-2 font-semibold transition duration-300`}
                >
                  View Judges
                </NavLink>

                <NavLink
                  to="/admin/evaluationstats"
                  className={`py-4 px-2 font-semibold transition duration-300`}
                >
                  Evaluation Stats
                </NavLink>

                <select
                  className="mt-2 w-40 py-4 px-4 font-semibold text-gold border-transparent bg-faint_blue/30 hover:border-sky-800/80 bg-blue-600/30 hover:bg-blue-600/10 rounded-xl border transition duration-300"
                  defaultValue={"Allocations"}
                  onClick={handleSelect}
                >
                  <option disabled>Allocations</option>
                  <option>Concepts</option>
                  <option>Impetus</option>
                  {/* <option>Pradnya</option> */}
                </select>

                <select
                  className="mt-2 w-40 py-4 px-4 font-semibold text-gold border-transparent bg-faint_blue/30 hover:border-sky-800/80 bg-blue-600/30 hover:bg-blue-600/10 rounded-xl border transition duration-300"
                  defaultValue={"Deallocations"}
                  onClick={handleDeallocationSelect}
                >
                  <option disabled>Deallocations</option>
                  <option>Concepts</option>
                  <option>Impetus</option>
                  {/* <option>Pradnya</option> */}
                </select>


              </div>
            </div>
            <div className='justify-center items-center hidden lg:flex'>
              <button onClick={handleLogout} className="py-4 px-6 text-white font-semibold hover:text-gold border-transparent hover:border-light_blue/80 bg-faint_blue/30 hover:bg-faint_blue/10 rounded-xl border transition duration-300">
                Logout
              </button>
            </div>
            <div className="lg:hidden flex items-center">
              {navbar ? <button
                className="outline-none menu-button"
                onClick={(_) => toggleMenu()}
              >
                <svg
                  className="w-8 h-8 text-light_blue/80"
                  x-show="! showMenu"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 00 24 24"
                  stroke="currentColor"
                >
                  <path d="m4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button> : <button
                className="outline-none menu-button"
                onClick={(_) => toggleMenu()}>
                <IoClose className=" text-3xl font-extrabold text-light_blue/80" />
              </button>}

            </div>
          </div>

          <div
            className="hidden lg:hidden mobile-menu text-center flex item-center flex-col m-auto w-1/2"
            ref={mobileMenuRef}
          >
            <NavLink
              to="/admin/stats"
              className={`py-4 px-2 font-semibold transition duration-300`}
            >
              Home
            </NavLink>
            <NavLink
              to="/admin/events/registrations/view"
              className={`py-4 px-2 font-semibold transition duration-300`}
            >
              View registrations
            </NavLink>

            <NavLink
              to="/admin/events/registrations/verify"
              className={`py-4 px-2 font-semibold transition duration-300`}
            >
              Verify registrations
            </NavLink>

            <NavLink
              to="/admin/judges/registrations/view"
              className={`py-4 px-2 font-semibold transition duration-300`}
            >
              View judges
            </NavLink>

            <div className="flex flex-col justify-center items-center">
              <select
                className="mt-2 w-40 py-4 px-4 font-semibold text-gold border-transparent bg-faint_blue/30 hover:border-sky-800/80 bg-blue-600/30 hover:bg-blue-600/10 rounded-xl border transition duration-300"
                defaultValue={"Allocations"}
                onClick={handleSelect}
              >
                <option disabled>Allocations</option>
                <option>Impetus</option>
                <option>Concepts</option>
                <option>Pradnya</option>
              </select>

              <button onClick={handleLogout} className="py-4 my-2 px-6 text-white font-semibold hover:text-gold border-transparent hover:border-light_blue/80 bg-faint_blue/30 hover:bg-faint_blue/10 rounded-xl border transition duration-300">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav >
  );
}

export default AdminNavbar;
