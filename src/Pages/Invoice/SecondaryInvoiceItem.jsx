import React from 'react'
import CommonEmptyStatus from '../../Components/CommonEmptyStatus/CommonEmptyStatus';
import InvoiceLessons from '../../Components/CommonInvoice/InvoiceLessons';

function SecondaryInvoiceItem({ classroom_lessons, driving_lessons, external_lessons, start_date, end_date, moms_amount, total_price }) {
    return (
        <div className="min-w-[350px] w-[400px]">
            <div className='font-fw600 text-fs16 text-cHighlighted'>Invoice Items ({start_date} - {end_date})</div>
            <div className='bg-cBackgroundAndCategory p-s16 rounded-br10 mt-s14'>
                {classroom_lessons ? <InvoiceLessons title="Classroom Lessons" time={classroom_lessons ?? 
                <CommonEmptyStatus fontWeight='font-fw600' leading='leading-1' size='text-fs16' textColor='text-cHighlighted'/>} /> : ""}
                {driving_lessons ? <InvoiceLessons title="Driving Lessons" time={driving_lessons ?? <CommonEmptyStatus fontWeight='font-fw600' leading='leading-1' size='text-fs16' textColor='text-cHighlighted'/>} /> : ""}
                {external_lessons !== "null" ? <InvoiceLessons title="External Lessons" time={external_lessons + " Lessons"} /> : ""}

                <div className='flex justify-between text-cLessImportantText text-fs14 font-fw600 mt-s15'>
                    <div>MOMS</div>
                    <div>{moms_amount ?? 0} DKK</div>
                </div>

                <div className='flex justify-between text-cBrandColor text-fs16 font-fw600 mt-s10'>
                    <div>Total</div>
                    <div>{total_price ?? 0} DKK</div>
                </div>
            </div>
        </div>
    );
};


export default SecondaryInvoiceItem