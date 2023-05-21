import React from 'react';
import { useNavigate } from 'react-router-dom';
import CommonButton from './../Button/CommonButton';
import { formatDate } from '../../Utility/UtilityFunctions';
import Image from '../Image/Image';
import CommonEmptyStatus from '../CommonEmptyStatus/CommonEmptyStatus';

const CommonStudentBasicDetails = ({ removeButton, profileLink, schools_info, student_info }) => {

  const navigate = useNavigate();

  return (
    <div>
      <>
        <div className="bg-cBackgroundAndCategory rounded-br20 py-s20 px-s20 ">

          <div className='grid grid-cols-2 divide-x divide-[#D1D0E2]'>

            {student_info && <div className="flex ">
              <div className="">
                <Image className="w-s88 h-s88 rounded-full mb-s18 object-cover" src={student_info.image} alt="" />
              </div>
              <div className="ml-s15 mt-25">
                <div className="font-fw600 text-fs24 text-cHighlighted mb-s2 leading-9">{student_info?.name}</div>
                <div className="font-fw500 text-fs12 text-cImportantText leading-3 mb-s6">Email : {student_info?.email}</div>
                <div className="font-fw500 text-fs12 text-cImportantText leading-3 pb-s6">
                  Phone : {student_info?.phone_number === "null" || student_info?.phone_number === null ? <CommonEmptyStatus textColor='text-cImportantText' fontWeight='font-fw500' leading='leading-3' size='text-fs12' /> : student_info?.phone_number}</div>
                <div className="font-fw500 text-fs12 text-cImportantText leading-3 pb-s6 capitalize">
                  Address : {student_info?.address === "null" || student_info?.address === null ? <CommonEmptyStatus textColor='text-cImportantText' fontWeight='font-fw500' leading='leading-3' size='text-fs12' /> : student_info?.address}</div>
                <div className="font-fw500 text-fs12 text-cImportantText leading-3 mb-s6 capitalize">
                  Joined : {student_info?.joined_date ? formatDate(student_info?.joined_date) :
                    <CommonEmptyStatus textColor='text-cImportantText' fontWeight='font-fw500' leading='leading-3' size='text-fs12' />}
                </div>
                {/* <div className="font-fw500 text-fs12 text-cImportantText leading-3 mb-s6 capitalize">
                  Address: {student_info?.address ?? <CommonEmptyStatus textColor='text-cImportantText' fontWeight='font-fw500' leading='leading-3' size='text-fs12' />}
                </div> */}
              </div>
            </div>}


            {schools_info && <div
              onClick={() => {
                // navigate(`${profileLink ? profileLink : ''}`);
                console.log("student_info::::", student_info);
              }}
              className="flex pl-s20"
            >
              <div className="">
                <Image className="w-s88 h-s88 rounded-full object-cover" src={schools_info?.image} alt="" />
                {removeButton && <CommonButton btnLabel="Remove" roundedFull="true" />}
              </div>
              <div className="ml-s15 mt-25">
                <div className="font-fw600 text-fs24 text-cHighlighted mb-s2 leading-9">{schools_info?.school_name}</div>
                <div className="font-fw500 text-fs12 text-cImportantText leading-3 mb-s6">
                  Email : {schools_info?.email === "null" || schools_info?.email === null ?
                    <CommonEmptyStatus fontWeight='font-fw500' leading='leading-3' size='text-fs12' textColor='text-cImportantText' /> : schools_info?.email}
                </div>
                <div className="font-fw500 text-fs12 text-cImportantText leading-3 pb-s6">
                  Phone : {schools_info?.phone_number === "null" || schools_info?.phone_number === null ?
                    <CommonEmptyStatus fontWeight='font-fw500' leading='leading-3' size='text-fs12' textColor='text-cImportantText' /> : schools_info?.phone_number}
                </div>
                <div className="font-fw500 text-fs12 text-cImportantText leading-3 pb-s6">
                  CVR : {schools_info?.cvr === "null" || schools_info?.cvr === null ?
                    <CommonEmptyStatus fontWeight='font-fw500' leading='leading-3' size='text-fs12' textColor='text-cImportantText' /> : schools_info?.cvr}
                </div>
                <div className="font-fw500 text-fs12 text-cImportantText leading-3 mb-s6">Joined : {formatDate(schools_info?.joined_date)}</div>
              </div>
            </div>}

          </div>

        </div>
      </>
    </div>
  );
};

export default CommonStudentBasicDetails;