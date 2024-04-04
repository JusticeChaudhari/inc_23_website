import { useState, lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ToastUtils, Navbar, Loader, Footer, EventCards, Sponsors } from './components';
import { EventDetails, RegistrationsForms, Payment, Admin, InCTeams, WebTeam, Homepage, Auth, Gallery, FacultyTeam, ProjectsLabsAllocations } from './pages';
import Slots from './pages/slots.jsx';
import Test from './test/test.jsx';
import ProtectedRoutes from './routes/ProtectedRoutes';
import './App.css';
import Judge from './pages/judge';
import Winners from './pages/winners_inc23.jsx';
import JudgeProtectedRoutes from './routes/JudgeProtectedRoutes.js';
import AboutUs from './components/aboutUs.jsx';
import Committee from './components/committee.jsx';
import ReferralConcepts from './pages/referral/referralConcepts.jsx';
import Referral from './pages/referral/index.js';
import Schedule from './components/schedule.jsx';
import InsideTeamConcepts from './components/forms/registrations/inside_team_concepts.jsx';
import InsideTeamImpetus from './components/forms/registrations/inside_team_impetus.jsx';
import UpdateAbstract from './pages/abstract/updateAbstract.jsx';
import Attendance from './pages/admin/attendance.jsx'
import InsideTeamPradnya from './components/forms/registrations/inside_team_pradnya.jsx';

function MainApp() {
  const [loading, setLoading] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const isAuth = window.location.pathname.startsWith('/auth');
    const isJudgeRoute = window.location.pathname.startsWith('/judge');
    const isAdminRoute = window.location.pathname.startsWith('/admin');
    setShowNavbar(!(isAdminRoute || isJudgeRoute || isAuth));
  }, []);



  return (
    <BrowserRouter>
      <ToastUtils />
      {showNavbar && <Navbar />}
      {loading ? <Loader /> : <></>}
      <Routes>
        <Route index element={<Homepage />} />
        <Route path='/event-details/:eventName' element={<EventDetails />} />
        <Route path='/allocations/labs' element={<ProjectsLabsAllocations />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/register/*' element={<RegistrationsForms />} />
        {/* even after the Registrations are closed  */}
        <Route path='/event/register/concepts' element={<InsideTeamConcepts />} />
        <Route path='/event/register/impetus' element={<InsideTeamImpetus />} />
        <Route path='/event/register/pradnya' element={<InsideTeamPradnya />} />

        {/* <Route path='/gallery' element={<Gallery />} /> */}
        <Route path='/payment/:id' element={<Payment />} />
        <Route path='/admin/*' element={<ProtectedRoutes children={<Admin />} />} />
        <Route path='/judge/*' element={<JudgeProtectedRoutes children={<Judge />} />} />
        <Route path='/winners' element={<Winners />} />
        <Route path='/inc-teams' element={<InCTeams />} />
        <Route path='/web-teams' element={<WebTeam />} />
        <Route path='/faculty-teams' element={<FacultyTeam />} />
        <Route path='/core-teams' element={<InCTeams />} />
        <Route path='/events' element={<EventCards />} />
        <Route path='/sponsors' element={<Sponsors />} />
        <Route path='/slots' element={<Slots />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/committee' element={<Committee />} />
        <Route path='/schedule' element={<Schedule />} />
        <Route path='/attendance' element={<Attendance/>}/>
        {/* REFERRAL FORMS  */}
        <Route path='/referral/*' element={<Referral />} />
        {/* UPDATE ABSTRACT  */}
        <Route path='/update/abstract' element={<UpdateAbstract />} />

        {process.env.REACT_APP_ENVIRONMENT === 'development' &&
          <Route path='/test' element={
            <Suspense fallback={<>...</>}>
              <Test />
            </Suspense>
          } />
        }
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

function App() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <MainApp />
    </Suspense>
  );
}

export default App;