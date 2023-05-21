import React from 'react';
import CommonModal from '../../../../Components/Modal/CommonModal';
import CommonInput from '../../../../Components/Input/CommonInput';
import CommonButton from '../../../../Components/Button/CommonButton';
import useSchoolInstructorStore, { schoolInstructorAcceptIndex } from '../../../../App/Stores/school/schoolInstructorStore';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AcceptNoteModal = () => {

    const { showAcceptNoteModal, setShowAcceptNoteModal } = useSchoolInstructorStore();

    const { school_instructor_id } = useParams();

    const navigateTo = useNavigate();

    const { t } = useTranslation();

    const submit = async (e) => {
        e.preventDefault();
        const success = await schoolInstructorAcceptIndex(school_instructor_id);
        if (success) {
            setShowAcceptNoteModal(false);
            navigateTo('/school-instructor');
        }
    }

    return (
        <div>
            <CommonModal
                showModal={showAcceptNoteModal}
                setShowModal={setShowAcceptNoteModal}
                modalTitle={t("Write accept note")}
                mainContent={
                    <>
                        <form onSubmit={submit}>
                            <div className='my-s20'>
                                <CommonInput
                                    withStar={false}
                                    textarea={true}
                                    label={t('Write comment')}
                                    required={true}
                                    placeholder={t('Write comment')} />
                            </div>

                            <div className='flex justify-center items-center'>
                                <CommonButton type='submit' roundedFull={false} btnLabel={t('Accept')} />
                            </div>
                        </form>
                    </>
                }
            />
        </div>
    );
};

export default AcceptNoteModal;