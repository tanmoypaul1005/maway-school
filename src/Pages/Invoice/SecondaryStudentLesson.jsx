import React from 'react';
import useInvoiceStore from '../../App/Stores/InvoiceStore';
import { iClassroomLesson, iDrivingLesson, iExternalLesson, iImageIogo } from '../../App/Utility/source';
import Image from '../../Components/Image/Image';

const SecondaryStudentLesson = () => {

    const { secondaryInvoiceDetailsData } = useInvoiceStore();

    return (
        <div className='flex flex-col items-start'>
            <div className='font-fw600 text-fs16 text-cHighlighted mb-s15'>Purchase {secondaryInvoiceDetailsData?.lessons?.length} lesson of {secondaryInvoiceDetailsData?.category_name} Category</div>

            <div className='overflow-hidden rounded-br10 bg-cBackgroundAndCategory w-s400'>
                <div className='overflow-y-auto px-5 space-y-s10 mt-5 max-h-[300px]'>
                    {secondaryInvoiceDetailsData?.lessons?.length > 0 ?
                        secondaryInvoiceDetailsData?.lessons?.map((item, index) =>
                            <InvoiceLessonCard
                                key={index}
                                title={item?.name}
                                duration={item?.duration}
                                price={item?.price}
                                type={item?.type}
                            />
                        )
                        : ""}
                </div>

                <div className="my-s15">
                    <hr />
                </div>

                <div className='px-s20 pb-s20'>
                    <div className='flex justify-between text-cLessImportantText text-fs14 font-fw600 pt-'>
                        <div>MOMS</div>
                        <div>{secondaryInvoiceDetailsData?.moms} DKK</div>
                    </div>

                    <div className='flex justify-between text-cBrandColor text-fs16 font-fw600 mt-s10'>
                        <div>Total</div>
                        <div>{secondaryInvoiceDetailsData?.price} DKK</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecondaryStudentLesson


function InvoiceLessonCard({ title, duration, price, type }) {

    return (
        <div>
            <div className='flex justify-between mt-s5 text-fs14 text-cHighlighted font-fw500 bg-cInvoiceLesson rounded-br10'>

                <div className='flex items-center'>
                    <div className='overflow-hidden rounded-full w-s50 h-s50 bg-cBackgroundAndCategory my-s5 mx-s10'>
                        <Image
                            className='object-cover h-s50 w-s50'
                            src2={type === "classroom" ? iClassroomLesson : type === "driving" ? iDrivingLesson : type === "external" ? iExternalLesson : ""}
                            dummyImage={iImageIogo}
                        />
                    </div>
                    <div className=''>
                        <div className='text-cBlack text-fs14 font-fw600'>
                            {title}
                        </div>
                        <div className='text-cBlack text-fs12 font-fw400'>
                            Duration: {duration}
                        </div>
                    </div>
                </div>

                <div className='mr-s10 text-cBlack text-fw600 text-fs14 my-s20'>DKK {price}</div>
            </div>
        </div>
    );
};