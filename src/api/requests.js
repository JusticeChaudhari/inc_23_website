import axios from 'axios';

axios.defaults.withCredentials = true

const backend = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001',
    validateStatus: function (status) {
        return status >= 200 && status <= 302
    }
})

const loginAdmin = async (data) => await backend.post('/admin/login', data);
const verifyAdmin = async () => await backend.get('/admin/verify');
const verifyJudge = async () => await backend.get('/judge/verify');
const logoutAdmin = async () => await backend.get('/admin/logout');
const registerJudge = (eventName) => async (data) => await backend.post(`/judge/register`, data)
const viewJudges = (eventName) => async () => await backend.get(`/judge/registration/view/${eventName}`);
const registerEventStep1 = (eventName) => async (data) => await backend.post(`/events/${eventName}/step_1`, data);
const registerEventStep2 = (eventName) => async (data) => await backend.post(`/events/${eventName}/step_2`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
const getAddedMembers = (eventName) => async () => await backend.get(`events/${eventName}/step_2`);
const registerEventStep3 = (eventName) => async (data) => await backend.post(`/events/${eventName}/step_3`, data);
const registerEventStep4 = (eventName) => async (data) => await backend.post(`/events/${eventName}/step_4`, data);
const verifyPayment = (eventName) => async (data) => await backend.post(`/events/verify/payment/${eventName}`, data);
const getPendingPayments = (eventName) => async () => await backend.get(`/events/verify/payment/${eventName}`);
const getRegistrations = (eventName) => async () => await backend.get(`/events/registrations/${eventName}`);
const allocateJudge = (eventName) => async (data) => await backend.post(`/allocations/${eventName}/allocate`, data)
const getJudgeAllocations = (jid) => async () => await backend.get(`/judge/allocations/${jid}`)
const deallocateJudge = (eventName) => async (data) => await backend.patch(`/allocations/${eventName}/deallocate`, data)
const evaluateProject = (eventName) => async (data) => await backend.post(`/judge/${eventName}/evaluate`, data)
const getJudge = (jid) => async () => await backend.get(`/judge/${jid}`)
const getLabAllocations = (eventName) => async () => await backend.get(`/allocations/${eventName}/labs`);
const getMemberDetails = (eventName) => async () => await backend.get(`/events/${eventName}/getmemberdetails`);
const getAllocatedProjects = (jid) => async () => await backend.get(`judge/allocations/${jid}`)
// Referral 
const referralConcepts = () => async (data) => await backend.post(`/referral/concepts`, data);
const getAbstract = () => async (pid) => await backend.post(`/events/getabstract`, {pid});
const updateAbstract = () => async (data) => await backend.post(`/events/updateabstract`, data);
const getEvalStats = (event_name) => async () => await backend.get(`/allocations/getevalstats/${event_name}`);

const deleteMemberDetails = (eventName) => async (index) => {
    await backend.post(`/events/${eventName}/deletememberdetails`, { index });
};

export {
    loginAdmin,
    verifyAdmin,
    verifyJudge,
    logoutAdmin,
    registerJudge,
    registerEventStep1,
    registerEventStep2,
    getAddedMembers,
    registerEventStep3,
    registerEventStep4,
    verifyPayment,
    getPendingPayments,
    getRegistrations,
    viewJudges,
    allocateJudge,
    getJudgeAllocations,
    deallocateJudge,
    evaluateProject,
    getJudge,
    getLabAllocations,
    getMemberDetails,
    referralConcepts,
    getAllocatedProjects,
    deleteMemberDetails,
    getAbstract,
    updateAbstract,
    getEvalStats
}