import { useState } from "react";
import { FormsBanner, Buttons, Dropdown, NoteBox, toast } from "../../components";
import generateOptions from "../../utils/generateOptions";
import { useParams, useNavigate } from "react-router-dom";
import { useEvaluateProject } from "../../hooks/judge.hooks";

function ResultForms() {
    const { pid, jid } = useParams()
    const { mutate, isLoading } = useEvaluateProject('concepts')
    const navigate = useNavigate()

    const [form, setForm] = useState({
        innovation: "",
        approachToIdeas: "",
        approachToImplementation: "",
        principles: "",
        presentation: "",
    })

    function handleSubmit(e) {
        e.preventDefault();
        for (const property in form) {
            if (form[property] === "") {
                toast.warn("Please enter all fields!");
                return;
            }
        }
        const total = Object.values(form).reduce((acc, value) => acc + parseInt(value), 0);
        mutate({ pid, jid, ...form }, {
            onSuccess: () => {
                toast.success(`${pid} evaluated successfully! Total score: ${total}`)
                navigate(-1, { replace: true })
            }
        })
    }

    return (
        <>
            <FormsBanner eventName='Evaluation' eventDescription={`Enter Results for Concepts- ${pid} `} />
            <div className=" md:mx-20 mx-4 my-6">
                <form className="flex flex-col shadow-md shadow-light_blue/20 bg-light_blue/30 rounded-xl border border-light_blue items-center p-4 md:p-8 mt-10 w-full">
                    <Dropdown label="Significance/Originality/Innovative ideas- (1-10)" options={[{ label: 'Select Score', value: '' }, ...generateOptions(1, 10)]} state={form} setState={setForm} name="innovation" required />
                    <Dropdown label="Overall Design & Methodology - (1-10)" options={[{ label: 'Select Score', value: '' }, ...generateOptions(1, 10)]} state={form} setState={setForm} name="approachToIdeas" required />
                    <Dropdown label="Implementation (5) & Demonstration (5) - (1-10)" options={[{ label: 'Select Score', value: '' }, ...generateOptions(1, 10)]} state={form} setState={setForm} name="approachToImplementation" required />
                    <Dropdown label="Result & Contribution - (1-10)" options={[{ label: 'Select Score', value: '' }, ...generateOptions(1, 10)]} state={form} setState={setForm} name="principles" required />
                    <Dropdown label="Presentation and Q & A - (1-10)" options={[{ label: 'Select Score', value: '' }, ...generateOptions(1, 10)]} state={form} setState={setForm} name="presentation" required />
                    
                    <div className="p-5 text-xl bg-green-200 rounded-xl">Total Score : {Object.values(form).reduce((acc, value) => acc + (value ? parseInt(value) : 0), 0)}</div>
                    <Buttons
                        className="mx-2 my-2"
                        onClick={handleSubmit}
                        loading={isLoading}
                        value="Submit" />
                    <br />
                    <NoteBox title="Note"
                        text="Please do not disclose marks to the participants" />
                </form>
            </div>
        </>
    );
};

export default ResultForms;
