import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, Link, NavLink } from "react-router-dom";
import inc_logo from "../assets/images/logo.png";
import "./styles/navbar.css";
import { IoClose } from "react-icons/io5";
import Buttons from "./buttons";
import { MdKeyboardArrowDown } from "react-icons/md";

function Navbar() {
  const [selected, setSelected] = useState("#home");
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [navbar, setNavbar] = useState(true)

  useEffect(() => {
    setSelected(location?.hash || "#home");
  }, [location]);

  function toggleMenu() {
    setShowOptions(false)
    setshowCommitteeOptions(false)
    mobileMenuRef.current.classList.toggle("hidden");
    navbar ? setNavbar(false) : setNavbar(true)
  }

  const handleSelect = (e) => {
    if (e.target.value === "Register") return;
    if (e.target.value === "Judge") {
      navigate('/register/judge')
      return
    };
    if (e.target.value === "Hackathon") {
      window.location.href = "https://techfiesta.pict.edu/register"
      return
    };
    navigate(`/register/events/${e.target.value.toLowerCase()}`);
  };

  const [showOptions, setShowOptions] = useState(false);
  const [showCommitteeOptions, setshowCommitteeOptions] = useState(false);

  const closeNavbar = () => {
    setShowOptions(false)
    mobileMenuRef.current.classList.toggle("hidden");
    navbar ? setNavbar(false) : setNavbar(true)
  };

  const closeCommittee = () => {
    setshowCommitteeOptions(false)
    mobileMenuRef.current.classList.toggle("hidden");
    navbar ? setNavbar(false) : setNavbar(true)
  }


  return (
    <>
      {/* <div className="z-999 w-full bg-[#000] text-center p-4">
        <span className="text-gold font-bold text-xl">Notice: </span><Link to='/allocations/labs' className="underline decoration-dotted decoration-gold underline-offset-4 text-2xl">Click Here for Lab Allocations</Link>
      </div> */}
      <nav className="navbar sticky w-full ">
        <div className="shadow-lg shadow-light_blue/20  w-full  border border-light_blue/50 bg-light_blue/30 backdrop-blur">
          <div className="max-w-full mx-auto px-4 py-2 text-white">
            <div className="flex justify-between text-lg">
              <div className="flex space-x-7">
                <a
                  href="https://pictinc.org"
                  className="flex items-center py-4 px-2"
                >
                  <img src={inc_logo} alt="inc_Logo" className="h-12 w-12 mr-2" />
                  <span className="font-black text-white text-2xl">
                    PICT InC 2024
                  </span>
                </a>
              </div>
              <div className="hidden lg:flex items-center justify-content space-x-3">
                <NavLink to='/'
                  className={`py-4 px-2 font-semibold transition duration-300`}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/about"
                  activeClassName="active"
                  className={`py-4 px-2  font-semibold transition duration-300`}
                >
                  About
                </NavLink>
                {/* <NavLink to='/schedule'
                  className={`py-4 px-2 border-b-4 font-semibold transition duration-300 ${selected === "#schedule"
                    ? "border-light_blue/80 text-gold"
                    : "hover:text-gold border-transparent"
                    }`}
                >
                  Schedule
                </NavLink> */}
                <NavLink to='/events'
                  className={`py-4 px-2  font-semibold transition duration-300`}
                >
                  Events
                </NavLink>
                {/* <a
                  href="https://techfiesta.pict.edu/"
                  className={`py-2 px-2 border-b-4 font-semibold transition duration-300 ${selected === "#winners"
                    ? "border-sky-800/80 text-gold"
                    : "hover:text-gold border-transparent"
                    }`}
                >
                  Hackathon
                </a> */}

                <NavLink to='/sponsors'
                  className={`py-4 px-2 font-semibold transition duration-300`}
                >
                  Sponsors
                </NavLink>
                <NavLink to='/committee'
                  className={`py-4 px-2  font-semibold transition duration-300 `}
                >
                  Committees
                </NavLink>

                <NavLink to='/winners'
                  className={`py-2 px-2 font-semibold transition duration-300 `}
                >
                  Winners
                </NavLink>
                <NavLink to='/slots'
                  className={`py-2 px-2 font-semibold transition duration-300 `}
                >
                  Slots
                </NavLink>
                <select
                  className="py-4 px-6 text-white font-semibold hover:text-gold border-transparent hover:border-light_blue/80 bg-faint_blue/30 hover:bg-faint_blue/10 rounded-xl border transition duration-300"
                  defaultValue={"Register"}
                  onClick={handleSelect}
                >
                  <option disabled>Register</option>
                  <option>Impetus</option>
                  <option>Concepts</option>
                  <option>Pradnya</option>
                  {/* <option>Judge</option> */}
                  {/* <option>Hackathon</option> */}

                  {/* <option>Winners</option> */}

                </select>
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
                  onClick={(_) => toggleMenu()}
                >
                  <IoClose className=" text-3xl font-extrabold text-light_blue/80" />

                </button>}

              </div>
            </div>
          </div>

          <div
            className="hidden lg:hidden mobile-menu text-center flex item-center flex-col m-auto w-1/2"
            ref={mobileMenuRef}
          >
            <NavLink to="/"
              className={`py-2 px-2 font-semibold transition duration-300 `}
              activeClassName="active"
              onClick={closeNavbar}
            >
              Home
            </NavLink>
            <NavLink to="/about"
              className={`py-2 px-2  font-semibold transition duration-300`}
              activeClassName="active"
              onClick={closeNavbar}
            >
              About
            </NavLink>

            {/* Add /schedule  */}
            <Link to="/"
              className={`py-2 px-2 font-semibold transition duration-300 `}
              // activeClassName="active"
              onClick={closeNavbar}
            >
              Schedule
            </Link>

            <NavLink to="/events"
              className={`py-2 px-2 font-semibold transition duration-300 `}
              activeClassName="active"
              onClick={closeNavbar}>
              Events
            </NavLink>

            <NavLink to="/sponsors"
              className={`py-2 px-2 font-semibold transition duration-300 `}
              activeClassName="active"
              onClick={closeNavbar}>
              Sponsors
            </NavLink>

            <NavLink to="/winners"
              className={`py-2 px-2 font-semibold transition duration-300`}
              activeClassName="active"
              onClick={closeNavbar}>
              Winners
            </NavLink>

            {/* COMMITTEE  */}
            <div className="flex flex-col rounded-md">
              <button className={`px-2 md:px-6 py-2 text-[#ffffff] font-semibold border-transparent outline-none focus:outline-none rounded-xl  hover:text-gold flex justify-center items-center ${showCommitteeOptions ? 'border-b-none' : ''} `}
                onClick={() => setshowCommitteeOptions(!showCommitteeOptions)}
              >Committees <MdKeyboardArrowDown className="ml-1 font-bold text-2xl" /></button>
              <div className="flex flex-col space-y-2">
                {showCommitteeOptions && (
                  <>
                    <NavLink to="/web-teams"
                      className={`py-2 px-2 text-md font-semibold transition duration-300`}
                      activeClassName="active"
                      onClick={closeCommittee}>
                      Web Committee
                    </NavLink>
                    <NavLink to="/core-teams"
                      className={`py-2 px-2 text-md font-semibold transition duration-300`}
                      activeClassName="active"
                      onClick={closeCommittee}>
                      Core Committee
                    </NavLink>
                    <NavLink
                      to="/faculty-teams"
                      className="py-2 px-2 text-md  font-semibold transition duration-300 "
                      onClick={closeCommittee}
                    >
                      Faculty Committees
                    </NavLink>
                  </>
                )}
              </div>
            </div>

            {/* REGISTER  */}
            <div className="flex flex-col rounded-md mb-10 mt-5">
              <button className={`px-2 md:px-6 py-4 text-white font-semibold border-transparent outline-none focus:outline-none rounded-xl bg-faint_blue/30  hover:text-gold flex justify-center items-center ${showOptions ? 'border-b-none' : ''} `}
                onClick={() => setShowOptions(!showOptions)}
              >Register <MdKeyboardArrowDown className="ml-1 font-bold text-2xl" /></button>
              <div className="flex flex-col space-y-2 bg-faint_blue/10 rounded-md">
                {showOptions && (
                  <>
                    <NavLink
                      to="/register/events/concepts"
                      className=" px-2 font-semibold transition duration-300 pt-5"
                      onClick={closeNavbar}
                    >
                      Concepts
                    </NavLink>
                    <NavLink
                      to="/register/events/impetus"
                      className="py-2 px-2 font-semibold transition duration-300 "
                      onClick={closeNavbar}
                    >
                      Impetus
                    </NavLink>
                    <NavLink
                      to="/register/events/pradnya"
                      className="py-2 px-2 font-semibold transition duration-300"
                      onClick={closeNavbar}
                    >
                      Pradnya
                    </NavLink>
                  </>
                )}
              </div>
            </div>



          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

// import { useEffect, useRef, useState } from "react";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import inc_logo from "../assets/images/logo.png";
// import "./styles/navbar.css";
// import Winners from "../pages/winners_inc23";
// function Navbar() {
//   const [selected, setSelected] = useState("#home");
//   const mobileMenuRef = useRef(null);
//   const navigate = useNavigate();
//   const location = useLocation();


//   // const handleWinnersClick = () => {
//   //   // Navigate to the Winners page
//   //   history.push('/events/Winners');
//   // };

//   useEffect(() => {
//     setSelected(location?.hash || "#home");
//   }, [location]);

//   function toggleMenu() {
//     mobileMenuRef.current.classList.toggle("hidden");
//   }
//   const handleclick = (e) => {
//     if (e.target.value === "Register") return;
//     navigate(`/register/events/winners`);
//   };

//   const handleSelect = (e) => {
//     if (e.target.value === "Register") return;
//     if (e.target.value === "Judge") {
//       navigate('/register/judge')
//       return
//     };
//     navigate(`/register/events/${e.target.value.toLowerCase()}`);
//   };

//   return (
//     <>
//       {/* <div className="z-999 w-full bg-[#000] text-center p-4">
//         <span className="text-gold font-bold text-xl">Notice: </span><Link to='/allocations/labs' className="underline decoration-dotted decoration-gold underline-offset-4 text-2xl">Click Here for Lab Allocations</Link>
//       </div> */}
//       <nav className="navbar sticky w-full ">
//         <div className="shadow-lg shadow-light_blue/20  w-full  border border-light_blue/50 bg-light_blue/30 backdrop-blur">
//           <div className="max-w-full mx-auto px-4 py-2 text-white">
//             <div className="flex justify-between text-lg">
//               <div className="flex space-x-7">
//                 <a
//                   href="https://pictinc.org"
//                   className="flex items-center py-4 px-2"
//                 >
//                   <img
//                     src={inc_logo}
//                     alt="inc_Logo"
//                     className="h-12 w-12 mr-2"
//                   />
//                   <span className="font-black text-white text-2xl">
//                     PICT InC 2024
//                   </span>
//                 </a>
//               </div>
//               <div className="hidden lg:flex items-center justify-content space-x-3">
//                 <a
//                   href="/#home"
//                   className={`py-4 px-2 border-b-4 font-semibold transition duration-300 ${
//                     selected === "#home"
//                       ? "border-light_blue/80 text-gold"
//                       : "hover:text-gold border-transparent"
//                   }`}
//                 >
//                   Home
//                 </a>
//                 <a
//                   href="/#about"
//                   className={`py-4 px-2 border-b-4 font-semibold transition duration-300 ${
//                     selected === "#about"
//                       ? "border-light_blue/80 text-gold"
//                       : "hover:text-gold border-transparent"
//                   }`}
//                 >
//                   About
//                 </a>
//                 <a
//                   href="/#events"
//                   className={`py-4 px-2 border-b-4 font-semibold transition duration-300 ${
//                     selected === "#events"
//                       ? "border-light_blue/80 text-gold"
//                       : "hover:text-gold border-transparent"
//                   }`}
//                 >
//                   Events
//                 </a>

//                 <a
//                   href="/#schedule"
//                   className={`py-4 px-2 border-b-4 font-semibold transition duration-300 ${
//                     selected === "#schedule"
//                       ? "border-light_blue/80 text-gold"
//                       : "hover:text-gold border-transparent"
//                   }`}
//                 >
//                   Schedule
//                 </a>

//                 <a
//                   href="/#sponsors"
//                   className={`py-4 px-2 border-b-4 font-semibold transition duration-300 ${
//                     selected === "#contact"
//                       ? "border-light_blue/80 text-gold"
//                       : "hover:text-gold border-transparent"
//                   }`}
//                 >
//                   Sponsors
//                 </a>
//                 <a
//                   href="/#team"
//                   className={`py-4 px-2 border-b-4 font-semibold transition duration-300 ${
//                     selected === "#team"
//                       ? "border-light_blue/80 text-gold"
//                       : "hover:text-gold border-transparent"
//                   }`}
//                 >
//                   Team
//                 </a>
//                 {/* <button
//         onClick={handleWinnersClick}
//         className={`py-4 px-2 border-b-4 font-semibold transition duration-300`}
//       >
//         Winners
//       </button> */}
//                 {/* <Link
//   to="/register/events/winners"
//   className={`py-4 px-2 border-b-4 font-semibold transition duration-300 ${selected === "/Winners"
//     ? "border-light_blue/80 text-gold"
//     : "hover:text-gold border-transparent"
//   }`} */}
//                 <select
//                   className="py-4 px-6 text-white font-semibold hover:text-gold border-transparent hover:border-light_blue/80 bg-faint_blue/30 hover:bg-faint_blue/10 rounded-xl border transition duration-300"
//                   defaultValue={"Register"}
//                   onClick={handleSelect}
//                 >
//                   <option disabled>Register</option>
//                   <option>Impetus</option>
//                   <option>Concepts</option>
//                   <option>Pradnya</option>
//                   <option>Winners</option>
//                 </select>
//               </div>

//               <div className="lg:hidden flex items-center">
//                 <button
//                   className="outline-none menu-button"
//                   onClick={(_) => toggleMenu()}
//                 >
//                   <svg
//                     className="w-8 h-8 text-light_blue/80"
//                     x-show="! showMenu"
//                     fill="none"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     viewBox="0 00 24 24"
//                     stroke="currentColor"
//                   >
//                     <path d="m4 6h16M4 12h16M4 18h16"></path>
//                   </svg>
//                 </button>
//               </div>
//             </div>
//             <div
//               className="hidden lg:hidden mobile-menu text-center flex item-center flex-col m-auto w-1/2"
//               ref={mobileMenuRef}
//             >
//               <a
//                 href="/#home"
//                 className={`py-2 px-2 border-b-4 font-semibold transition duration-300 ${
//                   selected === "#home"
//                     ? "border-sky-800/80 text-gold"
//                     : "hover:text-gold border-transparent"
//                 }`}
//               >
//                 Home
//               </a>
//               <a
//                 href="#about"
//                 className={`py-2 px-2 border-b-4 font-semibold transition duration-300 ${
//                   selected === "#about"
//                     ? "border-sky-800/80 text-gold"
//                     : "hover:text-gold border-transparent"
//                 }`}
//               >
//                 About
//               </a>
//               <a
//                 href="#schedule"
//                 className={`py-2 px-2 border-b-4 font-semibold transition duration-300 ${
//                   selected === "#schedule"
//                     ? "border-sky-800/80 text-gold"
//                     : "hover:text-gold border-transparent"
//                 }`}
//               >
//                 Schedule
//               </a>
//               <a
//                 href="#events"
//                 className={`py-2 px-2 border-b-4 font-semibold transition duration-300 ${
//                   selected === "#events"
//                     ? "border-sky-800/80 text-gold"
//                     : "hover:text-gold border-transparent"
//                 }`}
//               >
//                 Events
//               </a>

//               <a
//                 href="#sponsors"
//                 className={`py-2 px-2 border-b-4 font-semibold transition duration-300 ${
//                   selected === "#contact"
//                     ? "border-sky-800/80 text-gold"
//                     : "hover:text-gold border-transparent"
//                 }`}
//               >
//                 Sponsors
//               </a>

//               <a
//                 href="#team"
//                 className={`py-2 px-2 border-b-4 font-semibold transition duration-300 ${
//                   selected === "#team"
//                     ? "border-sky-800/80 text-gold"
//                     : "hover:text-gold border-transparent"
//                 }`}
//               >
//                 Team
//               </a>

//               <select
//                 className="mt-2 py-4 px-4 font-semibold hover:text-gold border-transparent hover:border-sky-800/80 bg-blue-600/30 hover:bg-blue-600/10 rounded-xl border transition duration-300"
//                 defaultValue={"Register"}
//                 onClick={handleSelect}
//               >
//                 <option disabled>Register</option>
//                 <option>Impetus</option>
//                 <option>Concepts</option>
//                 <option>Pradnya</option>
//                 <option>Hakton</option>
//                 <option>Judges</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }

// export default Navbar;
