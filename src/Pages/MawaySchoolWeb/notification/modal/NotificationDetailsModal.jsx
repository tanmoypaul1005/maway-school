import React from 'react';
import CommonModal from '../../../../Components/Modal/CommonModal';
import useNotificationStore from '../../../../App/Stores/school/notificationStore';
import { formatDate } from '../../../../App/Utility/UtilityFunctions';
import { useTranslation } from 'react-i18next';

const NotificationDetailsModal = () => {

    const { notificationDetails, showNotificationDetailsModal, setShowNotificationDetailsModal } = useNotificationStore();

    const { t } = useTranslation();

    return (
        <div>
            <CommonModal
                showModal={showNotificationDetailsModal}
                setShowModal={setShowNotificationDetailsModal}
                modalTitle={t("Notification details")}
                mainContent={
                    <>
                        <div className='flex justify-between mt-s8'>
                            <div className='font-fw600 text-fs14 text-cBlack flex items-center'>{notificationDetails?.title}</div>
                            <div className='body_text text-cGray flex items-center pt-s4'>
                                {`${formatDate(notificationDetails?.created_date)} , ${notificationDetails?.created_time}`}
                            </div>
                        </div>
                        <div className='body_text text-cGray'>
                            {notificationDetails?.description}
                        </div>
                    </>
                }
            />
        </div>
    );
};

export default NotificationDetailsModal;