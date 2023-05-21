import React from 'react';
import { useNavigate } from 'react-router-dom';

import CommonButton from '../../Components/Button/CommonButton';
import CommonEmptyStatus from '../../Components/CommonEmptyStatus/CommonEmptyStatus';
import Image from '../../Components/Image/Image';
import { formatDate } from '../../Utility/UtilityFunctions';

function SecondaryInvoiceProfile({
    cvr,
    name,
    email,
    image,
    phone,
    joined,
    profile_link,
}) {
    const navigateTo = useNavigate();

    return (
        <div className="flex justify-between items-center bg-cBackgroundAndCategory rounded-br10 h-h250 sm:h-h250 lg:h-h150">
            <div className="flex col-span-5 py-s20 px-s20">
                <Image className="rounded-full w-w88 h-h88" src={image} />
                <div className="ml-s15">
                    <div className="leading-9 font-fw600 text-cHighlighted mb-s2 text-fs14 md:text-fs24">
                        {name === "null" ? <CommonEmptyStatus fontWeight='font-fw600' leading='leading-9' textColor='text-cHighlighted' size='text-fs24' /> : name}
                    </div>
                    {cvr ? <div className="leading-3 font-fw500 text-fs12 text-cImportantText mb-s6">
                        CVR :{cvr === "null" ?
                            <CommonEmptyStatus fontWeight='font-fw500' leading='leading-3' textColor='text-cImportantText' size='text-fs12' /> : cvr}</div> : ""}
                    <div className="leading-3 font-fw500 text-fs12 text-cImportantText mb-s6">
                        Email: {email === "null" ? <CommonEmptyStatus fontWeight='font-fw500' leading='leading-3' textColor='text-cImportantText' size='text-fs12' /> : email}
                    </div>


                    {phone ? <div className="leading-3 font-fw500 text-fs12 text-cImportantText pb-s6">
                        Phone : {phone === "null" ? <CommonEmptyStatus fontWeight='font-fw500' leading='leading-3' textColor='text-cImportantText' size='text-fs12' /> : phone}</div>
                        : <div className="leading-3 font-fw500 text-fs12 text-cImportantText pb-s6">
                            Phone : <CommonEmptyStatus fontWeight='font-fw500' leading='leading-3' textColor='text-cImportantText' size='text-fs12' /></div>}
                    {joined ? <div className="leading-3 font-fw500 text-fs12 text-cImportantText mb-s6">
                        Joined : {joined === "null" ? <CommonEmptyStatus fontWeight='font-fw500' leading='leading-3' textColor='text-cImportantText' size='text-fs12' /> : formatDate(joined)}</div> : ""}
                </div>
            </div>

            <div className='pr-5'>
                <CommonButton
                    btnLabel='go to profile'
                    colorType='primary'
                    roundedFull={true}
                    onClick={() => {
                        navigateTo(profile_link)
                    }}
                />
            </div>
        </div>
    );
};

export default SecondaryInvoiceProfile