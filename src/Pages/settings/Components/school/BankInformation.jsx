/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Settings from '../../Settings';
import CommonButton from '../../../../Components/Button/CommonButton';
import { iAddItem, iBlueInfo } from '../../../../App/Utility/source';
import useSettingsStore, { getSchoolBankInfo } from '../../../../App/Stores/SettingsStore';
import { useEffect } from 'react';
import useProfileStore, { getSchoolDashboard } from '../../../../App/Stores/school/profileStore';
import { k_role } from '../../../../App/Utility/const';
import useGeneralStore from '../../../../App/Stores/GeneralStore';
import { useTranslation } from 'react-i18next';

function BankInformation() {

    const { setShowEditBankInfoModal, setShowAddBankInfoModal, bankInfo } = useSettingsStore();
    const { schoolDashboardDetails } = useProfileStore();

    useEffect(() => {
        fetchData();
    }, [])
    const { role } = useGeneralStore();
    const { t } = useTranslation();


    const fetchData = async () => {
        if(role === k_role?.school){
        await getSchoolBankInfo();
        getSchoolDashboard();
        }
    }

    return (
        <Settings>
            <div className="flex justify-between">
                <div>
                    <h1 className="section_title text-cBlack mb-s8">{t("Bank information")}</h1>
                </div>
            </div>


            {bankInfo?.user_bank?.id ?
                <div className='bg-white p-s20 md:p-5 shadow rounded-br8'>
                    <div className='relative rounded-br8 bg-[#EDF1F8] small_body_text text-cGray p-s20'>
                        <div>{t("School cvr number")}: {schoolDashboardDetails?.school?.cvr ? schoolDashboardDetails?.school?.cvr : 'NA'}</div>
                        <div>{t("Account holder name")}: {bankInfo?.user_bank?.account_name ? bankInfo?.user_bank?.account_name : 'NA'}</div>
                        <div>{t("Bank name")}: {bankInfo?.user_bank?.bank_name ? bankInfo?.user_bank?.bank_name : 'NA'}</div>
                        <div>{t("Registration no")}: {bankInfo?.user_bank?.reg_no ? bankInfo?.user_bank?.reg_no : 'NA'}</div>
                        <div>{t("Account no")}: {bankInfo?.user_bank?.account_number ? bankInfo?.user_bank?.account_number : 'NA'}</div>
                        <div className='absolute top-3 right-3'>
                            <img onClick={() => { setShowEditBankInfoModal(true) }} src={iBlueInfo} alt="" className='cursor-pointer' />
                        </div>
                    </div>
                </div>
                : <div className="bg-white p-s20 md:p-5 shadow rounded-xl h-s180 flex justify-center items-center">
                    <div className=''>
                        <div className='mb-s10 text-center text-[#787878] text-fs18 font-fw400'>{t("No bank added yet")}</div>
                        <CommonButton
                            colorType="primary"
                            btnLabel={t("Add Bank")}
                            roundedFull={false}
                            width="w-[155px]"
                            onClick={() => { setShowAddBankInfoModal(true) }}
                            icon={<div className="mr-s5"><img className="w-s20 h-s15" src={iAddItem} alt="" /></div>}
                        />
                    </div>
                </div>}

            <div className='mt-s20'>
                <div>
                    <div className="section_title text-cBlack mb-s8">{t("Payment guideline")}</div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: bankInfo?.bank_policy ? bankInfo?.bank_policy : 'NA' }}
                    className="bg-white p-s20 md:p-5 shadow rounded-br8 body_text text-cGray">
                </div>
            </div>
        </Settings>
    )
}

export default BankInformation
