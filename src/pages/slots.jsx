import React from 'react'
import { useState } from 'react';
import { MdKeyboardArrowDown } from "react-icons/md";
import { Table } from '../components';
function Slots() {
  const [selectedSlot, setSelectedSlot] = useState('No slot selected');
  const [showOptions, setShowOptions] = useState(false);
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  const data = [
    { Pid: 1, evaluated: ['J-101 , ','J-102 , ','J-103 , ','J-104 , ','J-105 '], count: 1, total : 5 },
    { Pid: 2, evaluated: ['J-110 , ','J-111 , ','J-112 , ','J-113 , ','J-114 '], count: 3, total : 5},
    { Pid: 3, evaluated: ['J-121 , ','J-122 , ','J-123 , ','J-124 , ','J-125 '], count: 4,total : 5 },
    { Pid: 4, evaluated: ['J-151 , ','J-152 , ','J-153 , ','J-154 , ','J-155 '], count: 5,total : 5 },
  ];

  const columns = [
    {
      name: ' Project ID',
      selector: 'Pid',
      sortable: true,
    },
    {
      name: 'Evaluating Judges',
      selector: 'evaluated',
    },
    {
      name: 'Count',
      selector: 'count',
    },
    {
      name: 'Total',
      selector: 'total',
    },
  ];
  return (
    <div className="grid shadow-md shadow-light_blue/20 bg-light_blue/30 rounded-xl border border-light_blue items-center p-4 md:p-8 md:mx-20 mx-5 mt-10 mb-10">
    <div className="py-3 text-xl font-bold text-gold bg-clip-text">
      Select Slot:-
      {/* Athe se shuru karu dropdown */}
      <div className="relative inline-block ml-3">
        <button
          className={`px-2  md:px-4 py-2 text-white font-semibold border-transparent outline-none focus:outline-none rounded-xl bg-faint_blue/30 hover:text-gold flex justify-center items-center ${
            showOptions ? 'border-b-none' : ''
          }`}
          onClick={toggleOptions}
        >
          Select Slot <MdKeyboardArrowDown className="ml-1 font-bold text-xl" />
        </button>
        <div className={`absolute top-full left-0 z-10 bg-faint_blue rounded-md mt-1 w-[14rem] ${showOptions ? '' : 'hidden'}`}>
          <button
            onClick={() => setSelectedSlot('Friday, 5th April (10:00 AM - 1:00 PM)')}
            className="w-full px-2 py-1 font-semibold transition duration-300 cursor-pointer text-left"
          >
            Friday, 5th April (10:00 AM - 1:00 PM)
          </button>
          <button
            onClick={() => setSelectedSlot("Friday, 5th April (2:00 PM - 5:00 PM)")}
            className="w-full px-2 py-1 font-semibold transition duration-300 cursor-pointer text-left"
          >
            Friday, 5th April (2:00 PM - 5:00 PM)
          </button>
          <button
            onClick={() => setSelectedSlot("Friday, 5th April (5:00 PM - 7:00 PM)")}
            className="w-full px-2 py-1 font-semibold transition duration-300 cursor-pointer text-left"
          >
            Friday, 5th April (5:00 PM - 7:00 PM)
          </button>
          <button
            onClick={() => setSelectedSlot("Saturday, 6th April (10:00 AM - 1:00 PM)")}
            className="w-full px-2 py-1 font-semibold transition duration-300 cursor-pointer text-left"
          >
            Saturday, 6th April (10:00 AM - 1:00 PM)
          </button>
          <button
            onClick={() => setSelectedSlot("Saturday, 6th April (2:00 PM - 5:00 PM)")} 
            className="w-full px-2 py-1 font-semibold transition duration-300 cursor-pointer text-left"
          >
            Saturday, 6th April (2:00 PM - 5:00 PM)
          </button>
          <button
            onClick={() => setSelectedSlot("Saturday, 6th April (5:00 PM - 7:00 PM)")}
            className="w-full px-2 py-1 font-semibold transition duration-300 cursor-pointer text-left"
          >
           Saturday, 6th April (5:00 PM - 7:00 PM)
          </button>
        </div>
      </div>
      {/* Athe tak h drop down */}
      <div className='text-xl my-4 text-center '> Selected Slot :- <span className='text-white'>{selectedSlot}</span></div>
      <Table
        title="My Table"
        data={data}
        columns={columns}
        outerClassName="my-custom-table"
        pagination={true} 
        loading={false} 
      />
    </div>
  </div>
  )
}

export default Slots
{/*
     
*/}