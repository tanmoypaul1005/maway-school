import React from 'react';
import Clamp from "react-multiline-clamp";
import { iVector } from '../../../../App/Utility/source';
import { htmlToPlainText } from '../../../../Utility/UtilityFunctions';
import { roughLicenseDurationFormatter } from '../../../../App/Utility/UtilityFunctions';
import { useTranslation } from 'react-i18next';

const LicenseCard = ({ onClick = () => { }, status = "Active", main_price, durationf, editOption, linked = true, showControls = true,
    selected = false, title = "", type = "", price = '', duration = "", details = "", detailsModal = () => { } }) => {

    const { t } = useTranslation();

    return (
        <div onClick={onClick} className="min-w-[300px] w-full h-full cursor-pointer relative">
            <div
                className={`min-w-[300px] w-full h-full p-s16 rounded-br8 text-[#1E1E1E]
                 ${selected ? "bg-cSettingsOptionBgColor ring-2 ring-cBrand" : "bg-[#D9D9D9]"}`}>

                <div className='flex-col md:flex md:flex-row justify-between '>
                    <div>
                        <Clamp withTooltip lines={1}>
                            <div className="pr-s5 capitalize mb-s8 section_title text-cBlack">{title}</div>
                        </Clamp>
                        <div className="text-cBlack large_h1">DKK {`${main_price ? main_price?.toLocaleString("da-DK") : 'NA'}`}</div>
                    </div>

                    {editOption ?
                        showControls ?
                            <div className='flex'>
                                <div
                                    onClick={(e) => { e.preventDefault(); }}
                                    className='z-30 mr-s3 rounded-full cursor-pointer ml-s25  w-s25 h-s25'
                                >
                                    <img className="m-s7 w-w12 h-s12" src={iVector} alt="edit icon" />
                                </div>
                            </div> : ""

                        : <span className='text-black body_text'>
                            {`${status}`}
                        </span>
                    }
                </div>

                <div className="text-cGray body_text capitalize mb-s8">
                    {t("Including")} MOMS: {`${price ? price?.toLocaleString("da-DK") : 'NA'}`})
                </div>
                <div>
                    <div className="text-black sub_title mb-s8">{t("Duration")}: {roughLicenseDurationFormatter(durationf)}</div>
                    <Clamp lines={2}>
                        <div
                            className={`max-h-[100px] overflow-y-auto body_text htmlText text-cGray}`}>
                            {htmlToPlainText(details)}
                        </div>
                    </Clamp>
                    <div
                        onClick={detailsModal}
                        className='text-cBrand important_text'>
                        {t("see more")}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LicenseCard;