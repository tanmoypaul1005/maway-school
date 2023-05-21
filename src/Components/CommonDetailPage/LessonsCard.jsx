import React from 'react';
import Clamp from 'react-multiline-clamp';
import useInstructorStore from '../../App/Stores/InstructorStore';
import useLicenseStore from '../../App/Stores/LicenseStore';
import useSchoolStore from '../../App/Stores/SchoolStore';
import { iEditWhiteRounded } from '../../App/Utility/source';
import { dateDiffCalendar, extractDate, smartFormattedDateDiff } from '../../App/Utility/UtilityFunctions';
import { htmlToPlainText, NACheck } from '../../Utility/UtilityFunctions';
import CommonEmptyStatus from '../CommonEmptyStatus/CommonEmptyStatus';

const LessonsCard = ({
  title,
  price,
  packageDuration,
  momsValue = 0,
  startDate,
  endDate,
  purchaseDuration,
  licenseDetails,
  includedMoms = false,
  showFullDetails = false,
  withEditOption = false,
  status,
  licenseOf,
  licenseEdit
}) => {
  const {
    setShowEditDurationModal,
    setLicenseEditDurationStartDate,
    setLicenseEditDurationEndDate,
    setLicenseEditDurationUID,
    setLicenseEditDurationID,
    setLicenseEditDurationType
  } = useLicenseStore();

  const { schoolDetails } = useSchoolStore();
  const { instructorDetails } = useInstructorStore();
  let today = new Date();
  let endDateFormatted = new Date(endDate);
  let startDateFormatted = new Date(startDate);
  return (
    <div
      onClick={() => {
        console.log("showFullDetails:::", showFullDetails);
        console.log("title:::", title);
        console.log("status:::", status);
        console.log("price:::", price);
        console.log("packageDuration:::", packageDuration);
        console.log("momsValue:::", momsValue);
        console.log("startDate:::", startDate);
        console.log("endDate:::", endDate);
        console.log("purchaseDuration:::", purchaseDuration);
        console.log("licenseDetails:::", licenseDetails);
      }}
      className="static bg-cBrandColor p-s20 rounded-br10 w-s320 md:w-[400px]">
      <div className='pb-s10'>
        <div className="text-fs20 font-fw600 text-cBrandColor2">{title ??
          <CommonEmptyStatus fontWeight='font-fw600' fontSize="text-fs20" textColor="text-cBrandColor2" />}</div>
        <div className="capitalize text-cBrandColor2 text-fs14 font-fw600">Package Duration : {packageDuration ??
          <CommonEmptyStatus fontWeight='font-fw600' fontSize="text-fs14" textColor="text-cBrandColor2" />}</div>
      </div>


      {includedMoms ? <div className="text-cBrandColor2 text-fs32 font-fw600">DKK {price ?? "0"}</div> :
        <div className="text-cBrandColor2 text-fs32 font-fw600">DKK {price ? (price + momsValue) : "0"}</div>}
      <span className="text-cBrandColor2 text-fs14 font-fw400">(Included MOMS: DKK {momsValue ??
        <CommonEmptyStatus fontWeight='font-fw400' fontSize="text-fs14" textColor="text-cBrandColor2" />})</span>

      <div className="w-full bg-white h-s1 my-s10"></div>

      <div className="flex items-center justify-between">
        <div>
          <div className="text-cBrandColor2 text-fs14 font-fw400">Start Date : {startDate ?? <CommonEmptyStatus fontWeight='font-fw400' fontSize="text-fs14" textColor="text-cBrandColor2" />}</div>
          <div className="text-cBrandColor2 text-fs14 font-fw400">End Date : {endDate ?? <CommonEmptyStatus fontWeight='font-fw400' fontSize="text-fs14" textColor="text-cBrandColor2" />}</div>
        </div>


        {licenseEdit && <div>
          {(withEditOption === false || endDate === "null" || endDate === null) ?
            "" :
            <img
              src={iEditWhiteRounded}
              alt=""
              className='cursor-pointer'
              onClick={() => {
                if (licenseOf === "instructor") {
                  setLicenseEditDurationStartDate(extractDate(instructorDetails?.lisence?.start_time));
                  setLicenseEditDurationEndDate(extractDate(instructorDetails?.lisence?.end_time));

                  setLicenseEditDurationUID(instructorDetails?.id);
                  setLicenseEditDurationID(instructorDetails?.applyLicense_id);
                  setLicenseEditDurationType(licenseOf);

                } else if (licenseOf === "school") {
                  setLicenseEditDurationStartDate(extractDate(schoolDetails?.data?.school?.user?.purchase_lisence?.start_time));
                  setLicenseEditDurationEndDate(extractDate(schoolDetails?.data?.school?.user?.purchase_lisence?.end_time));

                  setLicenseEditDurationUID(schoolDetails?.data?.school?.id);
                  setLicenseEditDurationID(schoolDetails?.data?.school?.applyLicense_id);
                  setLicenseEditDurationType(licenseOf);
                }

                setShowEditDurationModal(true);

              }}
            />}
        </div>
        }
      </div>

      <div className='pt-s10'>
        <div className="capitalize text-cBrandColor2 text-fs14 font-fw600" >Purchase Duration : {status === "accepted" || status === "expired" ? purchaseDuration : "0 Days"}</div>
        {status === "accepted" ?
          <div className="capitalize text-cBrandColor2 text-fs14 font-fw600" >( {(endDate === "null" || endDate === null || today > endDateFormatted) ? "0 Days Remaining" : dateDiffCalendar(startDateFormatted > today ? startDate : new Date(), endDate) + " Remaining"} )</div>
          : <div className="capitalize text-cBrandColor2 text-fs14 font-fw600" >( 0 Days Remaining )</div>}
      </div>

      <div className="w-full bg-white h-s1 my-s10"></div>

      <div>
        <Clamp
          withTooltip
          lines={2}
          maxLines={5000}
          withToggle={showFullDetails}
          showMoreElement={({ toggle }) => (
            <button type="button" onClick={toggle} className="cursor-pointer text-[#eeff00] font-fw600 text-fs16 pt-s5">
              Show more
            </button>
          )}
          showLessElement={({ toggle }) => (
            <span type="button" onClick={toggle} className="cursor-pointer text-[#eeff00] font-fw600 text-fs16 pt-s5">
              Show less
            </span>
          )}
        >
          <div
            className="text-cBrandColor2 text-fs14 font-fw400">
            {/* {licenseDetails ? htmlToPlainText(licenseDetails) : ""} */}
            {licenseDetails === "null" || licenseDetails === null ? 'NA' : htmlToPlainText(licenseDetails)}
          </div>
        </Clamp>
      </div>
    </div>


  );
};

export default LessonsCard;