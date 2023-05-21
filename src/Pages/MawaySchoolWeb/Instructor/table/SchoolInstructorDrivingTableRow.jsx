import { Tooltip } from '@mui/material';
import React from 'react';
import CommonEmptyStatus from '../../../../Components/CommonEmptyStatus/CommonEmptyStatus';
import { formatDate, valueCheck } from '../../../../Utility/UtilityFunctions';
import { iDrivingCard } from '../../../../App/Utility/source';
import useSchoolInstructorStore, { schoolInstructorsAllTypeDetails } from '../../../../App/Stores/school/schoolInstructorStore';
import Image from '../../../../Components/Image/Image';

const SchoolInstructorDrivingTableRow = ({ data, index }) => {

    const { setShowLessonDetailsModal } = useSchoolInstructorStore();

    return (
        <>
            <tr onClick={async () => {
                await schoolInstructorsAllTypeDetails(data?.id, "driving")
                setShowLessonDetailsModal(true)
            }} className={`border-b border-collapse cursor-pointer border-cNmSelect hover:bg-cGridView m-s10`} >
                <th className='body_text text-cGray text-center border-r p-s10'>
                    <span>{index}</span>
                </th>


                <td className='border-r-[1px] text-center p-s10 min-w-[200px] max-w-[200px] truncate'>
                    <div className='flex items-center sm:flex-col md:flex-row'>
                        <div className='ml-s4 min-w-[44px] max-w-[44px]'>
                            <Image
                                cursorPointerClass="cursor-pointer"
                                className='w-w44 h-h44 rounded-full'
                                src={iDrivingCard}
                                alt="" />
                        </div>
                        <div className='capitalize items-center ml-s8 body_text text-cGray truncate' >
                            {data?.lesson_name ?
                                <Tooltip title={data?.lesson_name}>
                                    <span className='truncate'>{valueCheck(data?.lesson_name)} </span>
                                </Tooltip>
                                : "NA"}
                        </div>
                    </div>
                </td>

                <td className='truncate p-s10 border-r-[1px] text-center min-w-[150px] max-w-[150px]'>
                    <span className='flex flex-col body_text text-cGray'>
                        <span>{data?.date ? formatDate(data?.date) : <CommonEmptyStatus />}</span>
                        <span>{data?.end_time ? data?.end_time : <CommonEmptyStatus />}</span>
                    </span>
                </td>

                <td className='truncate capitalize p-s10 border-r-[1px] text-center min-w-[150px]'>
                    {data?.category_name ? valueCheck(data?.category_name) : <CommonEmptyStatus />}
                </td>

                <td className='truncate p-s10 border-r-[1px] body_text text-cGray capitalize text-center min-w-[150px]'>
                    {data?.status ? valueCheck(data?.status) : <CommonEmptyStatus />}
                </td>

                <td className='p-s10 border-r-[1px] body_text text-cGray capitalize text-center min-w-[150px]'>
                    {data?.payment_status ? valueCheck(data?.payment_status) : <CommonEmptyStatus />}
                </td>

            </tr>
        </>

    );
};

export default SchoolInstructorDrivingTableRow;