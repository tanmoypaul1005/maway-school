/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import useSchoolCategoryStore, { addSchoolCategoryLesson, getSchoolCategoryDetails } from '../../../../App/Stores/school/schoolCategoryStore';
import CommonModal from '../../../../Components/Modal/CommonModal';
import CommonInput from '../../../../Components/Input/CommonInput';
import CommonButton from '../../../../Components/Button/CommonButton';
import SelectInput from '../../../../Components/Input/SelectInput';
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import moment from 'moment/moment';
import CommonTimePicker from '../../../../Components/CommonTimePicker';
import { useParams } from 'react-router-dom';
import { Toastr } from '../../../../App/Utility/UtilityFunctions';
import { useTranslation } from 'react-i18next';

const AddCategoryListLessonModal = () => {

    const { setLessonsAddFromData, showAddCategoryListLessonModal, setShowAddCategoryListLessonModal, lessonsAddFromData } = useSchoolCategoryStore();

    const { category_id } = useParams();

    const { t } = useTranslation();

    const lessonType = [
        {
            title: t("Driving"),
            value: "driving",
            selected: false
        }, {
            title: t("External"),
            value: "external",
            selected: false,
        }, {
            title: t("Classroom"),
            value: "classroom",
            selected: false,
        }]

    const submitSchoolCategory = async (e) => {
        e.preventDefault();
        setLessonsAddFromData({ ...lessonsAddFromData, school_category_id: category_id })
        if (lessonsAddFromData.school_category_id === "" &&
            lessonsAddFromData.name === "" && lessonsAddFromData.type === "" &&
            lessonsAddFromData.price === ""
        ) {
            Toastr({ message: t("Item is required"), type: "warning" });
        }
        else {
            if (lessonsAddFromData.duration === "00:00") {
                Toastr({ message: t("Duration is required"), type: "warning" });
            } else {
                const value = await addSchoolCategoryLesson();
                await getSchoolCategoryDetails(category_id);
                if (value) {
                    setLessonsAddFromData({
                        school_category_id: lessonsAddFromData?.school_category_id,
                        school_id: "",
                        name: "",
                        type: "",
                        duration: "00:00",
                        is_mandatory: false,
                        price: "",
                        description: "",
                        requirement: "",
                        is_moms: ""
                    })
                    setShowAddCategoryListLessonModal(false)
                }
            }
        }
    }

    return (
        <div>
            <CommonModal
                showModal={showAddCategoryListLessonModal}
                setShowModal={setShowAddCategoryListLessonModal}
                modalTitle={t("Add lesson")}
                mainContent={
                    <>
                        <form onSubmit={submitSchoolCategory}>
                            <div className='space-y-4 mt-s20'>
                                <SelectInput
                                    dataArray={lessonType}
                                    value={lessonsAddFromData?.type}
                                    label={t("Choose lesson type")}
                                    placeholder={t("Choose lesson type")}
                                    required={true}
                                    selectOptionOnChange={(e) => setLessonsAddFromData({ ...lessonsAddFromData, type: e })}
                                />

                                <CommonInput
                                    max_input={55}
                                    value={lessonsAddFromData?.name}
                                    label={t("Lesson name")}
                                    placeholder={t("Lesson name")}
                                    required={true}
                                    onChange={(e) => {
                                        setLessonsAddFromData({ ...lessonsAddFromData, name: e.target.value })
                                    }}
                                />

                                <CommonTimePicker
                                    required={true}
                                    label={t("Duration")}
                                    format='HH:mm'
                                    showNow={false}
                                    size='large'
                                    value={lessonsAddFromData?.duration}
                                    onChange={(value) => {
                                        const timeString = moment(value).format("HH:mm");
                                        setLessonsAddFromData({ ...lessonsAddFromData, duration: timeString })
                                    }}
                                />
                                <CommonInput
                                    max_input={5}
                                    min_input={0}
                                    label={t('Amount (Without MOMS)')}
                                    placeholder={t("Price")}
                                    type='number'
                                    value={lessonsAddFromData?.price}
                                    onChange={(e) => {
                                        setLessonsAddFromData({ ...lessonsAddFromData, price: e.target.value })
                                    }}
                                    required={true}
                                />
                                <CommonInput
                                    max_input={55}
                                    label={t('Description')}
                                    placeholder={t('Description')}
                                    textarea={true}
                                    value={lessonsAddFromData?.description}
                                    onChange={(e) => {
                                        setLessonsAddFromData({ ...lessonsAddFromData, description: e.target.value })
                                    }}
                                />
                                <CommonInput
                                    max_input={55}
                                    label={t('Requirement')}
                                    textarea={true}
                                    placeholder={t('Requirement')}
                                    value={lessonsAddFromData?.requirements}
                                    onChange={(e) => {
                                        setLessonsAddFromData({ ...lessonsAddFromData, requirements: e.target.value })
                                    }}
                                />

                                <FormControl className="w-full">
                                    <h1 className="w-full text-cHighlighted important_text">
                                        {t("Is lesson mandatory for package?")} <span className="text-cWarning">*</span>
                                    </h1>
                                    <RadioGroup
                                        className="w-full"
                                        required={true}
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <div className="flex w-full">
                                            <div className=" flex justify-center">
                                                <FormControlLabel
                                                    value="yes"
                                                    control={<Radio required={true} />}
                                                    label={t("Yes")}
                                                    onChange={(e) => {
                                                        setLessonsAddFromData({ ...lessonsAddFromData, is_mandatory: true })
                                                    }}
                                                />
                                            </div>

                                            <div className="flex justify-center">
                                                <FormControlLabel
                                                    value="false"
                                                    control={<Radio required={true} />}
                                                    label={t("No")}
                                                    onChange={(e) => {
                                                        setLessonsAddFromData({ ...lessonsAddFromData, is_mandatory: false })
                                                    }}
                                                />
                                            </div>

                                        </div>
                                    </RadioGroup>
                                </FormControl>

                                <FormControl className="w-ful">
                                    <h1 className="w-full text-cHighlighted important_text">
                                        {t("Is moms calculate?")} <span className="text-cWarning">*</span>
                                    </h1>
                                    <RadioGroup
                                        className="w-full"
                                        required={true}
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <div className="flex w-full">
                                            <div className=" flex justify-center">
                                                <FormControlLabel
                                                    value="yes"
                                                    control={<Radio required={true} />}
                                                    label={t("Yes")}
                                                    onChange={(e) => {
                                                        setLessonsAddFromData({ ...lessonsAddFromData, is_moms: true })
                                                    }}
                                                />
                                            </div>

                                            <div className="flex justify-center">
                                                <FormControlLabel
                                                    value="false"
                                                    control={<Radio required={true} />}
                                                    label={t("No")}
                                                    onChange={(e) => {
                                                        setLessonsAddFromData({ ...lessonsAddFromData, is_moms: false })
                                                    }}
                                                />
                                            </div>

                                        </div>
                                    </RadioGroup>
                                </FormControl>

                                <div className='flex justify-center'>
                                    <CommonButton
                                        width="w-[120px]"
                                        roundedFull={false}
                                        btnLabel={t('Add')}
                                        type='submit'
                                    />
                                </div>
                            </div>
                        </form>
                    </>
                }
            />
        </div>
    );
};

export default AddCategoryListLessonModal;