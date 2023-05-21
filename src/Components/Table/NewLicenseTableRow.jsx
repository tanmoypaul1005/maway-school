import { Tooltip } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { iRightArrow } from '../../App/Utility/source';
import { dateDiffCalendar, formatDate, smartFormattedDateDiff } from '../../App/Utility/UtilityFunctions';
import CommonEmptyStatus from '../CommonEmptyStatus/CommonEmptyStatus';
import Image from '../Image/Image';


const NewLicenseTableRow = ({ data, index }) => {
  const navigateTo = useNavigate();

  return (
    <>
      <tr
        onClick={() => { navigateTo("/invoice/details/" + data?.id) }}
        className={`border-b border-collapse cursor-pointer border-cNmSelect hover:bg-cGridView`} >
        <th className='font-normal text-center border-r py-s10'>
          <span className='text-center'>{index + 1}</span>
        </th>


        <td className='truncate border-r-[1px] py-s10 text-left px-s10 min-w-[180px] max-w-[180px]'>
          <div className='flex items-center'>
            <div className='mx-s5 w-[50px]'>
              <Image className='rounded-full w-w44 h-h44 grow-0' src={data?.image} alt="" />
            </div>
            <Tooltip title={data?.name}>
            {data?.name ? <div className='truncate items-center font-fw600 ml-s8 text-cMainBlack lg:text-fs14 sm:text-fs12'>
              {data?.name}
            </div> : <CommonEmptyStatus />}
            </Tooltip>
          </div>
        </td>

        <td className='p-s10  border-r-[1px] text-fs14 text-center text-cTextBody min-w-[150px] max-w-[150px]
        2xl:min-w-[200px] 2xl:max-w-[200px]'>
          <Tooltip title={data?.email}>
            <div className='font-fw400 text-cImportantText text-fs14 truncate'>{data?.email ? data?.email : <CommonEmptyStatus />}</div>
          </Tooltip>
        </td>

        <td className='p-s10 border-r-[1px] text-fs14 text-center text-cTextBody capitalize min-w-[80px] max-w-[80px]'>
          {data?.role ?? <CommonEmptyStatus />}
        </td>

        <td className='py-s10 border-r-[1px] pl-s10 text-fs14 font-fw400 text-center  text-cTextBody min-w-[120px] max-w-[120px]'>
          {formatDate(data?.create_date) ?? <CommonEmptyStatus />}
          <br></br> {data?.create_time ?? ''}
        </td>

        <td className='py-s10 border-r-[1px] px-s10 text-center relative min-w-[180px]  max-w-[180px]'>
          <span className='capitalize text-fs14 font-fw600 text-cMainBlack'>{data?.last_action_user ?? <CommonEmptyStatus />}</span> <br></br>
          <span className="lowercase">
            {dateDiffCalendar(new Date(), data?.last_action_date, true) + " ago"}
          </span>

          {/* {dateDifference(data?.last_action_date)}
           {dateDifference(data?.last_action_date) === 'Today' ? "":' days old'} */}
          <img className="absolute right-0 top-1/2 -translate-y-1/2 pr-s10 mt-s5" src={iRightArrow} alt="" />
        </td>

      </tr>
    </>
  )
}


export default NewLicenseTableRow;