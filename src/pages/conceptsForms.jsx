import { useState, useRef } from 'react';
import { FormsBanner, ProgressBar, Modals, Buttons, TeamConcepts } from '../components';
import './styles/forms.css';
const conlogo = require("./concepts23_logo_bw.png");
function ConceptsForm() {
  const MAX_STEPS = 2;
  const [activeStep, setActiveStep] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [team, setTeam] = useState([])
  const [groupDetails, setGroupDetails] = useState({})

  function toggleInstructionsModal() {
    setShowModal(prevState => !prevState)
  }

  function nextStep() {
    if (activeStep < MAX_STEPS) setActiveStep(activeStep + 1)
  }

  function prevStep() {
    if (activeStep > 0) setActiveStep(activeStep - 1)
  }
  //project_details {}

  return (
    <div className='forms'>
      <FormsBanner logo={conlogo} eventName="CONCEPTS" eventDescription="24th and 25th March" />
      <div className='flex justify-end'>
        <Buttons value="i" onClick={toggleInstructionsModal} classNames="rounded-full mr-24" />
      </div>
      <Modals modalState={showModal} toggleModal={toggleInstructionsModal}  >
        <>
          <div className="flex justify-center items-center overflow-x-hidden text-black overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Instructions</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <ul>
                    <li>Instruction No 1</li>
                    <li>Instruction No 2</li>
                    <li>Instruction No 3</li>
                    <li>Instruction No 4</li>
                  </ul>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      </Modals>

      <TeamConcepts />
      {/*ProjectDetails props=setProjectDetails*/}
      {/*Next Step btns*/}
    </div>
  );
}

export default ConceptsForm;