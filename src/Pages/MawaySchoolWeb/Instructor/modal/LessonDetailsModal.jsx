import React from 'react'
import CommonModal from '../../../../Components/Modal/CommonModal'
import CommonButtonOutlined from '../../../../Components/Button/CommonButtonOutlined';
import useSchoolInstructorStore from '../../../../App/Stores/school/schoolInstructorStore';
import { useTranslation } from 'react-i18next';

function LessonDetailsModal() {

    const { showLessonDetailsModal, setShowLessonDetailsModal, schoolInstructorsLessonDetails, setShowCancelNoteModal } = useSchoolInstructorStore();

    const { t } = useTranslation();

    return (
        <div>
            <CommonModal
                showModal={showLessonDetailsModal}
                setShowModal={setShowLessonDetailsModal}
                modalTitle={t("Lesson details")}
                mainContent={
                    <>
                        <div className='bg-cBackgroundAndCategory p-s20 space-y-1 rounded-br8 mt-s20'>
                            <CommonList name={t("Status")} value={schoolInstructorsLessonDetails?.status} />
                            <CommonList name={t("Category")} value={schoolInstructorsLessonDetails?.category_name} />
                            <CommonList name={t("Lesson type")} value={schoolInstructorsLessonDetails?.lesson_type} />
                            <CommonList name={t("Lesson name")} value={schoolInstructorsLessonDetails?.lesson_name} />
                            {schoolInstructorsLessonDetails?.lesson_type === 'driving' ||
                                schoolInstructorsLessonDetails?.lesson_type === 'external' ? "" :
                                <CommonList
                                    name={t("Classroom name")}
                                    value={schoolInstructorsLessonDetails?.classroom_name}
                                />
                            }
                            {
                                schoolInstructorsLessonDetails?.lesson_type !== 'driving' ||
                                    schoolInstructorsLessonDetails?.lesson_type !== 'external' ? "" :
                                    <CommonList
                                        name={t("Student")}
                                        value={schoolInstructorsLessonDetails?.students?.length}
                                    />
                            }
                        </div>

                        <div className='mt-s20'>
                            <div className='sub_title text-cBlack'>{t("Description")}</div>
                            <div className='font-fw400 text-fs14 text-[#7A7A7A] mt-s4'>
                                {
                                    schoolInstructorsLessonDetails?.lesson_description === 'null' ||
                                        schoolInstructorsLessonDetails?.lesson_description === null ? 'NA'
                                        : schoolInstructorsLessonDetails?.lesson_description}
                            </div>
                        </div>

                        <div className='my-s16'>
                            <div className='sub_title text-cBlack'>{t("Requirement")}</div>
                            <div className='font-fw400 text-fs14 text-[#7A7A7A] mt-s4'>
                                {
                                    schoolInstructorsLessonDetails?.lesson_requirements === 'null' ||
                                        schoolInstructorsLessonDetails?.lesson_requirements === null ? 'NA'
                                        : schoolInstructorsLessonDetails?.lesson_requirements
                                }
                            </div>
                        </div>

                        {
                            schoolInstructorsLessonDetails?.lesson_type === 'driving' ||
                                schoolInstructorsLessonDetails?.lesson_type === 'external' ?
                                <div className='mb-s12'>
                                    <div className='sub_title text-cBlack'>{t("Student profile")}</div>
                                    <div className='body_text text-cGray'>
                                        {schoolInstructorsLessonDetails?.student_name === 'null' ||
                                            schoolInstructorsLessonDetails?.student_name === null ? 'NA' :
                                            schoolInstructorsLessonDetails?.student_name
                                        }
                                    </div>
                                </div>
                                : ''
                        }



                        {
                            schoolInstructorsLessonDetails?.status === "completed" ||
                                schoolInstructorsLessonDetails?.status === "upcoming" ||
                                schoolInstructorsLessonDetails?.status === "rejected" ||
                                schoolInstructorsLessonDetails?.status === "started" ?
                                <div>

                                   {schoolInstructorsLessonDetails?.students?.length>0 && <div className='sub_title text-cBlack mb-s8'>
                                        {t("Student list")} ({schoolInstructorsLessonDetails?.students?.length})
                                    </div>}

                                    <div className='space-y-4'>{schoolInstructorsLessonDetails?.students?.length > 0 ?
                                        schoolInstructorsLessonDetails?.students?.map((item, index) => (
                                            <div key={index} className='p-s8 ring-1 ring-cChipBorder rounded-br10'>
                                                <div className='flex'>
                                                    <div className='sub_title text-cBlack capitalize'>
                                                        {item?.student_name}
                                                    </div>
                                                    <div className='ml-s4 small_body_text text-cGray capitalize'>
                                                        {item?.status}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                        : <div className='sub_title text-cBlack ml-s15'>{t("No student available")}</div>
                                    }</div>
                                </div> : ''}

                        {schoolInstructorsLessonDetails?.lesson_type === "classroom" &&
                            schoolInstructorsLessonDetails?.status === "completed" ? "" :
                            <>
                                {
                                    schoolInstructorsLessonDetails?.status !== "cancelled" &&
                                    <div className='flex my-s12'>
                                        <div className='important_text text-cBlack'> {t("Instructor comment")}:</div>
                                        <div className='body_text text-cGray pl-s2'>
                                            {
                                                schoolInstructorsLessonDetails?.accept_note === 'null' ||
                                                    schoolInstructorsLessonDetails?.accept_note === null ? 'NA' :
                                                    schoolInstructorsLessonDetails?.accept_note
                                            }
                                        </div>
                                    </div>
                                }

                                <div className='flex mb-s12'>
                                    <div className='important_text text-cBlack'>{t("Student comment")}: </div>
                                    <div className='body_text text-cGray pl-s2'>
                                        {
                                            schoolInstructorsLessonDetails?.student_note ? schoolInstructorsLessonDetails?.student_note === 'null' ||
                                                schoolInstructorsLessonDetails?.student_note === null ? 'NA' :
                                                schoolInstructorsLessonDetails?.student_note : 'NA'
                                        }
                                    </div>
                                </div>
                            </>}

                        {schoolInstructorsLessonDetails?.status === "cancelled" &&
                            <div className='flex'><div className='important_text text-cBlack'>{t("Cancellation reason")}:</div>
                                <div className='body_text text-cGray pl-s2'>
                                    {schoolInstructorsLessonDetails?.cancel_note ?
                                        schoolInstructorsLessonDetails?.cancel_note : 'NA'}
                                </div>
                            </div>}


                        {schoolInstructorsLessonDetails?.status === "rejected" &&
                            <div className='flex'>
                                <div className='important_text text-cBlack'>Rejected reason:</div>
                                <div className='body_text text-cGray pl-s2'>
                                    {schoolInstructorsLessonDetails?.rejected_note ?
                                        schoolInstructorsLessonDetails?.rejected_note : 'NA'}
                                </div>
                            </div>}

                        {schoolInstructorsLessonDetails?.status === "upcoming" &&
                            <div className='mt-s20 flex justify-center'>
                                <CommonButtonOutlined
                                    onClick={() => { setShowCancelNoteModal(true) }}
                                    colorType='danger'
                                    btnLabel={t('Cancel')}
                                />
                            </div>
                        }
                    </>
                }
            />
        </div>
    )
}

export default LessonDetailsModal

const CommonList = ({ value, name }) => {

    return (
        <div className='flex justify-between'>
            <div className='body_text text-cGray capitalize'>{name ? name : 'NA'}</div>
            <div className='body_text text-cGray capitalize'>{value ? value : 'NA'}</div>
        </div>
    )
}