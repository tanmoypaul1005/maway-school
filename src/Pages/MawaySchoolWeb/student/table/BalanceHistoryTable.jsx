import React from 'react';
import useSchoolStudentStore, { schoolStudentBalanceHistoryShow } from '../../../../App/Stores/school/schoolStudentStore';
import { Tooltip } from '@mui/material';
import { formatDate, formatDateOrTime } from '../../../../Utility/UtilityFunctions';
import { formatDkkPrice } from '../../../../App/Utility/UtilityFunctions';

const BalanceHistoryTable = ({ data, index }) => {

    const { setShowTransactionDetailsModal } = useSchoolStudentStore();

    return (
        <>
            <tr
                onClick={async () => {
                    await schoolStudentBalanceHistoryShow(data?.id)
                    setShowTransactionDetailsModal(true)
                }}
                className={`border-b border-collapse cursor-pointer border-cNmSelect hover:bg-cGridView`} >
                <th className='body_text text-cGray text-center border-r p-s10'>
                    {index}
                </th>

                {/* Title */}
                <td className='p-s10 border-r-[1px] text-left
                min-w-[150px] max-w-[150px] 2xl:min-w-[200px] 2xl:max-w-[200px]'>
                    {data?.title ? <Tooltip title={data?.title}>
                        <div className='body_text text-cGray truncate capitalize'>{data?.title}</div>
                    </Tooltip> : 'NA'}
                </td>

                {/* Amount*/}
                <td className='p-s10 border-r-[1px] body_text text-cGray text-center min-w-[110px] max-w-[110px] truncate'>
                    {"DKK " + formatDkkPrice(data?.amount) ?? 0}
                </td>

                {/* date */}
                <td className='p-s10 border-r-[1px] body_text text-cGray text-center min-w-[110px] max-w-[110px] truncate capitalize '>
                    {data?.transaction_date ? formatDate(data?.transaction_date) + ", " + formatDateOrTime(data?.transaction_date) : 'NA'}
                </td>

                <td className='p-s10 border-r-[1px] body_text text-cGray text-center min-w-[110px] max-w-[110px] truncate capitalize'>
                    {data?.transaction_type === "booking" ? data?.transaction_status : data?.transaction_type ?? 'NA'}
                </td>

            </tr>
        </>
    )
}

export default BalanceHistoryTable;