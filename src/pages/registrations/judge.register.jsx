import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Buttons, Checkboxes, FormsBanner, InputBox, NoteBox, RadioButtons, toast } from '../../components';
import { useRegisterJudge } from '../../hooks/judge.hooks';
import { slots, projectDomains,judgeDomains } from '../../static/data';

const initialErrors = {
    name: '',
    email: '',
    phone: '',
    address: '',
    company: '',
    exp: '',
    events: '',
    domains: '',
    slots: '',
    min_projects: '',
    isPICT: '',
    referral: '',
}

const isPICT = [
    {
        value: "1",
        label: "Yes"
    },
    {
        value: "0",
        label: "No"
    },
];

function JudgeForm() {
    const { eventName } = useParams()
    // console.log(eventName)

    const [judge, setJudge] = useState({
        'events': eventName,
        'name': '',
        'email': '',
        'phone': '',
        'company': '',
        'commercial_address': '',
        'residential_address': '',
        'exp': eventName === "concepts" ? '3' : '0',
        'domains': [],
        // 'domains1': [],
        'slots': [],
        'min_projects': '3',
        'isPICT': '0',
        'referral': ''
    });


    const [errors, setErrors] = useState(initialErrors)

    const registerJudgeMutation = useRegisterJudge(setErrors, eventName)

    const onSuccessNavigator = useNavigate()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        // console.log(judge)
        setJudge(prevState => {
            errors[name] !== '' && setErrors(prevState => ({ ...prevState, [name]: '' }))
            return { ...prevState, [name]: value }
        })
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function handleSubmit(e) {
        e.preventDefault();
        let hasEmptyField = false;
        for (const key in judge) {
            if (key === "referral" && judge[key] === "") {
                continue; // If referral is empty, continue to the next field
            }

            if (key === "name" && (typeof judge[key] === 'string') && judge[key].trim().length < 3) {
                toast.warn("Name must be at least 3 characters long.");
                return;
            }

            if (key === "email" && !validateEmail(judge[key])) {
                toast.warn("Please enter a valid E-mail address");
                return;
            }

            if (judge[key] === "") {
                hasEmptyField = true;
                break; // If any other field is empty, set hasEmptyField to true and break the loop
            }
        }

        if (hasEmptyField) {
            toast.warn("Please enter all fields");
            return;
        }

        // console.log("done"); 
        registerJudgeMutation.mutate(judge, {
            onSuccess: (res) => {
                setErrors(initialErrors);
                toast.success('Successfully Registered!', { icon: '💐' });
                setTimeout(() => {
                    onSuccessNavigator('/auth');
                }, 2000);
            },
        });
    }
    // console.log(judge)
    return (
        <>
            <FormsBanner eventName={`JUDGES REGISTRATION - ${eventName} `} eventDescription=" Please register to join us and make InC'24 a grand success!" />
            <div className='mx-5 my-5 md:mx-20 placeholder:'>
                <form onSubmit={handleSubmit} className='shadow-md shadow-light_blue/20 bg-light_blue/30 rounded-xl border-light_blue items-center p-4 md:p-8 border w-full'>
                    <NoteBox title='Note' text='This registration form is to be filled by the judges only for judging the impetus and concepts event..' />
                    <InputBox label='Name' type='text' name='name' value={judge.name} placeholder='Enter Full Name' onChange={handleInputChange} error={errors.name} required />
                    <InputBox label='Email' type='email' name='email' value={judge.email} placeholder='Enter Email' onChange={handleInputChange} error={errors.email} required />
                    <InputBox label='Phone' type='tel' name='phone' value={judge.phone} placeholder='Enter Phone Number' onChange={handleInputChange} error={errors.phone} required />
                    <InputBox label='Company/Organization' type='text' name='company' value={judge.company} placeholder='Enter Company Name' onChange={handleInputChange} error={errors.company} required />
                    <InputBox label='Company/Organization Address' type='text' name='commercial_address' value={judge.commercial_address} placeholder='Enter Company Address' onChange={handleInputChange} error={errors.commercial_address} required />
                    <InputBox label='Residential Address' type='text' name='residential_address' value={judge.residential_address} placeholder='Enter Residential Address' onChange={handleInputChange} error={errors.commercial_address} required />
                    <InputBox label='Industry Experience (in years)' type='number' name='exp' value={judge.exp} placeholder='Enter Industry Experience' min={eventName === "comcepts" ? 3 : 0} max={100} onChange={handleInputChange} error={errors.exp} required />
                    <Checkboxes label='Select Domain(s) for Judging' name='domains' state={judge} setState={setJudge} options={projectDomains} error={errors.domains} required />
                    <Checkboxes label='Select Slot(s) (tentative)' name='slots' state={judge} setState={setJudge} options={slots} error={errors.slots} required />
                    <InputBox label='Minimum Number of projects you want to Judge' type='number' name='min_projects' value={judge.min_projects} placeholder='Enter Minimum Number of Projects' min={3} max={10} onChange={handleInputChange} error={errors.min_projects} required />

                    <RadioButtons
                        label="Are you a PICT Alumini ?"
                        options={isPICT}
                        state={judge}
                        setState={setJudge}
                        name="isPICT"
                        required
                    // error={errors2.isPICT}
                    />
                    <InputBox label='Referred By' type='text' name='referral' value={judge.referral} placeholder="Enter Referral's Name (if any)" onChange={handleInputChange} error={errors.referral} />
                    <Buttons value='Submit' type='submit' loading={registerJudgeMutation.isLoading} />
                </form>
            </div>

        </>
    );
}
export default JudgeForm;
