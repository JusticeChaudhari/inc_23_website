import { useParams, useNavigate } from "react-router-dom";
import { useGetJudge, useGetAllocatedProjects } from "../../hooks/judge.hooks";
import { Buttons, InputBox } from "../../components";
import { projectDomains } from "../../static/data";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import './css/allocation.css'
import { MdClose } from "react-icons/md";
import { BeatLoader } from "react-spinners";

function JudgeAllocation() {
  const jid = Cookies.get('jid');
  const [allocatedProjects, setallocatedProjects] = useState([])
  const { data: allocateddata, isLoading } = useGetAllocatedProjects(jid);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // console.log(allocateddata);
  const navigate = useNavigate();
  // const pidRef = useRef(null);

  useEffect(() => {
    setallocatedProjects(allocateddata?.data)
    console.log(allocatedProjects)
  }, [allocateddata?.data])


  const marksEntry = (e, pid) => {
    e.preventDefault();
    if (pid[0][0] === 'I') {
      navigate(`/judge/impetus/evaluate/${jid}/${pid}`);
    } else {
      navigate(`/judge/concepts/evaluate/${jid}/${pid}`);
    }
    // console.log(pid)
  }
  return (
    <>
      <div className="py-8 flex flex-col items-center mx-5">
        {/* <form className="mt-6">
          <InputBox label='Enter Project ID (for extra evaluation)' type='text' name='pid' placeholder='Enter Project ID' inputref={pidRef} required />
          <Buttons
            onClick={(e) => marksEntry(e, pidRef.current?.value)}
            type='submit'
            value='Evaluate'
          />
        </form> */}

        {showPopup && selectedProject && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-[#000000] text-gold p-4 md:p-8 rounded-lg shadow-lg overflow-y-auto w-full md:w-3/4 opacity-100 text-lg border-light_blue border-2 h-full lg:h-fit relative">
              <button
                className="absolute top-2 right-2 text-white"
                onClick={() => setShowPopup(false)}
              >
                <MdClose size={24} className=" m-2 text-xl border-2 border-white p-[0.09rem] h-9 w-9 rounded-lg" />
              </button>
              <h2 className="font-bold text-xl mb-2">Project ID: {selectedProject.pid}</h2>
              <h1 className="font-bold mb-4 text-xl">Title : <span className="text-white">{selectedProject.title} </span></h1>
              <h2 className="mb-2"> Lab: <span className="text-white">{selectedProject.lab}</span></h2>
              <h2 className="mb-2">Domain: <span className="text-white">{selectedProject.domain} </span></h2>
              <p className="mb-4 text-justify">Abstract: <span className="text-white">{selectedProject.abstract}</span></p>
              <Buttons
                className="w-full md:w-auto px-2 md:px-6 py-2 md:py-4 text-white font-semibold border border-transparent focus:outline-0 rounded-xl bg-faint_blue/30 transition-all duration-300 hover:text-gold hover:border-light_blue hover:bg-faint_blue/10 md:hidden"
                onClick={() => setShowPopup(false)}
                value="Close"
              ></Buttons>
            </div>
          </div>
        )}


        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <BeatLoader color="#0e2558" size={30} />
          </div>
        ) : (
          <>
            {allocatedProjects?.concepts?.length > 0 && (
              <h1 className="text-3xl lg:text-4xl text-gold p-6 font-bold">Allocated Projects - Concepts</h1>
            )}
            {allocatedProjects?.concepts?.map((project) => (
              <div
                key={project.pid}
                className="rounded-lg lg:w-2/3 outline-dashed outline-2 outline-offset-[3px] my-2 outline-light_blue px-4 py-2 bg-faint_blue/10 mb-3 w-[100%] md:w-[90%]"
              >
                <div className="flex space-x-2 items-center ">
                  <h1 className="text-lg md:text-xl font-bold text-gold">
                    {" "}
                    Project ID :
                  </h1>{" "}
                  <h2 className="text-base md:text-lg font-normal">{project.pid}</h2>
                </div>
                <div className="flex ">
                  <h1 className="text-lg md:text-xl font-bold text-gold">
                    Project Title&nbsp;:&nbsp;{" "}
                  </h1>{" "}
                  <h2 className="text-base md:text-lg font-normal">{project.title}</h2>
                </div>

                <div className="flex">
                  <h1 className="text-lg md:text-xl font-bold text-gold">
                    Lab&nbsp;: &nbsp;
                  </h1>{" "}
                  <h2 className="text-base md:text-lg font-normal">{project.lab}</h2>
                </div>
                <div className="flex">
                  <h1 className="text-lg md:text-xl font-bold text-gold">
                    Domain&nbsp;:&nbsp;{" "}
                  </h1>{" "}
                  <h2 className="text-base md:text-lg font-normal">
                    {project.domain}
                  </h2>
                </div>

                {/* COMMENT IT AFTER STARTING EVALUATION  */}
                <div className="md:flex">
                  <h1 className="text-lg md:text-xl font-bold text-gold">
                    Abstract&nbsp;:&nbsp;{" "}
                  </h1>{" "}
                  <h2 className="text-base md:text-lg font-normal text-justify">{project.abstract}</h2>
                </div>

                {/* <div className="flex justify-center items-center space-x-10">
                  <div className="p-2 underline font-bold text-lg cursor-pointer" onClick={() => {
                    setSelectedProject(project);
                    setShowPopup(true);
                  }}>
                    View Abstract
                  </div>
                  <Buttons
                    type='submit'
                    value={`Evaluate`}
                    className="text-blue-500 rounded-full"
                    onClick={(e) => marksEntry(e, project.pid)}
                  />
                </div> */}
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default JudgeAllocation;
