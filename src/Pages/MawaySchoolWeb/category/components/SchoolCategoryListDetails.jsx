/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CommonEmptyStatus from '../../../../Components/CommonEmptyStatus/CommonEmptyStatus';
import GreenSwitch from '../../../../Components/Switch/GreenSwitch';
import useSchoolCategoryStore, { getSchoolCategoryDetails, schoolCategoryLessonUpdateIndex, schoolCategoryToggleIndex } from '../../../../App/Stores/school/schoolCategoryStore';
import Image from '../../../../Components/Image/Image';
import { iBlueAddItem, iCategory, iEdiItIcon, iWhiteAddItem } from '../../../../App/Utility/source';
import SchoolCategoryListLessonTableRow from '../table/SchoolCategoryListLessonTableRow';
import CommonTable from '../../../../Components/Table/CommonTable';
import CommonButtonOutlined from '../../../../Components/Button/CommonButtonOutlined';
import CommonButton from '../../../../Components/Button/CommonButton';
import SchoolDraggableList from '../table/SchoolDraggableList';
import CommonTitle from '../../../../Components/Title/CommonTitle'
import BackLink from '../../../../Components/Pagination/BackLink';
import { useTranslation } from 'react-i18next';

function SchoolCategoryListDetails() {

    const { setShowEditSchoolCategoryDetailsModal, lessonsAddFromData, setLessonsAddFromData, setShowAddCategoryListLessonModal, schoolCategoryDetails, schoolCategoryLessonList, setShowSchoolCategoryListDeactivateModal } = useSchoolCategoryStore();

    const [enabled, setEnabled] = useState(false);

    const { t } = useTranslation();

    const [isDragMode, setIsDragMode] = useState(false);

    const { category_id } = useParams();

    const HandleDeactivate = async () => {
        if (enabled === true) {
            await setShowSchoolCategoryListDeactivateModal(true);
        } else {
            await schoolCategoryToggleIndex(category_id);
        }
    }

    const schoolCategoryHeaders = [
        { index: 1, name: t("#") },
        { index: 2, name: t("Name") },
        { index: 3, name: t("Duration") },
        { index: 4, name: t("Mandatory") },
        { index: 5, name: t("Price") },
    ];

    useEffect(() => {
        fetchSchoolCategoryDetails()
    }, [category_id])

    const fetchSchoolCategoryDetails = async () => {
        getSchoolCategoryDetails(category_id)
    }

    useEffect(() => {
        setEnabled(schoolCategoryDetails?.is_active)
    }, [schoolCategoryDetails])

    return (
        <div>
            <CommonTitle title={t("Category details")} >
                <BackLink linksArray={[
                    { label: t("Category"), linkTo: "/school/category-list" },
                    { label: t("Category details"), linkTo: "" },
                ]} />
            </CommonTitle>

            <div className="overflow-hidden bg-cBrandColor2 rounded-br8 py-s20">

                <div className='px-s20'>
                    <div className='flex justify-between'>
                        <div className='flex'>

                            <div className='rounded-full w-s90 h-s90 flex justify-center items-center bg-cBackgroundAndCategory'>
                                <Image className='h-s60 w-s60' src={schoolCategoryDetails?.icon} dummyImage={iCategory} isCategoryImage={true} />
                            </div>

                            <div className='ml-s16'>
                                <div className='section_title text-cBlack capitalize'>
                                    {schoolCategoryDetails?.category_name}
                                </div>
                                <div className='body_text text-cGray'>
                                    {t("Lesson")}: {
                                        schoolCategoryDetails?.lessons &&
                                            schoolCategoryDetails?.duration ?
                                            `${schoolCategoryDetails?.lessons},
                                            ${schoolCategoryDetails?.duration}` : 'NA'
                                    }
                                </div>

                                <div className='text-cBrand important_text'>
                                    {schoolCategoryDetails?.price === "null" ||
                                        schoolCategoryDetails?.price === null ?
                                        <CommonEmptyStatus size='text-fs16' textColor='text-cTextGray' fontWeight='font-fw400' leading="leading-5" /> :
                                        schoolCategoryDetails?.price === 0 ?
                                            `DKK ${schoolCategoryDetails?.total_lesson_price?.toLocaleString("da-DK")}` :
                                            `Dkk ${schoolCategoryDetails?.price?.toLocaleString("da-DK")}`}
                                </div>
                            </div>
                        </div>

                        <div className='flex mt-s40'>
                            <div className={`${enabled ? 'text-cPassed' : 'text-cFailed'} body_text text-center`}>
                                {enabled ? <span>{t("Active")}</span> : <span>{t("Deactivate")}</span>}
                            </div>
                            <div className='flex justify-center ml-s10'>
                                <GreenSwitch
                                    enabled={enabled}
                                    setEnabled={() => HandleDeactivate()}
                                />
                            </div>
                            <div
                                onClick={() => { setShowEditSchoolCategoryDetailsModal(true) }}
                                className='cursor-pointer ml-s20'>
                                <img
                                    className='cursor-pointer w-s25 h-s25 mr-s6'
                                    src={iEdiItIcon}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='px-s20'>
                    <div className='pt-s16'>
                        <span className='mr-s5 sub_title text-cBlack'>
                            {t("Description")}
                        </span>
                        <div className='mt-s4 body_text text-cGray'>
                            {schoolCategoryDetails?.description === "null" ||
                                schoolCategoryDetails?.description === null ?
                                "NA" : schoolCategoryDetails?.description}
                        </div>
                    </div>

                    <div className='pt-s16'>
                        <span className='sub_title mr-s5 text-cBlack'>{t("Requirement")}</span>
                        <div className='mt-s4 body_text text-cGray'>
                            {schoolCategoryDetails?.requirement === "null" ||
                                schoolCategoryDetails?.requirement === null ?
                                <CommonEmptyStatus
                                    size='text-fs14'
                                    textColor='text-cBlack'
                                    fontWeight='font-fw400'
                                    leading="leading-5"
                                /> :
                                schoolCategoryDetails?.requirement}
                        </div>
                    </div>

                </div>

                {!isDragMode ?
                    <CommonTable
                        topLeftComponent={
                            <>
                                {!isDragMode && schoolCategoryLessonList?.length > 0 ?
                                    <CommonButton
                                        roundedFull={false}
                                        onClick={() => setIsDragMode(true)}
                                        width='w-[200px]'
                                        btnLabel={t('Change lesson orders')}
                                    /> : ""}
                            </>
                        }
                        headers={schoolCategoryHeaders}
                        // tableTitle="Lessons"
                        shoSearchBox={false}
                        pagination={false}
                        showPageCountText={true}
                        showPagination={false}
                        titleComponent={
                            <div className='mb-s20'>
                                <CommonButtonOutlined
                                    isFullRounded={false}
                                    iconLeft={iWhiteAddItem}
                                    iconLeftHover={iBlueAddItem}
                                    colorType='primary'
                                    btnLabel={t("Add lesson")}
                                    onClick={() => {
                                        setLessonsAddFromData({ ...lessonsAddFromData, school_category_id: schoolCategoryDetails?.category_id })
                                        setShowAddCategoryListLessonModal(true);
                                    }}
                                />
                            </div>
                        }

                        items={
                            <>
                                {schoolCategoryLessonList?.length > 0 ?
                                    schoolCategoryLessonList?.map((item, index) => (
                                        <SchoolCategoryListLessonTableRow data={item} key={index} index={index + 1} />
                                    )) :
                                    <tr className='w-full'>
                                        <th colSpan={5} className="py-s10">
                                            {t("No Data Found !")}
                                        </th>
                                    </tr>
                                }
                            </>
                        }
                    /> : <div className="px-5">
                        <div className="pb-5 font-semibold text-fs20 mt-s20">{t('Change lesson orders')}</div>
                        <SchoolDraggableList onSubmit={(res) => {
                            let updateSuccess = schoolCategoryLessonUpdateIndex(res, category_id);
                            if (updateSuccess) setIsDragMode(false);
                        }} />

                    </div>}
            </div>
        </div>
    )
}

export default SchoolCategoryListDetails