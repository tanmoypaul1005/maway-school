import { Tooltip } from '@mui/material';
import React from 'react';
import { valueCheck } from '../../../../Utility/UtilityFunctions';
import useNotificationStore, { getNotificationDetails } from '../../../../App/Stores/school/notificationStore';
import { formatDate } from '../../../../App/Utility/UtilityFunctions';

const NotificationTableRow = ({ data, index }) => {

    const { setShowNotificationDetailsModal } = useNotificationStore();
    console.log("data",data)

    return (
        <>
            <tr onClick={async () => {
                await getNotificationDetails(data?.id);
                setShowNotificationDetailsModal(true)
            }} className={`border-b border-collapse cursor-pointer border-cNmSelect hover:bg-cGridView m-s10`} >
                <th className='font-normal text-center border-r p-s10'>
                    <span>{index}</span>
                </th>


                <td className='truncate border-r-[1px] p-s10 text-center min-w-[180px] max-w-[180px]'>
                    <Tooltip title={data?.title}>
                        <span className='body_text text-cGray'>
                            {data?.title ? valueCheck(data?.title) : "NA"}
                        </span>
                    </Tooltip>
                </td>

                <td className='truncate border-r-[1px] p-s10 text-center min-w-[200px] max-w-[200px]'>
                    <Tooltip title={data?.description}>
                        <span className='body_text text-cGray'>
                            {data?.description ? valueCheck(data?.description) : "NA"}
                        </span>
                    </Tooltip>
                </td>

                <td className='truncate p-s10 border-r-[1px] text-center body_text text-cGray min-w-[120px] max-w-[120px]'>
                    {data?.created_date && data?.created_time ?
                        `${formatDate(data?.created_date)}, ${data?.created_time}` : "NA"}
                </td>


                <td className='p-s10 border-r-[1px] text-center  min-w-[100px]'>
                    <span className="capitalize body_text text-cGray'">
                        {data?.status ? valueCheck(data?.status) : "NA"}
                    </span>
                </td>
            </tr>
        </>

    );
};

export default NotificationTableRow;