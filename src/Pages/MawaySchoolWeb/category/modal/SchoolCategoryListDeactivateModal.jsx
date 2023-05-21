import React from 'react';
import useSchoolCategoryStore, { schoolCategoryToggleIndex } from '../../../../App/Stores/school/schoolCategoryStore';
import CommonModal from '../../../../Components/Modal/CommonModal';
import CommonButton from '../../../../Components/Button/CommonButton';
import { useParams } from 'react-router-dom';

const SchoolCategoryListDeactivateModal = () => {

    const {setShowSchoolCategoryListDeactivateModal,showSchoolCategoryListDeactivateModal}=useSchoolCategoryStore();

    const { category_id } = useParams();

    const toggleStatus=async ()=>{
        let value=await schoolCategoryToggleIndex(category_id);
        if(value) return setShowSchoolCategoryListDeactivateModal(false)
    }

    return (
        <div>
            <CommonModal
            showModal={showSchoolCategoryListDeactivateModal}
            setShowModal={setShowSchoolCategoryListDeactivateModal}
            modalTitle="Conformation"
            mainContent={
               <>
                 <div className='flex justify-center body_text text-cHighlighted my-s20'>
                    Are you sure you want to deactivate this category?
                </div>
               <div className='flex justify-center'>
               <CommonButton width='w-[120px]' roundedFull={false} onClick={()=>{toggleStatus()}} btnLabel="Deactivate" colorType="warning" />
               </div>
               </>
            }
            />
        </div>
    );
};

export default SchoolCategoryListDeactivateModal;