import React, { useState } from 'react'
import LessonsCard from './LessonsCard';
import GreenSwitch from './../Switch/GreenSwitch';
import { iEdiItIcon, iUserAvatar } from './../../App/Utility/source';
import useSchoolStore, { resetSchoolEditData, schoolToggleStatus } from './../../App/Stores/SchoolStore';
import { useEffect } from 'react';
import { smartFormattedDateDiff, formatDate, dateDiffCalendar, roughLicenseDurationFormatter } from './../../App/Utility/UtilityFunctions';
import NoLicense from './NoLicense';
import Image from './../Image/Image';
import CommonEmptyStatus from '../CommonEmptyStatus/CommonEmptyStatus';
import { htmlToPlainText } from '../../Utility/UtilityFunctions';
import Clamp from 'react-multiline-clamp';

function CommonDetailPage({ showCommonEditModal, description, data, edit = true }) {

    const {  setShowDeactivateSchool, setSchoolDeactivateID,setShowBankDetailsModal } = useSchoolStore();

    const [enabled, setEnabled] = useState(false);

    const [licenseDetails, setLicenseDetails] = useState(false);

    const HandleDeactivate = async () => {
        await setSchoolDeactivateID(data.school?.id)
        if (enabled === true) {
            await setShowDeactivateSchool(true);
        } else {
            let activateSuccess = await schoolToggleStatus(data?.school?.id);
            if (activateSuccess) setEnabled(true);
        }
    }
    let MOMS = (JSON.parse(localStorage.getItem("user")));

    useEffect(() => {
        setEnabled(data?.school?.is_active);

        if (!MOMS.moms) MOMS = { moms: 25 };

        if (data?.school?.user?.purchase_lisence) {
            setLicenseDetails({
                title: data?.school?.user?.purchase_lisence?.lisence?.title,
                price: data?.school?.user?.purchase_lisence?.lisence?.price,
                packageDuration: roughLicenseDurationFormatter(data?.school?.user?.purchase_lisence?.lisence?.duration),
                momsValue: (parseInt(data?.school?.user?.purchase_lisence?.lisence?.price) * ((MOMS.moms) / 100)),
                startDate: formatDate(data?.school?.user?.purchase_lisence?.start_time),
                endDate: formatDate(data?.school?.user?.purchase_lisence?.end_time),
                purchaseDuration: dateDiffCalendar((data?.school?.user?.purchase_lisence?.start_time), (data?.school?.user?.purchase_lisence?.end_time)),
                licenseDetails: data?.school?.user?.purchase_lisence?.lisence?.details,
                status: data?.school?.user?.purchase_lisence?.status
            });
        } else {
            setLicenseDetails({
                title: data?.school?.user?.apply_license?.lisence?.title,
                price: data?.school?.user?.apply_license?.lisence?.price,
                packageDuration: roughLicenseDurationFormatter(data?.school?.user?.apply_license?.lisence?.duration),
                momsValue: (parseInt(data?.school?.user?.apply_license?.lisence?.price) * ((MOMS.moms) / 100)),
                startDate: formatDate(data?.school?.user?.apply_license?.start_time),
                endDate: formatDate(data?.school?.user?.apply_license?.end_time),
                purchaseDuration: smartFormattedDateDiff((data?.school?.user?.apply_license?.start_time), (data?.school?.user?.apply_license?.end_time)),
                licenseDetails: data?.school?.user?.apply_license?.lisence?.details,
                status: data?.school?.user?.apply_license?.status
            });
        }

    }, [data]);
    return (
        <div className="flex w-full">
            <div className="w-full pr-s20">
                <div className="bg-cBackgroundAndCategory h-full rounded-br10 py-s20 px-s20">
                    <div className='flex justify-between lg:flex'>
                        <div className="flex w-full">
                            <div className=''>
                                <div className='w-s88 h-s88 mb-s18'>
                                    <Image className='rounded-full w-s86 h-s86 ' src={data?.school?.cover} dummyImage={iUserAvatar} />
                                </div>

                                <div className='flex justify-center'>
                                    {edit ? <GreenSwitch
                                        enabled={enabled}
                                        setEnabled={() => HandleDeactivate()}
                                    /> :
                                        <GreenSwitch
                                            enabled={enabled}
                                        />
                                    }
                                </div>
                                <div className={`${enabled ? 'text-cPassed' : 'text-cFailed'} 
                                      mt-s5 text-fs14 font-fw400 text-center`}>
                                    {enabled ? 'Active' : <span className=''>Deactivate</span>}
                                </div>
                            </div>

                            <div className="ml-s15">
                                <div className="leading-9 font-fw600 text-fs24 text-cHighlighted mb-s2">
                                    {data?.school?.name === "null" || data?.school?.name === null ?
                                        <CommonEmptyStatus size='text-fs24' fontWeight='font-fw600' textColor='text-cHighlighted' /> :
                                        data?.school?.name}
                                </div>

                                <div onClick={()=>{setShowBankDetailsModal(true)}} className='text-cBrand text-fs16 font-fw600 mb-s6 cursor-pointer'>Bank Details</div>

                                <div className="leading-3 font-fw500 text-fs12 text-cImportantText mb-s6">
                                    CVR : {data?.school?.cvr === "null" || data?.school?.cvr === null ?
                                        <CommonEmptyStatus size='text-fs14' fontWeight='font-fw400' textColor='text-cImportantText' /> :
                                        data?.school?.cvr}
                                </div>
                                <div className="leading-3 font-fw500 text-fs12 text-cImportantText mb-s6">
                                    Email : {data?.school?.email === "null" || data?.school?.email === null ?
                                        <CommonEmptyStatus size='text-fs14' fontWeight='font-fw400' textColor='text-cImportantText' />
                                        : data?.school?.email}
                                </div>
                                <div className="leading-3 font-fw500 text-fs12 text-cImportantText mb-s6">
                                    Contact Mail : {data?.school?.contact_mail === "null" || data?.school?.contact_mail === null ?
                                        <CommonEmptyStatus size='text-fs14' fontWeight='font-fw400' textColor='text-cImportantText' /> :
                                        data?.school?.contact_mail}
                                </div>
                                <div className="leading-3 font-fw500 text-fs12 text-cImportantText mb-s6">
                                    Phone : {data?.school?.phone_number === "null" || data?.school?.phone_number === null ?
                                        <CommonEmptyStatus size='text-fs14' fontWeight='font-fw400' textColor='text-cImportantText' /> :
                                        data?.school?.phone_number}
                                </div>
                                <div className="leading-3 font-fw500 text-fs12 text-cImportantText mb-s6">
                                    Website : {data?.school?.website === "null" || data?.school?.website === null ?
                                        <CommonEmptyStatus size='text-fs14' fontWeight='font-fw400' textColor='text-cImportantText' /> :
                                        data?.school?.website}
                                </div>
                                <div className="leading-3 font-fw500 text-fs12 text-cImportantText mb-s6 mt-s6">
                                    Zip code : {data?.school?.zip_code === "null" || data?.school?.zip_code === null ?
                                        <CommonEmptyStatus size='text-fs14' fontWeight='font-fw400' textColor='text-cImportantText' /> :
                                        data?.school?.zip_code}
                                </div>
                                <div className="capitalize leading-3 font-fw500 text-fs12 text-cImportantText mb-s6 mt-s6">
                                    City : {data?.school?.city === "null" || data?.school?.city === null ?
                                        <CommonEmptyStatus size='text-fs14' fontWeight='font-fw400' textColor='text-cImportantText' /> :
                                        data?.school?.city}
                                </div>
                                <div className="capitalize leading-3 font-fw500 text-fs12 text-cImportantText mb-s6 mt-s6">
                                    Address : {data?.school?.address === "null" || data?.school?.address === null ?
                                        <CommonEmptyStatus size='text-fs14' fontWeight='font-fw400' textColor='text-cImportantText' /> :
                                        data?.school?.address}
                                </div>
                                <div className="leading-3 font-fw500 text-fs12 text-cImportantText mb-s6">
                                    joined : {data?.school?.user?.created_at ? formatDate(data?.school?.user?.created_at) : ''}
                                </div>

                                {description && <div className='mt-s20'>
                                    <div className="text-fs14 text-cHighlighted font-fw600 mb-s5 mt-">Description</div>

                                    <Clamp
                                        lines={1}
                                        maxLines={100}
                                        withToggle
                                        showMoreElement={({ toggle }) => (
                                            <button className="cursor-pointer text-cBrandColor mt-s3 text-fs14 font-fw400" type="button" onClick={toggle}>
                                                Show more
                                            </button>
                                        )}
                                        showLessElement={({ toggle }) => (
                                            <span className="cursor-pointer text-cBrandColor mt-s3 text-fs14 font-fw400" type="button" onClick={toggle}>
                                                See Less
                                            </span>
                                        )}
                                    >
                                        <div className="text-fs14 font-fw400 text-cTextGray max-w-[500px]">
                                            {/* {htmlToPlainText(data?.school?.long_description)} */}
                                            {data?.school?.long_description === "null" || data?.school?.long_description === null ?
                                                <CommonEmptyStatus size='text-fs14' fontWeight='font-fw400' textColor='text-cTextGray' /> :
                                                htmlToPlainText(data?.school?.long_description)}
                                        </div>
                                    </Clamp>
                                </div>
                                }


                            </div>
                        </div>
                        <div className="cursor-pointer">
                            {edit && <img
                                className="w-s28 h-s28"
                                src={iEdiItIcon}
                                onClick={async () => {
                                    await resetSchoolEditData()
                                    showCommonEditModal()
                                }}
                                alt="" />
                            }
                        </div>
                    </div>
                </div>
            </div>
            {
                data?.school?.user?.apply_license === null ? <NoLicense user_id={data?.school?.user_id} showAssignLicense={data?.school?.is_active} /> :
                    <div className="min-w-[400px]">
                        <LessonsCard
                            withEditOption={true}
                            licenseOf="school"
                            title={licenseDetails?.title}
                            price={licenseDetails?.price}
                            packageDuration={licenseDetails?.packageDuration}
                            momsValue={licenseDetails?.momsValue}
                            startDate={licenseDetails?.startDate}
                            endDate={licenseDetails?.endDate}
                            purchaseDuration={licenseDetails?.purchaseDuration}
                            licenseDetails={licenseDetails?.licenseDetails}
                            status={licenseDetails?.status}
                            licenseEdit={edit}
                        />
                    </div>
            }

        </div>

    )
}

export default CommonDetailPage
