import React, { useEffect, useState } from 'react';
import useStudentStore, { studentToggleStatus } from '../../../App/Stores/StudentStore';
import { iEdiItIcon } from '../../../App/Utility/source';
import { formatDate } from '../../../Utility/UtilityFunctions';
import CommonEmptyStatus from '../../CommonEmptyStatus/CommonEmptyStatus';
import Image from '../../Image/Image';
import GreenSwitch from '../../Switch/GreenSwitch';

const StudentProfile = ({ onClick }) => {
  const { setStudentCurriculumHistoryShareId, studentDetails, setShowDeactivateStudent, setEditFormData } = useStudentStore();

  const [enabled, setEnabled] = useState(false);

  const HandleDeactivate = async () => {

    if (enabled === true) {
      await setShowDeactivateStudent(true);
    } else {
      let activateSuccess = await studentToggleStatus(studentDetails?.id);
      if (activateSuccess) setEnabled(true);
    }
  }

  useEffect(() => {
    setEnabled(studentDetails?.is_active);
    // setStudentCurriculumHistoryShareId(studentDetails?.user_id)
  }, [studentDetails]);

  //console.log("studentDetails", studentDetails);
  const reSetData = () => {
    setEditFormData("id", "");
    setEditFormData("student_name", "");
    setEditFormData("email", "")
    setEditFormData("phone_number", '')
    setEditFormData("address", "")
    setEditFormData("image", "")
  }

  return (
    <>
      <div className="flex justify-between bg-cBackgroundAndCategory rounded-br20 py-s20 px-s20">
        <div className="flex">
          <div className="">
            <Image className="rounded-full w-s88 h-s88 mb-s18" src={studentDetails?.profile_photo} alt="" />
            <div className='flex justify-center'><GreenSwitch enabled={enabled} setEnabled={() => HandleDeactivate()} /></div>
            <div className={`${enabled ? 'text-cPassed' : 'text-cFailed'} 
                 mt-s5 text-fs14 font-fw400 text-center`}>
              {enabled ? 'Active' : 'Deactivate'}
            </div>
          </div>

          <div className="ml-s15 mt-25">
            <div className="leading-9 font-fw600 text-fs22 text-cHighlighted mb-s2">
              {studentDetails?.name ? studentDetails?.name :
                <CommonEmptyStatus fontWeight='font-fw600' textColor='text-cHighlighted' leading="leading-9" size='text-fs22' />}</div>
            <div className="leading-3 font-fw500 text-fs12 text-cImportantText mb-s6">
              Email : {studentDetails?.email ? studentDetails?.email :
                <CommonEmptyStatus fontWeight='font-fw500' textColor='text-cImportantText' leading="leading-3" size='text-fs12' />}</div>
            <div className="leading-3 font-fw500 text-fs12 text-cImportantText pb-s6">
              Phone : {studentDetails?.phone_number === "null" || studentDetails?.phone_number === null ? <CommonEmptyStatus fontWeight='font-fw500' textColor='text-cImportantText' leading="leading-3" size='text-fs12' /> : studentDetails?.phone_number}</div>
            
            {/* <div className="leading-3 font-fw500 text-fs12 text-cImportantText pb-s6 capitalize">
              Address : {studentDetails?.address === "null" || studentDetails?.address === null ? <CommonEmptyStatus fontWeight='font-fw500' textColor='text-cImportantText' leading="leading-3" size='text-fs12' /> : studentDetails?.address}
            </div> */}

            <div className="leading-3 font-fw500 text-fs12 text-cImportantText mb-s6">
              joined : {studentDetails?.joined_date === "null" || studentDetails?.joined_date === null ? <CommonEmptyStatus fontWeight='font-fw500' textColor='text-cImportantText' leading="leading-3" size='text-fs12' /> : formatDate(studentDetails?.joined_date)}</div>
          </div>
        </div>

        <div><img className="w-s28 h-s28 cursor-pointer" src={iEdiItIcon}
          onClick={async () => {
            await reSetData()
            onClick()
          }} alt="" /></div>

      </div>
    </>
  );
};

export default StudentProfile;