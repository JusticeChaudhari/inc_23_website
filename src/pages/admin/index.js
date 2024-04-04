import { Route, Routes } from 'react-router-dom';
import Dashboard from '../dashboard';
import VerifyEventRegistration from './verifyEventRegistrations';
import ViewEventRegistrations from './viewEventRegistrations';
import ViewJudges from '../judge/viewJudges';
import Allocations from './allocations/allocations';
import Deallocation from './allocations/deallocation';
import AdminNavBar from './AdminNavbar';


function Admin() {
    return (
        <>
            <AdminNavBar />
            <Routes>
                <Route path='/stats' element={<Dashboard />} />
                <Route path='/events/registrations/verify' element={<VerifyEventRegistration />} />
                <Route path='/events/registrations/view' element={<ViewEventRegistrations />} />
                <Route path='/judges/registrations/view' element={<ViewJudges />} />
                <Route path='/allocations/:eventName' element={<Allocations />} />
                <Route path='/deallocation/:eventName' element={<Deallocation />} />
               
            </Routes>
        </>

    );
}

export default Admin;