
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { iProfile } from '../../App/Utility/source';
 

const InvoiceHistoryTableRow= (data) => {
  const navigate=useNavigate()
  return (
    <>
    <tr onClick={()=>{navigate("/invoice/application/1")}} className={`border-b cursor-pointer border-collapse border-cNmSelect`} >
      <th className='font-normal py-s10 border-r text-left pl-s10 m-s8'>
       <span className='mr-s12 dm:mr12 md:mr-0 '>1</span>
      </th>


      <td className='border-r-[1px] py-s10 text-left px-s10 min-w-[130px]'>
        <span className='flex min-w-[30px] sm:flex-col md:flex-row'>
        <span className='ml-s4'>
        <img className='w-w44 h-h44 rounded-full grow-0' src={iProfile} alt=""/></span>
        <span className='my-2 font-fw600 ml-2 justify-center text-cMainBlack lg:text-fs14 sm:text-fs12 '>DenMark Drivingggg </span>
        </span>
      </td>

      <td className='py-s10 border-r-[1px]  px-s10 truncate text-center text-fs14 text-cTextBody  min-w-[80px]'>
      denmarkdriving@gmail.com
      </td>

      <td className='py-s10 border-r-[1px] pl-s10 text-fs14 text-center text-cTextBody'>
       School
      </td>

      <td className='py-s10 border-r-[1px] pl-s10 text-fs14 font-fw400 text-center  text-cTextBody'>
      22 July, 2022 
      <br></br>10:00
      </td>

      <td className='py-s10 border-r-[1px] px-s10 text-center'>        
        <span className='text-fs14 font-fw600 text-cMainBlack'>School</span> <br></br>3 days old      
      </td>

      <td className='py-s10 border-r-[1px] pl-s10 text-fs14 text-center text-cTextBody'>
      Completed
      </td>
    </tr>
    </>
  )
}


export default InvoiceHistoryTableRow;