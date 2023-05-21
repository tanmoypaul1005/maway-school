import React from 'react';
import InvoiceLessons from './InvoiceLessons';

const InvoiceItems = () => {
    return (
        <div className="w-s317 ">
            <div className='font-fw600 text-fs16 text-cHighlighted'>Invoice Items (25 Mar, 2022 - 07 Jun, 2022)</div>
            <div className='bg-cBackgroundAndCategory p-s16 rounded-br10 mt-s14'>
                <InvoiceLessons  title="Classroom Lessons" time="01:00 Hr"/>
                <InvoiceLessons  title="Driving Lessons" time="01:00 Hr"/>
                <InvoiceLessons  title="External Lessons" time="01:00 Hr"/>

                <div className='flex justify-between text-cLessImportantText text-fs14 font-fw600 mt-s15'>
                    <div>MOMS</div>
                    <div>350 DKK</div>
                </div>

                <div className='flex justify-between text-cBrandColor text-fs16 font-fw600 mt-s10'>
                    <div>Total</div>
                    <div>1500 DKK</div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceItems;