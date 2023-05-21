/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import CommonModal from '../../../../Components/Modal/CommonModal'
import useProfileStore, { getSchoolDeleteMessage, schoolDeleteIndex } from '../../../../App/Stores/school/profileStore'
import CommonButton from '../../../../Components/Button/CommonButton';
import { useEffect } from 'react';
import { htmlToPlainText } from '../../../../Utility/UtilityFunctions';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosHeader from '../../../../App/Utility/AxiosHeader';
import { k_role } from '../../../../App/Utility/const';
import useGeneralStore from '../../../../App/Stores/GeneralStore';
    
function DeleteAccountModal() {

    const { setShowEditProfileModal, showDeleteAccountModal, setShowDeleteAccountModal, deleteMessageText } = useProfileStore();
    const { role } = useGeneralStore();
    useEffect(() => {
        if(role === k_role?.school && showDeleteAccountModal===true){
        getSchoolDeleteMessage();
        }
    }, [])

    const [agree, setAgree] = useState(false)
    const navigate = useNavigate()
    return (
        <div>
            <CommonModal
                showModal={showDeleteAccountModal}
                setShowModal={setShowDeleteAccountModal}
                modalSpace={true}
                modalTitle="Delete Account"
                mainContent={
                    <>
                        <div className='body_text text-cMainBlack mt-s20'>
                            {deleteMessageText ?
                                htmlToPlainText(deleteMessageText?.content)
                                : 'NA'
                            }
                        </div>

                        <div className="flex flex-row py-4 items-center">
                            <input
                                id="checkDelete"
                                className="mr-2 accent-red-500"
                                type="checkbox"
                                name=""
                                value={agree}
                                onChange={(e) => {
                                    setAgree(e.target.checked)
                                }}
                            />
                            <label
                                htmlFor="checkDelete"
                                className="body_text text-cMainBlack select-none cursor-pointer"
                            >
                                I agree to delete this account with knowing my losses of deleting this account.
                            </label>
                        </div>

                        <div className='flex justify-center items-center'>
                            <CommonButton
                                isDisabled={!agree}
                                roundedFull={false}
                                colorType={'danger'}
                                btnLabel="Delete Account"
                                onClick={async() => {
                                    if (agree) {
                                        const success = await schoolDeleteIndex();
                                        if (success) {
                                            setShowDeleteAccountModal(false)
                                            setTimeout(() => {
                                                setShowEditProfileModal(false)
                                            }, 300);
                                            navigate('/login');
                                            localStorage.setItem("user", "");
                                            localStorage.setItem("maway_token", "");
                                            AxiosHeader(null);
                                        }
                                    }
                                }}
                            />
                        </div>

                    </>
                }
            />
        </div>
    )
}

export default DeleteAccountModal
