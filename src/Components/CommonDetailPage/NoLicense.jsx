import React from 'react';
import { useParams } from 'react-router-dom';
import useLicenseStore from '../../App/Stores/LicenseStore';

const NoLicense = ({ height = "h-s317", user_id = 0, showAssignLicense = true }) => {
    const { setAssignLicenseModal, setAssignLicenseType, setAssignLicenseForm, assignLicenseForm } = useLicenseStore();
    const { school_id, instructor_id } = useParams();
    return (
        <div>
            <div className={`bg-cBrandColor w-w350 rounded-br10 my-s3 ${height}`}>
                <div className='flex justify-center items-center h-s317'>
                    <div className='text-center'>
                        <div className='text-fs20 font-fw600 text-cBrandColor2 mb-s10'>No Active License</div>

                        {showAssignLicense ? <div
                            onClick={async () => {
                                await setAssignLicenseForm({ ...assignLicenseForm, user_id: user_id });

                                if (window.location.pathname === ("/school/details/" + school_id)) {
                                    await setAssignLicenseType("school");

                                }
                                else if (window.location.pathname === ("/instructor/details/" + instructor_id)) {
                                    await setAssignLicenseType("instructor");
                                }
                                setAssignLicenseModal(true);
                            }}
                            className='bg-cBrandColor2 text-cBrandColor text-fs12 rounded-br100 s48'>
                            <span className='flex justify-center items-center cursor-pointer h-s48'>Assign License</span>
                        </div> : ''}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoLicense;