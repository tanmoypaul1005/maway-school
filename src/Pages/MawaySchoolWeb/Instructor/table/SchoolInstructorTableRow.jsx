import { Tooltip } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../../Components/Image/Image';
import CommonEmptyStatus from '../../../../Components/CommonEmptyStatus/CommonEmptyStatus';
import { valueCheck } from '../../../../Utility/UtilityFunctions';
import useSchoolInstructorStore from '../../../../App/Stores/school/schoolInstructorStore';

const SchoolInstructorTableRow = ({ data, index }) => {

    const navigate = useNavigate();

    const { setInstructor_invoice_search } = useSchoolInstructorStore.getState();

    return (
        <>
            <tr onClick={async () => {
                await setInstructor_invoice_search("")
                navigate("/school-instructor/details/" + data?.id + "/invoice");
            }} className={`border-b border-collapse cursor-pointer border-cNmSelect hover:bg-cGridView m-s10`} >
                <th className='body_text text-cGray text-center border-r p-s10'>
                    <span>{index}</span>
                </th>

                <td className='border-r-[1px] text-center p-s10 min-w-[200px] max-w-[200px] truncate'>
                    <div className='flex items-center sm:flex-col md:flex-row'>
                        <div className='ml-s4 min-w-[50px] max-w-[50px]'>
                            <Image
                                cursorPointerClass="cursor-pointer"
                                className='w-w44 h-h44 rounded-full'
                                src={data?.instructor?.profile_photo}
                                alt="" />
                        </div>
                        <div className='capitalize items-center ml-s8 body_text text-cGray truncate' >
                            {data?.instructor?.name ?
                                <Tooltip title={data?.instructor?.name}>
                                    <span className='truncate'>{valueCheck(data?.instructor?.name)} </span>
                                </Tooltip>
                                : <CommonEmptyStatus />}
                        </div>
                    </div>
                </td>

                <td className='truncate py-s10 border-r-[1px] p-s10 text-center min-w-[150px] max-w-[150px]'>
                    <Tooltip title={data?.instructor?.user_email}>
                        <span className='body_text text-cGray'>
                            {data?.instructor?.user_email ? valueCheck(data?.instructor?.user_email) : <CommonEmptyStatus />}
                        </span>
                    </Tooltip>
                </td>

                <td className='truncate py-s10 border-r-[1px] text-center p-s10 min-w-[150px]'>
                    <span className='body_text text-cGray'>
                        {data?.instructor?.phone_number ? valueCheck(data?.instructor?.phone_number) : <CommonEmptyStatus />}
                    </span>
                </td>

                <td className='py-s10 border-r-[1px] px-s15 text-center min-w-[150px]'>
                    <span className="capitalize body_text text-cGray">
                        {data?.status ? valueCheck(data?.status) : <CommonEmptyStatus />}
                    </span>
                </td>
            </tr>
        </>

    );
};

export default SchoolInstructorTableRow;