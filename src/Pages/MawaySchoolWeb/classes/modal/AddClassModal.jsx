/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import CommonModal from '../../../../Components/Modal/CommonModal'
import useClassStore, { addSchoolClass, getSchoolClassAddInfo } from '../../../../App/Stores/school/classStore'
import CommonInput from '../../../../Components/Input/CommonInput'
import SelectInput from '../../../../Components/Input/SelectInput';
import CommonTimePicker from '../../../../Components/CommonTimePicker';
import CommonButton from '../../../../Components/Button/CommonButton';
import { useEffect } from 'react';
import moment from 'moment/moment';
import { HourToMin, MinToHour } from '../../../../Utility/UtilityFunctions';
import { Toastr } from '../../../../App/Utility/UtilityFunctions';
import useGeneralStore from '../../../../App/Stores/GeneralStore';
import { k_role } from '../../../../App/Utility/const';
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';

function AddClassModal() {

    const { showAddClassModal, setShowAddClassModal, schoolClassAddInfo, classAddForm, setClassAddForm } = useClassStore();

    const { t } = useTranslation();

    const { role } = useGeneralStore();
    const location = useLocation();

    useEffect(() => {
        if (role === k_role?.school && location.pathname === "/classes") {
            getSchoolClassAddInfo();
        }
    }, [])

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

    const lessons = schoolClassAddInfo?.category?.filter(item => item?.id == classAddForm?.school_category_id)

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

    const duration = lessonsObj?.lessons?.filter(item => item?.id == classAddForm?.lesson_id)

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (classAddForm.start_time === "00:00") {
            Toastr({ message: t("Time is required"), type: "warning" });
        }
        else if (moment(now).format('L') === moment(classAddForm?.date).format('L')
            && parseFloat(`${currentHour}.${currentMinute}`) > parseFloat(`${classAddForm?.start_time.replace(':', '.')}`)) {
            Toastr({ message: t("Invalid time"), type: "warning" });
        }
        else {
            const success = addSchoolClass();
            if (success) {
                setShowAddClassModal(false);
                setClassAddForm({
                    school_category_id: "",
                    lesson_id: "",
                    classroom_id: "",
                    date: "",
                    start_time: "00:00",
                    end_time: "00:00",
                    instructor_type: "2"
                })
            }
        }
    }

    return (
        <div>
            <CommonModal
                showModal={showAddClassModal}
                setShowModal={setShowAddClassModal}
                modalTitle={t("Add class")}
                mainContent={
                    <div div className='mt-s20'>
                        <form onSubmit={handleSubmit}>
                            <div className='space-y-4'>
                                <SelectInput
                                    withStar={false}
                                    required={true}
                                    label={t("Choose category")}
                                    placeholder={t("Choose category")}
                                    value={classAddForm?.school_category_id}
                                    selectOptionOnChange={(e) => {
                                        setClassAddForm({
                                            ...classAddForm,
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
                                    value={classAddForm?.lesson_id}
                                    disabled={classAddForm?.school_category_id === "" ? true : false}
                                    dataArray={lessonsArray}
                                    selectOptionOnChange={(e) => {
                                        setClassAddForm({
                                            ...classAddForm,
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
                                    value={classAddForm?.classroom_id}
                                    selectOptionOnChange={(e) => {
                                        setClassAddForm({
                                            ...classAddForm,
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
                                        value={classAddForm?.start_time}
                                        onChange={(value) => {
                                            const timeString = moment(value).format("HH:mm");
                                            setClassAddForm({
                                                ...classAddForm,
                                                start_time: timeString,
                                                end_time: MinToHour(HourToMin(timeString) + duration[0]?.duration),
                                                date: "",
                                                instructor_type: "2"
                                            });
                                        }}
                                    />
                                    <CommonInput
                                        withStar={false}
                                        label={t('End time')}
                                        disabled={true}
                                        required={true}
                                        value={classAddForm?.end_time}
                                    />
                                </div>

                                <CommonInput
                                    withStar={false}
                                    required={true}
                                    value={classAddForm?.date}
                                    onChange={(e) => {
                                        setClassAddForm({ ...classAddForm, date: e.target.value });
                                    }}
                                    type='date'
                                    label={t("Select date")}
                                    placeholder={t("Select date")}
                                />

                                <div className='flex justify-center items-center'>
                                    <CommonButton roundedFull={false} type="submit" btnLabel={t('Add')} />
                                </div>
                            </div>
                        </form>
                    </div>
                }
            />
        </div>
    )
}

export default AddClassModal
