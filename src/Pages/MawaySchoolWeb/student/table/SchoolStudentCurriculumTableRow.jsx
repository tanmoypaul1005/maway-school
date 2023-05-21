import { Tooltip } from '@mui/material';
import React from 'react';
import { MinToHour } from '../../../../Utility/UtilityFunctions';
import useSchoolStudentStore, { getSchoolStudentCurriculumDetails } from '../../../../App/Stores/school/schoolStudentStore';

const SchoolStudentCurriculumTableRow = ({ data, index }) => {

    const { setShowSchoolStudentCurriculumDetailsModal } = useSchoolStudentStore();

    return (
        <>
            <tr
                onClick={async () => {
                    await getSchoolStudentCurriculumDetails(data?.id);
                    setShowSchoolStudentCurriculumDetailsModal(true)
                }}
                className={`border-b border-collapse cursor-pointer border-cNmSelect hover:bg-cGridView`} >
                <th className='body_text text-cGray text-center border-r p-s10'>
                    {index}
                </th>

                {/* invoice_id */}
                <td className='p-s10 border-r-[1px] text-left
                min-w-[150px] max-w-[150px] 2xl:min-w-[200px] 2xl:max-w-[200px]'>
                    {data?.name ? <Tooltip title={data?.name}>
                        <div className='body_text text-cGray truncate capitalize'>
                            {data?.name ? data?.name : 'NA'}
                        </div>
                    </Tooltip> : 'NA'}
                </td>

                {/* create_date */}
                <td className='p-s10 border-r-[1px] body_text text-cGray text-center capitalize min-w-[110px] max-w-[110px] truncate'>
                    {data?.type ? data?.type : 'NA'}
                </td>

                {/* duration */}
                <td className='p-s10 border-r-[1px] body_text text-cGray text-center min-w-[110px] max-w-[110px] truncate'>
                    {data?.duration ? MinToHour(data?.duration) + " hr" : 'NA'}
                </td>

                {/* status */}
                <td className='p-s10 border-r-[1px] body_text text-cGray text-center min-w-[110px] max-w-[110px] truncate'>
                        {data?.status ? data?.status === 'passed' ?
                            'Attend' :data?.status === 'failed' ?
                            'Absent' : data?.status : 'NA'}
                </td>

            </tr>
        </>
    )
}

export default SchoolStudentCurriculumTableRow;