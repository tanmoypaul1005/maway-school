import React from 'react';
import useLicenseStore, { updateLicenseDuration } from '../../App/Stores/LicenseStore';
import CommonButton from '../Button/CommonButton';
import CommonInput from '../Input/CommonInput';
import CommonModal from '../Modal/CommonModal';

const EditLicenseDuration = () => {
    const { showEditDurationModal,
        setShowEditDurationModal,

        licenseEditDurationID,
        licenseEditDurationUID,
        licenseEditDurationType,

        licenseEditDurationStartDate,
        setLicenseEditDurationStartDate,

        licenseEditDurationEndDate,
        setLicenseEditDurationEndDate,
    } = useLicenseStore();

    const SubmitDuration = async () => {
        if (!licenseEditDurationStartDate || !licenseEditDurationEndDate) return;

        let body = {
            id: licenseEditDurationID,
            start_date: licenseEditDurationStartDate,
            end_date: licenseEditDurationEndDate,
        }
        // console.log("edit duration body: ", body, "\n licenseEditDurationUID: ", licenseEditDurationUID, "\n licenseEditDurationType: ", licenseEditDurationType);
        let updateSuccess = await updateLicenseDuration(body, licenseEditDurationType, licenseEditDurationUID);

        if (updateSuccess) setShowEditDurationModal(false);

    }
    return (
        <CommonModal
            showModal={showEditDurationModal}
            setShowModal={setShowEditDurationModal}
            modalTitle="Edit Duration"
            mainContent={
                <form onSubmit={(e) => e.preventDefault()} className='pt-5'>
                    {/*e         date section */}
                    <div onClick={() => console.log("licenseEditDurationStartDate : ", licenseEditDurationStartDate, " licenseEditDurationEndDate: ", licenseEditDurationEndDate)} className="flex justify-between space-x-5">
                        <div className="w-full">
                            <CommonInput
                                label={"Start Date"}
                                type="date"
                                required={true}
                                value={licenseEditDurationStartDate}
                                startDate={licenseEditDurationStartDate}
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    if (licenseEditDurationEndDate < e.target.value) {
                                        setLicenseEditDurationStartDate(e.target.value);
                                        setLicenseEditDurationEndDate("");
                                    }
                                    else {
                                        setLicenseEditDurationStartDate(e.target.value);
                                    }
                                }}
                            />
                        </div>
                        <div className="w-full">
                            <CommonInput
                                label={"End Date"}
                                type="date"
                                required={true}                                
                                value={licenseEditDurationEndDate}
                                startDate={licenseEditDurationStartDate}
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setLicenseEditDurationEndDate(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center pt-5">
                        <CommonButton
                            btnLabel='update'
                            onClick={SubmitDuration}
                            type='submit'
                        />
                    </div>
                </form>
            }
        />
    )
}

export default EditLicenseDuration