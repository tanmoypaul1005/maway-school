import React from 'react';
import useClassroomStore, { addSchoolClassroom } from '../../../../App/Stores/school/classroomStore';
import CommonModal from '../../../../Components/Modal/CommonModal';
import CommonInput from '../../../../Components/Input/CommonInput';
import CommonButton from '../../../../Components/Button/CommonButton';
import { useTranslation } from 'react-i18next';

const AddClassroomModal = () => {

    const { showAddClassroomModal, setShowAddClassroomModal, classroomForm, setClassroomForm } = useClassroomStore();

    const { t } = useTranslation();

    const SubmitClassRoomData = (e) => {
        e.preventDefault();
        const success = addSchoolClassroom();
        if (success) {
            setShowAddClassroomModal(false)
            setClassroomForm({
                name: "",
                address: "",
                city: "",
                zip: "",
                capacity: ""
            })
        }
    }

    return (
        <div>
            <CommonModal
                showModal={showAddClassroomModal}
                setShowModal={setShowAddClassroomModal}
                modalTitle={t("Add classroom")}
                mainContent={
                    <>
                        <form onSubmit={SubmitClassRoomData}>
                            <div className='space-y-4 mt-s20'>
                                <div className='grid gap-x-5 grid-cols-2'>
                                    <CommonInput
                                        withStar={false}
                                        max_input={55}
                                        type='text'
                                        required={true}
                                        onChange={(e) => { setClassroomForm({ ...classroomForm, name: e.target.value }) }}
                                        value={classroomForm?.name} 
                                        label={t('Write classroom name')}
                                        placeholder={t('Write classroom name')}
                                    />
                                    <CommonInput
                                        withStar={false}
                                        max_input={3}
                                        min_input={0}
                                        max_number={'999'}
                                        type='number' required={true}
                                        onChange={(e) => { setClassroomForm({ ...classroomForm, capacity: e.target.value }) }}
                                        value={classroomForm?.capacity}
                                        label={t('Write capacity')}
                                        placeholder={t('Write capacity')} />
                                </div>

                                <CommonInput
                                    withStar={false}
                                    max_input={50}
                                    type='text'
                                    required={true}
                                    onChange={(e) => { setClassroomForm({ ...classroomForm, address: e.target.value }) }}
                                    value={classroomForm?.address}
                                    label={t('Write address')}
                                    placeholder={t('Write address')}
                                />


                                <div className='grid gap-x-5 grid-cols-2'>
                                    <CommonInput
                                        withStar={false}
                                        max_input={15}
                                        type='text'
                                        required={true}
                                        onChange={(e) => { setClassroomForm({ ...classroomForm, city: e.target.value }) }}
                                        value={classroomForm?.city}
                                        label={t('Write city')}
                                        placeholder={t('Write city')}
                                    />

                                    <CommonInput
                                        withStar={false}
                                        max_input={6}
                                        // min_input={4}
                                        type='number'
                                        required={true}
                                        onChange={(e) => { setClassroomForm({ ...classroomForm, zip: e.target.value }) }}
                                        value={classroomForm?.zip}
                                        label={t('Write zip code')}
                                        placeholder={t('Write zip code')}
                                    />
                                </div>

                                <div className='flex justify-center items-center'>
                                    <CommonButton roundedFull={false} type='submit' onClick={() => { }} btnLabel={t("Add")} />
                                </div>
                            </div>
                        </form>
                    </>
                }
            />
        </div>
    );
};

export default AddClassroomModal;