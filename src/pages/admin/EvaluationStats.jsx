import { Suspense, useMemo, useState } from "react";
import { RadioButtons, Table } from "../../components";
import { useGetEvalStats } from "../../hooks/admin.hooks";

export default function EvaluationStats() {
     const [selectedEvent, setSelectedEvent] = useState("concepts");

     const { isLoading, data, error } = useGetEvalStats(selectedEvent);

     const options = [
          { label: 'Concepts', value: 'concepts' },
          { label: 'Impetus', value: 'impetus' },
     ];

     const columns = useMemo(() => [
          { name: 'pid', width: '220px', selector: row => row['pid'], cellExport: row => row['pid'] },
          { name: 'allocated', width: '120px', selector: row => row['allocated'], cellExport: row => row['allocated'] },
          { name: 'evaluated', width: '200px', selector: row => row['evaluated'], cellExport: row => row['evaluated'] },
          { name: 'reamining', width: '200px', selector: row => row['allocated'] - row['evaluated'], cellExport: row => row['allocated'] - row['evaluated'] },
     ], [data]);

     const handleEventChange = (event) => {
          setSelectedEvent(event.value);
     };

     return (
          <div className="grid shadow-md shadow-light_blue/20 bg-light_blue/30 rounded-xl border border-light_blue items-center p-4 md:p-8 md:mx-20 mx-5 mt-10 mb-10">
               {/* <div className='flex shadow-md shadow-light_blue/20 bg-light_blue/30 rounded-xl border-light_blue items-center p-4 md:px-8 md:pt-6 border md:mx-20 mx-5 my-6'>
                    <RadioButtons name='eventName' label='Select Event' options={options} state={selectedEvent} setState={handleEventChange} />
               </div> */}
               <div className="py-3 text-xl font-bold text-gold bg-clip-text">
                    <Suspense fallback={<h1>Loading...</h1>}>
                         {error ? (
                              <h1>Error: {error.message}</h1>
                         ) : (
                              <Table title={`Hello`} columns={columns} loading={!selectedEvent || isLoading} data={data?.data} keyField='pid' outerClassName='md:mx-20 mb-3 mx-5 mb-10' />
                         )}
                    </Suspense>
               </div>
          </div>
     );
}

