import { Tooltip } from '@mui/material';
import React from 'react';
import Image from '../../../../Components/Image/Image';
import CommonEmptyStatus from '../../../../Components/CommonEmptyStatus/CommonEmptyStatus';
import { useNavigate } from 'react-router-dom';
import useSchoolStudentStore from '../../../../App/Stores/school/schoolStudentStore';

const SchoolStudentListTableRow = ({ data, index }) => {

    const navigateTo = useNavigate();

    const { setSchoolStudentInvoiceSearch } = useSchoolStudentStore();

    return (
        <>
            <tr
                onClick={() => {
                    navigateTo(`/school-student/details/${data.id}`);
                    setSchoolStudentInvoiceSearch("")
                }}
                className={`border-b border-collapse cursor-pointer border-cNmSelect hover:bg-cGridView`} >
                <th className='body_text text-cGray text-center border-r p-s10'>
                    {index}
                </th>

                {/* name with image */}
                <td className='border-r-[1px] p-s10 text-left px-s10 min-w-[150px] max-w-[150px] 2xl:min-w-[200px] 2xl:max-w-[200px]'>
                    <div className='flex flex-row items-center'>
                        <div className='min-w-[50px] max-w-[50px]'>
                            <Image
                                cursorPointerClass="cursor-pointer"
                                className='rounded-full w-w44 h-h44 grow-0'
                                src={data?.image}
                            />
                        </div>
                        <Tooltip title={data?.name}>
                            {data?.name ? <div className='capitalize body_text text-cGray max-w-[130px] 2xl:max-w-[200px] truncate'>{data?.name}</div> : <CommonEmptyStatus />}
                        </Tooltip>
                    </div>
                </td>

                {/* category */}
                <td className='p-s10  border-r-[1px] text-fs14 text-center 
                min-w-[150px] max-w-[150px] 2xl:min-w-[200px] 2xl:max-w-[200px]'>
                    <Tooltip title={data?.category}>
                        <div className='body_text text-cGray truncate'>
                            {data?.category ? data?.category : 'NA'}
                        </div>
                    </Tooltip>
                </td>

                {/* amount */}
                <td className='p-s10 border-r-[1px] text-center min-w-[110px] max-w-[110px] truncate body_text text-cGray'>
                    {data?.amount ? data?.amount : 'NA'}
                </td>

                {/* remaining */}
                <td className='p-s10 border-r-[1px] text-center min-w-[110px] max-w-[110px] truncate body_text text-cGray'>
                    {data?.remaining ? data?.remaining : 'NA'}
                </td>

                {/* status */}
                <td className='p-s10 border-r-[1px] text-center min-w-[110px] max-w-[110px] capitalize truncate body_text text-cGray'>
                    {data?.status ? data?.status : 'NA'}
                </td>

            </tr>
        </>
    )
}

export default SchoolStudentListTableRow;