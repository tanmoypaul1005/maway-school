import React, { memo } from 'react';
import CommonModal from '../../../../Components/Modal/CommonModal';
import useSchoolCategoryStore, { deleteSchoolCategoryLesson, getSchoolCategoryDetails } from '../../../../App/Stores/school/schoolCategoryStore';
import CommonButton from '../../../../Components/Button/CommonButton';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DeleteCategoryListLessonModal = memo(() => {

    const { category_id } = useParams();

    const { t } = useTranslation();

    const { setShowEditCategoryListLessonModal, setSchoolCategoryLessonDeleteId, showDeleteCategoryListLessonModal, setShowDeleteCategoryListLessonModal } = useSchoolCategoryStore();

    return (
        <div>
            <CommonModal
                showModal={showDeleteCategoryListLessonModal}
                setShowModal={setShowDeleteCategoryListLessonModal}
                modalTitle="Conformation"
                mainContent={
                    <>
                        <div className='my-s16 flex justify-center items-center body_text'>{t('Are you sure you want to delete this lesson ?')}</div>
                        <div className='flex justify-center items-center'>
                            <CommonButton
                                width="w-[120px]"
                                roundedFull={false}
                                btnLabel={t('Delete')}
                                colorType='warning'
                                onClick={async () => {
                                    const success = deleteSchoolCategoryLesson();
                                    if (success) {
                                        await getSchoolCategoryDetails(category_id);
                                        await setSchoolCategoryLessonDeleteId("")
                                        setShowDeleteCategoryListLessonModal(false);
                                        setTimeout(() => {
                                            setShowEditCategoryListLessonModal(false)
                                        }, 300);
                                    }
                                }} />
                        </div>
                    </>
                }
            />
        </div>
    );
});

export default DeleteCategoryListLessonModal;