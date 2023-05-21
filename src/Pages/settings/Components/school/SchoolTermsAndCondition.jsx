import React, { useEffect } from "react";
import useSettingsStore, { getSchoolTermsConditionsIndex } from "../../../../App/Stores/SettingsStore";
import Settings from "../../Settings";
import Image from "../../../../Components/Image/Image";
import { useTranslation } from "react-i18next";

const SchoolTermsAndCondition = () => {

    const { schoolTermsConditionList } = useSettingsStore();
    const { t } = useTranslation();

    useEffect(() => {
        fetchTermsConditions()
    }, [])

    const fetchTermsConditions = async () => {
        await getSchoolTermsConditionsIndex()
    }

    return (
        <Settings>
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="section_title text-cBlack mb-s8">{t("Terms and conditions")}</h1>
                </div>
            </div>
            <div className="bg-white p-s20 md:p-5 shadow rounded-br8">
                <Image className="w-full h-[245px] object-cover" src={schoolTermsConditionList[0]?.image} />
                <div className="mt-s20 body_text text-cGray" dangerouslySetInnerHTML={{ __html: schoolTermsConditionList[0]?.content }} ></div>
            </div>
        </Settings>
    );
};

export default SchoolTermsAndCondition;
