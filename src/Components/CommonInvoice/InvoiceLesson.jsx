import React from 'react';
import InvoiceLessonCard from './InvoiceLessonCard';

const InvoiceLesson = () => {

    const data = { title: 'Bill Gates', time: '3', price: 700 }

    return (
        <div className="w-s400 bg-cBackgroundAndCategory">
            <div className='font-fw600 text-fs16 text-cHighlighted my-s15 px-s20'>Purchase 6 lesson of A-Bike</div>

            <div className='bg-cBackgroundAndCategory rounded-br10'>

                <div className='overflow-y-auto h-s300 p-s20'>
                    <InvoiceLessonCard data={data} />
                    <InvoiceLessonCard data={data} />
                    <InvoiceLessonCard data={data} />
                    <InvoiceLessonCard data={data} />
                    <InvoiceLessonCard data={data} />
                    <InvoiceLessonCard data={data} />
                    <InvoiceLessonCard data={data} />
                    <InvoiceLessonCard data={data} />
                    <InvoiceLessonCard data={data} />
                    <InvoiceLessonCard data={data} />
                    <InvoiceLessonCard data={data} />
                    <InvoiceLessonCard data={data} />
                </div>

                <div className='px-s20 pb-s20'>
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
        </div>
    );
};

export default InvoiceLesson;