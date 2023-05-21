
import React from 'react'
import {iProfile} from '../../App/Utility/source';

const LicenseHistoryTableRow= (data) => {

  return (
    <>
    <tr  className={`border-b cursor-pointer border-collapse border-cNmSelect`} >
      <th className='font-normal py-s10 border-r text-left pl-s10 m-2'>
       <span className='mr-s12 dm:mrs12 md:mr-0 '>1</span>
      </th>
  
      <td className='border-r-[1px] py-s10 text-left px-s10 max-w-[100px] min-w-[120px] '>
        <div className='flex min-w-[80px] sm:flex-col md:flex-row'>
        <div className='ml-s4'><img className='w-w44 h-h44 rounded-full grow-0' src={iProfile} alt=""/></div>
        <div className='my-s8 font-fw600 ml-s8 justify-center text-cMainBlack lg:text-fs14 sm:text-fs12 '>Basic</div>
        </div>
      </td>


      <td className='py-s10 border-r-[1px] pl-s10 text-fs14 text-center text-cTextBody'>
      <span className='font-fw400 text-cImportantText text-fs14'>1 Year</span>
      </td>

      <td className='py-s10 border-r-[1px] pl-s10 text-fs14 font-fw400 text-center  text-cTextBody'>
       <span className='font-fw400 text-cImportantText text-fs14'>22 Jan, 2022</span>
      </td>

      <td className='py-s10 border-r-[1px] pl-s10 text-fs14 text-center text-cTextBody'>
      <span className='font-fw400 text-cImportantText text-fs14'>22 Jan, 2023</span>
      </td>

      <td className='py-s10 border-r-[1px] pl-s10 text-fs14 font-fw400 text-center  text-cTextBody'>
       <span className='font-fw400 text-cImportantText text-fs14'>1.000</span>
      </td>

      <td className='py-s10 border-r-[1px] pl-s10 text-fs14 font-fw400 text-center  text-cTextBody'>
       <span className='font-fw400 text-cImportantText text-fs14'></span>
      </td>

    </tr>
    </>
  )
}


export default LicenseHistoryTableRow;