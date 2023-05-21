import React from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { iDrivingCard, iExternalCard, iInvoiceCard, iSchoolClassroomLesson } from '../../../../App/Utility/source';
import CommonCard from '../../../../Components/Card/CommonCard';
import useSchoolInstructorStore, { getSchoolInstructorsAdditionalInfo } from '../../../../App/Stores/school/schoolInstructorStore';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function SchoolInstructorAdditionalInfo() {

    const location = useLocation();
    const { school_instructor_id } = useParams();

    const {
        setInstructor_driving_search,
        setInstructor_external_search,
        setInstructor_classroom_search,
        setInstructor_invoice_search,
        instructor_additional_info,
        schoolInstructorDetails
    } = useSchoolInstructorStore();

    const { t } = useTranslation();

    useEffect(() => {
        if (schoolInstructorDetails?.instructor?.id) {
            getSchoolInstructorsAdditionalInfo(schoolInstructorDetails?.instructor?.id)
        }
    }, [schoolInstructorDetails?.instructor?.id])


    return (
        <div>
            <span className='section_title text-cBlack capitalize-first'>{t("Additional information")}</span>
            <div className='pb-s4'></div>
            <div className="grid grid-cols-1 gap-5 px-0 w-full sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 pt-s6">
                <NavLink
                    onClick={() => { setInstructor_invoice_search() }}
                    to={`/school-instructor/details/${school_instructor_id}/invoice`}>
                    <CommonCard
                        cardIcon={iInvoiceCard}
                        title={'Orders'}
                        note={`${instructor_additional_info?.order_count} Order`}
                        isSelected={location.pathname === `/school-instructor/details/${school_instructor_id}/invoice`}
                    />
                </NavLink>

                <NavLink
                    onClick={() => { setInstructor_classroom_search("") }}
                    to={`/school-instructor/details/${school_instructor_id}/classroom`}>
                    <CommonCard
                        cardIcon={iSchoolClassroomLesson}
                        title={t('Classroom')}
                        note={`${instructor_additional_info?.classroom_count} ${t("Upcoming")}`}
                        isSelected={location.pathname === `/school-instructor/details/${school_instructor_id}/classroom`}
                    />
                </NavLink>

                <NavLink
                    onClick={() => { setInstructor_driving_search("") }}
                    to={`/school-instructor/details/${school_instructor_id}/driving`}>
                    <CommonCard
                        cardIcon={iDrivingCard}
                        title={t('Driving')}
                        note={`${instructor_additional_info?.driving_count} ${t("Pending")} `}
                        isSelected={location.pathname === `/school-instructor/details/${school_instructor_id}/driving`}
                    />
                </NavLink>


                <NavLink
                    onClick={() => { setInstructor_external_search("") }}
                    to={`/school-instructor/details/${school_instructor_id}/external`}>
                    <CommonCard
                        cardIcon={iExternalCard}
                        title={t('External')}
                        note={`${instructor_additional_info?.external_count} ${t("Pending")}`}
                        isSelected={location.pathname === `/school-instructor/details/${school_instructor_id}/external`}
                    />
                </NavLink>
            </div>
        </div>
    )
}

export default SchoolInstructorAdditionalInfo
