import { Fragment, Suspense, lazy, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAllocate, useGetJudgeRegistrations, useGetRegistrations } from '../../../hooks/admin.hooks';
import { Buttons, FormsBanner, RadioButtons, toast } from '../../../components';
import { slots } from '../../../static/data';
const Table = lazy(() => import('../../../components/table.jsx'))

function Allocations() {
  const { eventName } = useParams()
  const [method, setMethod] = useState('')
  const [pids, setPIDS] = useState([])
  const [jids, setJIDS] = useState([])
  const { isLoading: isProjectsLoading, data: projectsData } = useGetRegistrations(eventName)
  const { isLoading: isJudgesLoading, data: judgesData } = useGetJudgeRegistrations(eventName)
  const { mutate: allocate, isLoading: isAllocating } = useAllocate(eventName)

  const judgesColumns = useMemo(() => [
    {
      name: 'Judge ID',
      selector: row => row['jid'],
      cellExport: row => row['jid'],
      width: '140px',
      wrap: true,
      sortable: true,
    },
    {
      name: 'Name',
      selector: row => row['name'],
      cellExport: row => row['name'],
      width: '180px',
      sortable: true,
      wrap: true
    },
    {
      name: 'Total Judged',
      selector: row => row['total_judged'],
      cellExport: row => row['total_judged'],
      width: '160px',
      sortable: true,
      wrap: true
    },
    {
      name: 'Allocated Projects',
      selector: row => row['allocated_projects'],
      cellExport: row => row['allocated_projects'],
      width: '160px',
      sortable: true,
      wrap: true
    },
    {
      name: 'Judged within Allocations',
      selector: row => row['judged_within_allocations'],
      cellExport: row => row['judged_within_allocations'],
      width: '160px',
      sortable: true,
      wrap: true
    },
    {
      name: 'Labs',
      selector: row => row['lab'],
      cellExport: row => row['lab'],
      width: '160px',
      sortable: true,
      wrap: true
    },
    {
      name: 'Email',
      selector: row => row['email'],
      cellExport: row => row['email'],
      width: '300px',
    },
    {
      name: 'Contact No',
      selector: row => row['phone'],
      cellExport: row => row['phone'],
      width: '140px',
    },
    {
      name: 'Domains',
      selector: row => row['domains'],
      cell: row => <ol className='list-disc'>{Object.keys(row['domains']).map(index => <li key={index}>{row['domains'][index]}<span className='hidden'> , </span></li>)}</ol>,
      width: '80px',
    },
    {
      name: 'Slots',
      selector: row => row['slots'],
      cell: row => <ol className='list-disc'>{Object.keys(row['slots']).map(index => <li key={index}>{slots[row['slots'][index] - 1].label}<span className='hidden'> , </span></li>)}</ol>,

      width: '350px',
    },
    {
      name: 'Minimum Projects',
      width: '120px',
      selector: row => row['min_projects'],
      cellExport: row => row['min_projects'],
    },
    {
      name: 'Company',
      selector: row => row['company'],
      cellExport: row => row['company'],
      width: '200px',
    },
    {
      name: 'Address',
      selector: row => row['address'],
      cellExport: row => row['address'],
      width: '300px',
    },
    {
      name: 'Experience',
      selector: row => row['exp'],
      cellExport: row => row['exp'],
      width: '100px',
    },
    {
      name: 'Pict Alumni',
      selector: row => row['isPICT'],
      cellExport: row => row['min_projects'],
      width: '80px',
      cell: row => row.isPICT === '1' ? 'Yes' : 'No',
    },
    {
      name: 'Date',
      width: '200px',
      selector: row => row['date'],
      cellExport: row => row['date'],
      sortable: true,
    },
  ], [])

  const projectsColumns = useMemo(() => [
    {
      name: 'Team ID',
      selector: row => row['pid'],
      cellExport: row => row['pid'],
      width: '160px',
      sortable: true,
    },
    {
      name: 'Total Allocations',
      selector: row => row['total_allocations'],
      cellExport: row => row['total_allocations'],
      width: '160px',
      sortable: true,
      omit: eventName === 'pradnya',
    },
    {
      name: 'Lab',
      selector: row => row['lab'],
      cellExport: row => row['lab'],
      width: '140px',
      omit: eventName === 'pradnya',
    },
    {
      name: 'Total Evaluations',
      selector: row => row['evaluations'],
      cellExport: row => row['evaluations'],
      width: '160px',
      sortable: true,
      omit: eventName === 'pradnya',
    },
    {
      name: 'Evaluated Allocations',
      selector: row => row['judging_within_allocations'],
      cellExport: row => row['judging_within_allocations'],
      width: '160px',
      sortable: true,
      omit: eventName === 'pradnya',
    },
    {
      name: 'Title',
      selector: row => row['title'],
      cellExport: row => row['title'],
      width: '240px',
      omit: eventName === 'pradnya',
    },
    {
      name: 'Abstract',
      selector: row => row['abstract'],
      cellExport: row => row['abstract'],
      width: '200px',
      omit: eventName === 'pradnya',
    },
    {
      name: 'Project Type',
      selector: row => row['project_type'],
      cellExport: row => row['project_type'],
      width: '180px',
      omit: eventName === 'pradnya',
    },
    {
      name: 'Members Name',
      selector: row => row['name'],
      cell: row => <ol className='list-disc text-sm'>{row.name?.split(',').map((name, index) => <li key={index}>{name}<span className='hidden'> , </span></li>)}</ol>,
      width: '120px',
    },
    {
      name: 'Members Phone',
      selector: row => row['phone'],
      cell: row => <ol className='list-disc text-sm'>{row.phone?.split(',').map((phone, index) => <li key={index}>{phone}<span className='hidden'> , </span></li>)}</ol>,
      width: '180px',
    },
    {
      name: 'Members Email',
      selector: row => row['email'],
      cell: row => <ol className='list-disc text-sm'>{row.email?.split(',').map((email, index) => <li key={index}>{email}<span className='hidden'> , </span></li>)}</ol>,
      width: '140px',
    },
    {
      name: 'College',
      width: '300px',
      selector: row => row['college'],
      cellExport: row => row['college'],
    },
    {
      name: 'Year',
      width: '90px',
      selector: row => row['year'],
      omit: eventName === 'concepts',
      cell: row => {
        switch (row.year) {
          case 'Se':
            return 'Senior'

          case 'Ju':
            return 'Junior'

          default:
            return row.year
        }
      }
    },
    {
      name: 'City',
      width: '130px',
      selector: row => row['city'],
      cellExport: row => row['city'],
    },
    {
      name: 'Mode',
      selector: row => row['mode'],
      width: '130px',
      cell: row => {
        switch (row.mode) {
          case '1':
            return 'Offline'

          case '0':
            return 'Online'

          default:
            return 'Unavailable'
        }
      },
    },
    {
      name: 'Date',
      width: '160px',
      selector: row => row['date'],
      cellExport: row => row['date'],
      sortable: true,
    },
  ], [eventName])

  const options = [
    {
      label: 'Judge to Projects',
      value: 'judge_to_projects',
    },
    // {
    //   label: 'Project to Judges',
    //   value: 'project_to_judges',
    // }
  ]

  const leftTableProps = {
    outerTitle: method === 'judge_to_projects' ? 'Judge' : 'Project',
    columns: method === 'judge_to_projects' ? judgesColumns : projectsColumns,
    keyField: method === 'judge_to_projects' ? 'jid' : 'pid',
    data: method === 'judge_to_projects' ? judgesData?.data : projectsData?.data,
    loading: !eventName || method === 'judge_to_projects' ? isJudgesLoading : isProjectsLoading,
    pointerOnHover: 'pointerOnHover',
    conditionalRowStyles: [
      {
        when: (row) => method === 'judge_to_projects' ? jids.includes(row.jid) : pids.includes(row.pid),
        style: {
          backgroundColor: 'rgba(7, 89, 133, 0.7)',
          color: 'rgba(200, 162, 13, 0.9)',
        },
      },
    ]
  }

  const rightTableProps = {
    outerTitle: method === 'judge_to_projects' ? 'Projects' : 'Judges',
    columns: method === 'judge_to_projects' ? projectsColumns : judgesColumns,
    keyField: method === 'judge_to_projects' ? 'pid' : 'jid',
    data: method === 'judge_to_projects' ? projectsData?.data : judgesData?.data,
    loading: !eventName || method === 'judge_to_projects' ? isProjectsLoading : isJudgesLoading,
    selectableRows: 'selectableRows',
    selectableRowsHighlight: 'selectableRowsHighlight',
    onSelectedRowsChange: ({ selectedRows }) => {
      if (method === 'judge_to_projects') setPIDS(selectedRows.map(({ pid }) => pid).sort())
      else setJIDS(selectedRows.map(({ jid }) => jid))
    },
    conditionalRowStyles: [
      {
        when: (row) => method === 'judge_to_projects' ? pids.includes(row.pid) : jids.includes(row.jid),
        style: {
          backgroundColor: 'rgba(7, 89, 133, 0.7)',
          color: 'rgba(200, 162, 13, 0.9)',
        },
      },
    ]
  }

  function selectOne(row) {
    switch (method) {
      case 'judge_to_projects':
        // console.log(row);
        if (jids.length === 0) setJIDS([row.jid])
        else if (jids.length === 1 && jids.includes(row.jid)) setJIDS([])
        else {
          toast('You can only select one judge at a time', { type: 'error' })
          return
        }
        break

      case 'project_to_judges':
        if (jids.length === 0) jids.push(row.jid)
        else if (jids.length === 1 && jids.includes(row.jid)) return
        else {
          if (method === 'judge_to_projects' && !jids.includes(row.jid) && !pids.includes(row.pid) && !jids.includes(row.pid) && !pids.includes(row.jid)) {
            setJIDS(prevState => [...prevState, row])
          } else {
            setPIDS(prevState => prevState.filter(({ jid }) => jid !== row.jid))
          }
        }
        break

      default:
        return
    }
  }

  function submitAllocation() {
    try {
      if (jids.length === 0 || pids.length === 0) {
        toast('Please select at least one judge and one project', { type: 'error' })
        return
      }

      allocate({ pids, jids, slots: judgesData.data.find(judge => judge.jid === jids[0]).slots }, {
        onSuccess: () => {
          toast('Allocation Successful', { type: 'success' })
          setJIDS([])
          setPIDS([])
        }
      })
    } catch (error) {
      // console.log(error);
      toast(`Something went wrong ${error.message}`, { type: 'error' })
    }
  }

  return (
    <>
      <FormsBanner eventName='Allocations' eventDescription={`Allocate ${method === 'judge_to_projects' ? 'Judge to Projects' : 'Projects to Judge'}`} />
      <div className='flex shadow-md shadow-light_blue/20 bg-light_blue/30 rounded-xl border-light_blue items-center p-4 md:px-8 md:pt-6 border border-light_blue md:mx-20 mx-5 my-6'>
        <RadioButtons name='method' label='Select Method' options={options} state={{ method }} setState={setMethod} />
      </div>
      {eventName && method === 'judge_to_projects' && (
        <Suspense fallback={<h1>Loading...</h1>}>
          <div className='flex justify-center w-full flex-col md:flex-row mb-6'>
            <div className='flex flex-col items-center md:w-[40%] w-full relative'>
              <h1 className='text-3xl font-bold text-gold'>{leftTableProps.outerTitle}</h1>
              <Suspense fallback={<div>Loading...</div>}>
                <Table {...leftTableProps} onRowDoubleClicked={selectOne} data={judgesData?.data} loading={!eventName || isJudgesLoading} outerClassName='w-full' />
              </Suspense>
            </div>
            <div className='flex flex-col items-center justify-center w-full md:w-[10%] md:p-0 py-3'>
              <h1 className='text-3xl font-bold text-gold text-center'>To</h1>
              <div className='h-full items-center justify-center'><i className='block scale-[200%] p-3 opacity-0 md:opacity-100'>➡️</i><i className='block scale-[200%] p-3 opacity-100 md:opacity-0 -mt-3'>⬇️</i></div>
            </div>
            <div className='flex flex-col items-center md:w-[40%] w-full relative'>
              <h1 className='text-3xl font-bold text-gold'>{rightTableProps.outerTitle}</h1>
              <Suspense fallback={<div>Loading...</div>}>
                <Table {...rightTableProps} onRowDoubleClicked={selectOne} data={projectsData?.data} loading={!eventName || isProjectsLoading} outerClassName='w-full' />
              </Suspense>
            </div>
          </div>
          {jids && (
            <form className='shadow-md shadow-light_blue/20 bg-light_blue/30 rounded-xl border-light_blue p-4 md:px-8 md:pt-6 border border-light_blue md:mx-20 mx-5 my-6'>
              <div className='w-full flex justify-evenly'>
                <div className='w-[40%]'>
                  <label htmlFor='Selected Judge' className='input-label block font-medium mb-3 text-white text-lg after:content-["*"] after:ml-0.5 after:text-gold'>Selected Judge</label>
                  <div className='input-box-radio w-full relative'>
                    {jids.length > 0 && (
                      <>
                        <input type='radio' name='jids' id='jids_radio' value={jids[0]} onClick={() => { }} required className='opacity-0 absolute' checked />
                        <label htmlFor='jids_radio' className='label text-center text-base self-center bg-faint_blue/30 font-gilroy text-white text-lg py-2 px-6 pr-8 outline-0 border-2 border-transparent rounded-xl cursor-pointer transition-all duration-300 hover:border-light_blue hover:bg-faint_blue/20'>{jids[0]}</label>
                        <i className='fas fa-times top-0 -ml-6 text-xl text-red-500 cursor-pointer' onClick={() => setJIDS([])}></i>
                      </>
                    )}
                  </div>
                </div>
                <div className='w-[20%]'></div>
                <div className='w-[40%]'>
                  <label htmlFor='Selected Judge' className='input-label block font-medium mb-3 text-white text-lg after:content-["*"] after:ml-0.5 after:text-gold'>Selected Projects</label>
                  <div className='input-box-radio relative relative flex flex-wrap w-full items-center gap-4'>
                    {pids.map((pid, index) => (
                      <Fragment key={index}>
                        <input type='checkbox' name='pids' id='pids_radio' value={pid} disabled checked onClick={() => { }} required className='opacity-0 absolute' />
                        <label htmlFor='pids_radio' className='label text-center text-base self-center bg-faint_blue/30 font-gilroy text-white text-lg py-1 px-4 outline-0 border-2 border-transparent rounded-xl cursor-pointer transition-all duration-300 hover:border-light_blue hover:bg-faint_blue/20'>{pid}</label>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </div>
              {(jids.length === 1 && pids.length > 0) &&
                <Buttons value="Submit Allocation" onClick={submitAllocation} className='mt-6 w-full mx-auto' loading={isAllocating} />
              }
            </form>
          )}
        </Suspense>
      )}
      {eventName && method === 'project_to_judges' && (
        <Suspense fallback={<h1>Loading...</h1>}>
          <div className='flex justify-center items-center w-full flex-col md:flex-row mb-6'>
            <div className='flex flex-col items-center md:w-[40%] w-full relative'>
              <h1 className='text-3xl font-bold text-gold'>{leftTableProps.outerTitle}</h1>
              <Suspense fallback={<div>Loading...</div>}>
                <Table {...leftTableProps} data={projectsData?.data} loading={!eventName || isProjectsLoading} outerClassName='w-full' />
              </Suspense>
            </div>
            <div className='flex flex-col items-center justify-center w-full md:w-[10%] md:p-0 py-3'>
              <h1 className='text-3xl font-bold text-gold text-center'>To</h1>
              <div className='h-full items-center justify-center'><i className='block scale-[200%] p-3 opacity-0 md:opacity-100'>➡️</i><i className='block scale-[200%] p-3 opacity-100 md:opacity-0 -mt-3'>⬇️</i></div>
            </div>
            <div className='flex flex-col items-center md:w-[40%] w-full relative'>
              <h1 className='text-3xl font-bold text-gold'>{rightTableProps.outerTitle}</h1>
              <Suspense fallback={<div>Loading...</div>}>
                <Table {...rightTableProps} data={judgesData?.data} loading={!eventName || isJudgesLoading} outerClassName='w-full' />
              </Suspense>
            </div>
          </div>
        </Suspense>
      )}
    </>
  )
}

export default Allocations;