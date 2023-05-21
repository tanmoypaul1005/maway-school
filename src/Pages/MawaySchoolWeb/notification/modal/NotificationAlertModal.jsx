import React from 'react'
import CommonModal from '../../../../Components/Modal/CommonModal'
import useNotificationStore from '../../../../App/Stores/school/notificationStore'
import CommonButton from '../../../../Components/Button/CommonButton'

function NotificationAlertModal() {

    const { setShowNotificationAlertModal, showNotificationAlertModal } = useNotificationStore()

    return (
        <div>
            <CommonModal
                showModal={showNotificationAlertModal}
                setShowModal={setShowNotificationAlertModal}
                modalTitle="Notification"
                mainContent={
                    <>
                        <div className='text-fs14 font-fw400  text-cBlack py-s20 text-center'>
                            The notification you have already read will be removed after 48 hours.
                        </div>
                        <div className='flex justify-center'>
                            <CommonButton roundedFull={false} width="w-[100px]" onClick={() => { setShowNotificationAlertModal(false) }} btnLabel='Ok' />
                        </div>
                    </>
                }
            />
        </div>
    )
}

export default NotificationAlertModal
