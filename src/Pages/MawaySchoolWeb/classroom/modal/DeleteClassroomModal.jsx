import React from 'react';
import CommonModal from '../../../../Components/Modal/CommonModal';
import useClassroomStore, { deleteSchoolClassroom } from '../../../../App/Stores/school/classroomStore';
import CommonButton from '../../../../Components/Button/CommonButton';

const DeleteClassroomModal = () => {

    const { setShowEditClassroomModal, showDeleteClassroomModal, setShowDeleteClassroomModal, setClassroomDeleteId } = useClassroomStore();

    return (
        <div>
            <CommonModal
                showModal={showDeleteClassroomModal}
                setShowModal={setShowDeleteClassroomModal}
                modalTitle="Conformation"
                mainContent={
                    <>
                        <div className='mt-s16 flex justify-center items-center body_text text-cGray'>Are you sure you want to delete this classroom ?</div>
                        <div className='flex justify-center items-center'>
                            <CommonButton btnLabel='Delete' colorType='warning'
                                roundedFull={false}
                                onClick={() => {
                                    const success = deleteSchoolClassroom();
                                    if (success) {
                                        setClassroomDeleteId("")
                                        setShowDeleteClassroomModal(false);
                                        setTimeout(() => {
                                            setShowEditClassroomModal(false)
                                        }, 300);
                                    }
                                }} />
                        </div>
                    </>
                }
            />
        </div>
    );
};

export default DeleteClassroomModal;