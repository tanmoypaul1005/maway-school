import React from 'react';
import CommonEmptyStatus from '../../../../Components/CommonEmptyStatus/CommonEmptyStatus';
import { valueCheck } from '../../../../Utility/UtilityFunctions';
import { formatDate } from '../../../../App/Utility/UtilityFunctions';

const SchoolInstructorInvoiceTableRow = ({ data, index }) => {

    return (
        <>
            <tr onClick={() => {

            }} className={`border-b border-collapse cursor-pointer border-cNmSelect hover:bg-cGridView m-s10`} >
                <th className='body_text text-cGray text-center border-r p-s10'>
                    <span>{index}</span>
                </th>

                <td className='truncate p-s10 border-r-[1px] body_text text-cGray text-center min-w-[150px]'>
                    {data?.invoice_id ? valueCheck(data?.invoice_id) : <CommonEmptyStatus />}
                </td>

                <td className='truncate p-s10 border-r-[1px] text-center body_text text-cGray min-w-[150px] max-w-[150px]'>
                    {data?.create_date && data?.create_time ? `${formatDate(data?.create_date)} , ${data?.create_time}` : 'NA'}
                </td>

                <td className='truncate p-s10 border-r-[1px] body_text text-cGray text-center min-w-[150px]'>
                    {data?.due_date ? formatDate(data?.due_date) : <CommonEmptyStatus />}
                </td>


                <td className='truncate p-s10 border-r-[1px] body_text text-cGray text-center min-w-[150px]'>
                    {data?.price ? valueCheck(data?.price) : <CommonEmptyStatus />}
                </td>

                <td className='p-s10 border-r-[1px] text-center min-w-[150px]'>
                    <div className='flex justify-center space-x-2.5 items-center'>
                        <span className="body_text text-cGray capitalize">
                            {
                                data?.invoice_status ?
                                    data?.invoice_status === "paid1" || data?.invoice_status === "paid2" ? "paid" :
                                        data?.invoice_status === "missing1" || data?.invoice_status === "missing2" ? "Missing" : data?.invoice_status
                                    : <CommonEmptyStatus />
                            }
                        </span>
                    </div>
                </td>
            </tr>
        </>

    );
};

export default SchoolInstructorInvoiceTableRow;