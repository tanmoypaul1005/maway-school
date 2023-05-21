import React from 'react'
import CommonButton from '../Button/CommonButton'
import useCustomerStore from '../../App/Stores/CustomerStore';
import EditCustomer from '../../Pages/Customer/Popup/EditCustomer';
import DeleteCustomer from '../../Pages/Customer/Popup/DeleteCustomer';
import { MuiCustomSwitch } from '../../App/Stores/UtilityStore';
export default function CommonDetailsCard2({ DetailsImage, activeStatus, ratingStatus }) {
    const { setShowDeleteModal, setShowEditModal } = useCustomerStore();

    return (
        <>
            <div className='w-full bg-cWhite p-s70 rounded-br10 shadow-sm p-5 mb-s20 relative'>
                <div className="flex items-center">

                    <div className='w-1/3'>
                        {DetailsImage && (
                            <img className='rounded-full w-w160 mx-auto md:w-w200' src={DetailsImage} alt="details" />
                        )}
                        {activeStatus && (
                            <h1 className='text-center text-fs16 font-fw500 text-cTitleTextColor mt-s10 text-cSuccess'>{activeStatus === true ? 'Active' : 'Deactivate'}</h1>
                        )}
                        {ratingStatus && (
                            <div className='mt-5'>
                                <div className='text-center'>
                                    <div className='ml-10'>
                                        {ratingStatus}
                                    </div>
                                    <div className="text-cTextBody text-fs18">Total reviews</div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='w-full'>

                        <div className='flex justify-between'>
                            <div>
                                <div className="flex items-center space-x-1 mb-s20">
                                    <h2 className="">Name:</h2>
                                    <h2 className="">Subrata Halder</h2>
                                </div>
                                <div className="flex items-center space-x-1 mb-s20">
                                    <h2 className="">Email:</h2>
                                    <h2 className="">genie.iot20@gmail.com</h2>
                                </div>
                                <div className="flex items-center space-x-1 mb-s20">
                                    <h2 className="">Phone:</h2>
                                    <h2 className="">01976445888</h2>
                                </div>
                            </div>

                            <div className='absolute right-5 bottom-5 flex space-x-2'>
                                <button className='ring-1 ring-cRed text-cRed rounded-br5 px-s20 py-s5' onClick={() => setShowDeleteModal(true)}>Delete</button>
                                <DeleteCustomer />
                                <CommonButton btnLabel='Edit' onClick={() => setShowEditModal(true)} colorType='primary' />
                                <EditCustomer />
                            </div>

                            <div className='absolute right-5 top-5'>
                                <MuiCustomSwitch
                                    color="secondary"
                                />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

// md:flex justify-between space-y-5 md:space-x-5 md:space-y-5