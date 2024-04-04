import { useEffect, useState } from "react";
import {
  Hero,
  Schedule,
  EventCards,
  Sponsors,
  InCTeamsSection,
} from "../components";
import AboutUs from "../components/aboutUs";
import Popup from "../components/popup";
import "./styles/homepage.css";

function Homepage() {
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const popupShown = localStorage.getItem("popupShown");
    if (!popupShown) {
      setShowPopup(true);
      localStorage.setItem("popupShown", true);
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <div className="homepage">
      {showPopup && <Popup handleClose={handleClosePopup} />}
      <div className="notice">
        <div className="notice-content">
          <span >⚠️  Registrations have been closed. </span>
        </div>
      </div>
      <Hero />
      <AboutUs />
      {/* <Schedule /> */}
      <EventCards />
      <Sponsors />
      <InCTeamsSection />
    </div>
  );
}

export default Homepage;
