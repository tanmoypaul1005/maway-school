import React from 'react';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import useInvoiceStore from '../../App/Stores/InvoiceStore';
import useStudentStore, { getStudentList } from '../../App/Stores/StudentStore';
import { iCategoryCard, iInvoiceCard, iLicenseHistoryCard, iSchoolCard } from '../../App/Utility/source';
import CommonCard from '../Card/CommonCard';
import BackLink from '../Pagination/BackLink';
import StudentProfile from './../CommonDetailPage/CommonStudent/StudentProfile';
import CommonTitle from './../Title/CommonTitle';

const CommonStudentProfile = ({ shareReport }) => {

    const { setShowStudentEditModal, studentAdditional } = useStudentStore();

    const { setInvoiceType, setInvoiceUserType, resetFilterStudentInvoiceData } = useInvoiceStore();

    const location = useLocation();

    const { school_id, student_id } = useParams()

    const navigate = useNavigate();

    return (
        <div className="mx-s12 md:mx-s32">
            <div className="flex justify-between">

                <CommonTitle
                    title={
                        location.pathname === `/school/details/${school_id}/student/details/${student_id}` ?
                            "School Student Profile" : "Student Profile"
                    }

                >
                    {location.pathname === `/school/details/${school_id}/student/details/${student_id}` && <BackLink linksArray={[
                        { label: "School", linkTo: "/school" },
                        { label: "School Details", linkTo: `/school/details/${school_id}` },
                        { label: "School Student", linkTo: `/school/details/${school_id}/student` },
                        { label: "School Student Profile", linkTo: `` }
                    ]} />}

                    {location.pathname === `/contact-us/student-profile/details/${student_id}` && <BackLink linksArray={[
                        { label: "Contact Us", linkTo: "/contact-us" },
                        { label: "Student Profile", linkTo: `` }
                    ]} />}

                    {location.pathname === `/student/details/${student_id}` && <BackLink linksArray={[
                        { label: "student", linkTo: "/student" },
                        { label: "Student Profile", linkTo: "" },
                    ]} />}
                </CommonTitle>

                {/* <div className="border-2 text-cBrandColor border-cBrandColor rounded-br100 w-s156 h-s45 mt-s20 lg:h-s50">
                    <span onClick={shareReport} className='flex pt-s11 mb-s11 mx-s14'> <span className="mr-s10 text-fs13 font-fw600 lg:text-fs16">Share Report</span><img src={iVector3} alt=""></img></span>
                </div> */}
            </div>

            <div>
                <div className="bg-cBrandColor2 rounded-br20 px-s20 py-s20">
                    <StudentProfile onClick={() => { setShowStudentEditModal(true) }} />

                    <div className="px-1 py-s20">
                        <hr />
                    </div>

                    <span
                        // onClick={() => { console.log("studentAdditional", studentAdditional); }} 
                        className='text-fs14 font-fw600 py-s20 text-cBlack'>Additional Information</span>
                    <div className="grid grid-cols-1 gap-5 px-0 w-full sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 pt-s20">

                        <NavLink to={`/student/details/${student_id}/curriculum/details`}>
                            <CommonCard cardIcon={iCategoryCard} title={'Curriculum'} note={`${studentAdditional?.curriculum_counter?.total_lesson} Lessons, Remaining ${studentAdditional?.curriculum_counter?.remaining_lesson}`} />
                        </NavLink>

                        {/* e       invoice      */}
                        <NavLink
                            onClick={() => {
                                resetFilterStudentInvoiceData();
                                localStorage.setItem("studentInvoiceType", "school_student");
                                localStorage.setItem("studentInvoicePaginationURL", "");
                                localStorage.setItem("studentInvoiceTake", 10);
                            }}
                            to={studentAdditional?.invoice_count > 0 ? `/student/details/${student_id}/invoice` : ''}>
                            <CommonCard cardIcon={iInvoiceCard}
                                onClick={() => { setInvoiceType(1); setInvoiceUserType('admin') }} title={'Orders'} note={`${studentAdditional?.invoice_count} Orders`} />
                        </NavLink>

                        <NavLink to={`/student/details/${student_id}/school`}>
                            <CommonCard cardIcon={iSchoolCard} title={'Schools'} note={`${studentAdditional?.schools_counter?.active_school} Active, ${studentAdditional?.schools_counter?.history_school} History`} />
                        </NavLink>

                        <div onClick={() => {
                            navigate(`/student/details/${student_id}/curriculum/history`)
                        }}>
                            <CommonCard cardIcon={iLicenseHistoryCard} title={'Curriculum History'} note={`${studentAdditional?.curriculum_history_counter} Curriculum`} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommonStudentProfile;