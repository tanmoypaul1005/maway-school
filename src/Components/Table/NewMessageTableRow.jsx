
import React from 'react';
import useContactStore from '../../App/Stores/ContactStore';
import { dateDiffCalendar, dateDifference, formatDate, smartFormattedDateDiff } from '../../App/Utility/UtilityFunctions';
import CommonEmptyStatus from '../CommonEmptyStatus/CommonEmptyStatus';
import Image from '../Image/Image';


const NewMessageTableRow = ({ data, index }) => {

  const { setChatDetails } = useContactStore();

  const { setShowContactMessageDetails } = useContactStore()

  return (
    <>

      <tr
        onClick={() => { setShowContactMessageDetails(true); setChatDetails(data); }}
        className={`border-b border-collapse cursor-pointer border-cNmSelect hover:bg-cGridView`} >
        <th className='font-normal text-center border-r py-s10 '>
          <span className='text-center'>{index + 1}</span>
        </th>


        <td className='border-r-[1px] py-s10 text-left px-s10 max-w-[180px] min-w-[180px] truncate'>
          <div className='flex items-center'>
            <div className='mx-s5 max-w-[50px] min-w-[50px]'>
              <Image className='rounded-full w-w44 h-h44 grow-0' src={data?.image} alt="" />
            </div>
            <div className='items-center font-fw600 ml-s8 text-cMainBlack lg:text-fs14 sm:text-fs12 truncate'>{data?.name ?? <CommonEmptyStatus />}</div>
          </div>
        </td>


        <td className='py-s10 border-r-[1px] px-s10 truncate text-center text-fs14 text-cTextBody  max-w-[150px] min-w-[150px]'>
          {data?.subject ?? <CommonEmptyStatus />}
        </td>


        <td className='px-s10 border-r-[1px]  text-fs14 text-center text-cTextBody max-w-[150px] min-w-[150px]'>
          {data?.message.substring(0, 40) + '...' ?? <CommonEmptyStatus />}
        </td>


        <td className='xy-s10 border-r-[1px]  text-fs14 font-fw400 text-center  text-cTextBody min-w-[150px]'>
          {formatDate(data?.create_date) ?? <CommonEmptyStatus />}
          <br></br> {data?.create_time ?? ''}
        </td>

        <td className='py-s10 border-r-[1px] px-s10 text-center max-w-[150px] min-w-[150px]'>
          <span className='capitalize text-fs14 font-fw600 text-cMainBlack'>
            {data?.last_action_user ?? <CommonEmptyStatus />}</span>
          <br></br>
          <span className="lowercase">
            {dateDiffCalendar(new Date(), data?.last_action_date, true) + " ago"}
          </span>
          {/* {dateDifference(data?.last_action_date)}
          {dateDifference(data?.last_action_date) === 'Today' ? "" : ' days old'} */}
        </td>


      </tr>
    </>


  )
}


export default NewMessageTableRow;