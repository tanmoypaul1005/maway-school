import { Tooltip } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useDashboardStore from '../../App/Stores/DashboardStore';
import { dateDiffCalendar, formatDate } from '../../App/Utility/UtilityFunctions';
import CommonEmptyStatus from '../CommonEmptyStatus/CommonEmptyStatus';
import Image from '../Image/Image';
import ProfileTooltip from '../Tooltip/ProfileTooltip';
import { iRightArrow, iRightArrow2 } from './../../App/Utility/source';

const ActivitiesTableRow = ({ data, index }) => {

  const { pendingClickable, selected_option } = useDashboardStore();

  const navigateTo = useNavigate();

  const clickHandleOne = () => {
    console.log("clickHandleOne", selected_option);
    if (selected_option === "driving") {
      navigateTo("/student/details/" + data?.student_id);
    }

    if (selected_option === "external") {
      navigateTo("/student/details/" + data?.student_id);
    }

    if (selected_option === "classroom") {
      navigateTo("/school/details/" + data?.school_id);
    }
  }

  const clickHandleTwo = () => {
    console.log(data);

    if (data?.role === "school") {
      console.log("SCHOOL");
      navigateTo(`/school/details/${data?.to_user?.id}/invoice/${data?.to_user?.user_id}/details/${data?.id}/${data?.invoice_type_admin}`)
    }

    if (data?.role === "instructor") {
      console.log("INSTRUCTOR");
      navigateTo(`/instructor/details/${data?.to_user?.id}/invoice/${data?.to_user?.user_id}/details/${data?.id}/${data?.invoice_type_admin}`)
    }

    if (data?.role === "student") {
      console.log("STUDENT");
      navigateTo(`/student/details/${data?.to_user?.id}/invoice/details/${data?.id}/${data?.invoice_type_admin}`)
    }

    // console.log("clickHandleTwo", selected_option);
    // if (selected_option === "driving") {
    //   navigateTo("/instructor/details/" + data?.instructor_id);
    // }
    // if (selected_option === "external") {
    //   navigateTo("/instructor/details/" + data?.instructor_id);
    // }
  }

  return (
    <>
      <tr
        onClick={() => { clickHandleTwo(); }}
        className={`font - semibold border - b border - collapse ${selected_option === "invoice" ? "cursor-pointer" : "cursor-default"} border-cNmSelect hover: bg - cGridView`} >
        <th className='m-2 font-normal text-center border-r py-s10'>
          <span className='text-center'>{index + 1}</span>
        </th>

        <td className='border-r-[1px] py-s10 text-left px-s10 min-w-[180px] max-w-[180px]'>
          <div className='flex items-center'>
            <div className=''>
              {pendingClickable ? <Image className='rounded-full w-w44 h-h44 grow-0' src={data?.image} alt="" /> : ""}
            </div>
            {data?.name ?
              <Tooltip title={data?.name}>
                <div className='capitalize truncate justify-center pl-s10 font-fw600 text-cMainBlack lg:text-fs14 sm:text-fs12'>
                  {data?.name}
                </div></Tooltip> : <CommonEmptyStatus />}
          </div>
        </td>

        <td className='py-s10 border-r-[1px] min-w-[200px] truncate text-fs14 text-cTextBody '>
          <div className="flex justify-center text-fs14 font-fw600">
            <ProfileTooltip
              isActive={selected_option === "invoice" ? false : true}
              name={selected_option === "classroom" ? data?.school_name : data?.student_name}
              image={selected_option === "classroom" ? data?.school_image : data?.student_image}
            >
              <span className={`${selected_option === "invoice" ? "text-cMainBlack" : "underline cursor-pointer text-cBrand"} capitalize`} onClick={() => clickHandleOne()}>{data?.invoice_type ? data?.invoice_type[0] : <CommonEmptyStatus />} </span>
            </ProfileTooltip>
            <img className="px-s10 pt-s2" src={iRightArrow2} alt="" />

            <ProfileTooltip
              isActive={selected_option === "invoice" || selected_option === "classroom" ? false : true}
              name={data?.instructor_name}
              image={data?.instructor_image}
            >
              <span
                className={`${selected_option === "invoice" ? "text-cMainBlack" : selected_option === "classroom" ? "cursor-default text-cMainBlack" : "underline cursor-pointer text-cBrand"} capitalize`}
              // onClick={() => clickHandleTwo()}
              >
                {data?.invoice_type ? data?.invoice_type[1] : <CommonEmptyStatus />}
              </span>
            </ProfileTooltip>
          </div>
        </td>


        <td className='p-s10 border-r-[1px] text-fs14 font-fw400 text-center  text-cTextBody min-w-[100px]  max-w-[100px]'>
          {formatDate(data?.created_at) ?? <CommonEmptyStatus />}
          {/* <br></br> {data?.create_time ?? ''} */}
        </td>

        <td className='capitalize p-s10 border-r-[1px] text-fs14 font-fw400 text-center  text-cTextBody min-w-[85px]  max-w-[85px]'>
          {data?.last_action_user ? data?.last_action_user : <CommonEmptyStatus />}
        </td>

        <td className='py-s10 border-r-[1px] px-s10 min-w-[200px] max-w-[250px]'>
          <div className='flex relative flex-col justify-center items-center'>
            <div className='text-center capitalize text-fs14 font-fw600 text-cMainBlack'>{formatDate(data?.last_action) ?? <CommonEmptyStatus />}</div>
            <div className='font-normal text-center lowercase'>
              {dateDiffCalendar(new Date(), data?.last_action, true)} ago
            </div>
            {pendingClickable ? <img className="absolute right-s10 mt-s5" src={iRightArrow} alt=""></img> : ""}
          </div>
        </td>
      </tr>
    </>
  )
}


export default ActivitiesTableRow;