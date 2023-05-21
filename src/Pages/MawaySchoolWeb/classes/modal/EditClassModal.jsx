/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import CommonModal from '../../../../Components/Modal/CommonModal'
import useClassStore, { editSchoolClass, getSchoolClassAddInfo } from '../../../../App/Stores/school/classStore'
import CommonInput from '../../../../Components/Input/CommonInput'
import SelectInput from '../../../../Components/Input/SelectInput';
import CommonTimePicker from '../../../../Components/CommonTimePicker';
import CommonButton from '../../../../Components/Button/CommonButton';
import { useEffect } from 'react';
import moment from 'moment/moment';
import { HourToMin, MinToHour } from '../../../../Utility/UtilityFunctions';
import CommonButtonOutlined from '../../../../Components/Button/CommonButtonOutlined';
import { k_role } from '../../../../App/Utility/const';
import useGeneralStore from '../../../../App/Stores/GeneralStore';
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';

function EditClassModal() {

    const { setShowDeleteClassModal, setSchoolDeleteId, schoolDetails, showEditClassModal, setShowEditClassModal, schoolClassAddInfo, classEditForm, setClassEditForm } = useClassStore();

    const { t } = useTranslation();

    const category = schoolClassAddInfo?.category?.map((item, index) => (
        {
            title: item?.name,
            value: item?.id,
            selected: false
        }
    ))

    const classroom = schoolClassAddInfo?.classrooms?.map((item, index) => (
        {
            title: item?.name,
            value: item?.id,
            selected: false
        }
    ))

    const lessons = schoolClassAddInfo?.category?.filter(item => item?.id == classEditForm?.school_category_id)

    let lessonsObj = {};
    for (let i = 0; i < lessons?.length; i++) {
        Object.assign(lessonsObj, lessons[i]);
    }
    const lessonsArray = lessonsObj?.lessons?.map((item, index) => (
        {
            title: item?.name,
            value: item?.id,
            selected: false
        }
    ))

    const duration = lessonsObj?.lessons?.filter(item => item?.id == classEditForm?.lesson_id)

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = editSchoolClass();
        if (success) {
            setShowEditClassModal(false);
        }
    }

    const { role } = useGeneralStore();
    const location = useLocation();

    useEffect(() => {
        if (role === k_role?.school && location.pathname === "/classes") {
            getSchoolClassAddInfo();
        }
    }, [])

    useEffect(() => {
        setClassEditForm({
            id: schoolDetails?.id,
            school_category_id: schoolDetails?.school_category_id,
            lesson_id: schoolDetails?.lesson_id,
            classroom_id: schoolDetails?.classroom_id,
            date: schoolDetails?.date_raw,
            start_time: schoolDetails?.start_time,
            end_time: schoolDetails?.end_time,
            instructor_type: "2"
        })
    }, [schoolDetails])

    return (
        <div>
            <CommonModal
                showModal={showEditClassModal}
                setShowModal={setShowEditClassModal}
                modalTitle={t("Edit Class Details")}
                mainContent={
                    <div className="mt-s20">
                        <form onSubmit={handleSubmit}>
                            <div className='space-y-4'>
                                <SelectInput
                                    withStar={false}
                                    required={true}
                                    label={t("Choose category")}
                                    placeholder={t("Choose category")}
                                    value={classEditForm?.school_category_id}
                                    selectOptionOnChange={(e) => {

                                        setClassEditForm({
                                            ...classEditForm,
                                            school_category_id: e,
                                            lesson_id: "",
                                            classroom_id: "",
                                            date: "",
                                            start_time: "00:00",
                                            end_time: "00:00",
                                            instructor_type: "2"
                                        })
                                    }}
                                    dataArray={category}
                                />

                                <SelectInput
                                    withStar={false}
                                    required={true}
                                    value={classEditForm?.lesson_id}
                                    disabled={classEditForm?.school_category_id === "" ? true : false}
                                    dataArray={lessonsArray}
                                    selectOptionOnChange={(e) => {
                                        setClassEditForm({
                                            ...classEditForm,
                                            lesson_id: e,
                                            classroom_id: "",
                                            date: "",
                                            start_time: "00:00",
                                            end_time: "00:00",
                                            instructor_type: "2"
                                        })
                                    }}
                                    label={t("Choose lesson")}
                                    placeholder={t("Choose lesson")}
                                />

                                <SelectInput
                                    withStar={false}
                                    required={true}
                                    dataArray={classroom}
                                    value={classEditForm?.classroom_id}
                                    selectOptionOnChange={(e) => {
                                        setClassEditForm({
                                            ...classEditForm,
                                            classroom_id: e,
                                            date: "",
                                            start_time: "00:00",
                                            end_time: "00:00",
                                            instructor_type: "2"
                                        })
                                    }}
                                    label={t("Choose classroom")}
                                    placeholder={t("Choose classroom")}
                                />

                                <div className='grid gap-x-5  grid-cols-2'>
                                    <CommonTimePicker
                                        withStar={false}
                                        required={true}
                                        label={t("Start time")}
                                        format='HH:mm'
                                        showNow={false}
                                        size='large'
                                        value={classEditForm?.start_time}
                                        onChange={(value) => {
                                            const timeString = moment(value).format("HH:mm");
                                            setClassEditForm({
                                                ...classEditForm,
                                                start_time: timeString,
                                                end_time: MinToHour(HourToMin(timeString) + duration[0]?.duration),
                                                date: "",
                                                instructor_type: "2"
                                            });
                                        }}
                                    />
                                    <CommonInput
                                        label={t('End time')}
                                        disabled={true}
                                        required={true}
                                        value={classEditForm?.end_time}
                                    />
                                </div>

                                <CommonInput
                                    withStar={false}
                                    required={true}
                                    value={classEditForm?.date}
                                    allowPastDates={true}
                                    onChange={(e) => {
                                        setClassEditForm({ ...classEditForm, date: e.target.value });
                                    }}
                                    type='date'
                                    label={t("Select date")}
                                    placeholder={t("Select date")}
                                />
                                {schoolDetails?.status !== "completed" && <div className='mb-s20'></div>}
                                {schoolDetails?.status !== "completed" && <div className='flex justify-between items-center'>
                                    <CommonButtonOutlined
                                        isFullRounded={false}
                                        onClick={() => {
                                            setSchoolDeleteId(schoolDetails?.id);
                                            setShowDeleteClassModal(true);
                                        }}
                                        colorType='danger'
                                        type="submit"
                                        btnLabel={t('Delete')}
                                    />
                                    <CommonButton roundedFull={false} type="submit" btnLabel={t('Update')} />
                                </div>}
                            </div>
                        </form>
                    </div>
                }
            />
        </div>
    )
}

export default EditClassModal
