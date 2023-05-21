import React from 'react';
import CommonButton from '../../../../Components/Button/CommonButton';
import { useNavigate } from 'react-router-dom';
import CommonButtonOutlined from '../../../../Components/Button/CommonButtonOutlined';
import { dateDiffCalendar } from '../../../../App/Utility/UtilityFunctions';
import { useTranslation } from 'react-i18next';

const LicenseExpireCard = ({ message = "", linkTo = "", title = "NA", duration = "NA", start_date = "NA", end_date = "NA", onClick }) => {

    const navigateTo = useNavigate();
    const { t } = useTranslation();

    let today = new Date();
    let end_dateFormatted = new Date(end_date);
    let startDateFormatted = new Date(start_date);

    return (
        <div className='p-s20 ring-2 ring-cBrand rounded-br8 max-w-[370px] min-w-[370px] relative'>
            <div className='text-fs16 font-fw600 text-[#F64242] mb-s12'>{message}</div>
            <div className='flex p-0 relative'>
                <div className=''>
                    <div className='text-cBlack section_title font-fw600'>
                        {title}
                    </div>
                    <div className='text-cBlack sub_title'>{t("Package duration")}: {duration}</div>
                    <div className='text-cGray body_text'>{t("Start date")}: {start_date}</div>
                    <div className='text-cGray body_text'>{t("End date")}: {end_date}</div>
                    <div className='text-cBlack sub_title'>
                        {t("Remaining")}: {(end_date === "null" || end_date === null || today > end_dateFormatted) ? "0 Days Remaining" : dateDiffCalendar(startDateFormatted > today ? start_date : new Date(), end_date) + ""}
                    </div>
                </div>

                <div
                    onClick={onClick}
                    className='cursor-pointer text-cBrand text-fs14 font-fw400 absolute top-1 right-0'>
                    {t("Details")}
                </div>
            </div>


            <div className='absolute bottom-5'>
                <div className='grid gap-x-40 grid-cols-2'>
                    <CommonButtonOutlined
                        onClick={() => { navigateTo(`${linkTo}`) }}
                        isFullRounded={false}
                        btnLabel={t('License overview')}
                        colorType='primary'
                    />

                    <CommonButton
                        onClick={() => { navigateTo(`${linkTo}`) }}
                        roundedFull={false}
                        btnLabel={t('Renew')}
                        width='w-[80px]'
                    />
                </div>
            </div>

        </div>
    );
};

export default LicenseExpireCard;