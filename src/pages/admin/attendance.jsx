import { Table } from "../../components"
export default function Attendance()
{
    const data = [
        { Pid: 1, evaluated: ['J-101 , ','J-102 , ','J-103 , ','J-104 , ','J-105 '], count: 1, total : 5 },
        { Pid: 2, evaluated: ['J-110 , ','J-111 , ','J-112 , ','J-113 , ','J-114 '], count: 3, total : 5},
        { Pid: 3, evaluated: ['J-121 , ','J-122 , ','J-123 , ','J-124 , ','J-125 '], count: 4,total : 5 },
        { Pid: 4, evaluated: ['J-151 , ','J-152 , ','J-153 , ','J-154 , ','J-155 '], count: 5,total : 5 },
      ];

    return(
         <>
    <div className="grid shadow-md shadow-light_blue/20 bg-light_blue/30 rounded-xl border border-light_blue items-center p-4 md:p-8 md:mx-20 mx-5 mt-10 mb-10">

         <div className="py-3 text-xl font-bold text-gold bg-clip-text">
         <Table 
          title="Attendance Table"
         columns={[{name:"PID",selector:"Pid"},{name:"Total Allocated Count",selector:"count"},{name:"Evaluated",selector:"evaluated"},{name:"Remaining",selector:"total"}]}
                 data={data}
                 pagination={true}

                 
         />
         </div>
         </div>

         </>
    )
}