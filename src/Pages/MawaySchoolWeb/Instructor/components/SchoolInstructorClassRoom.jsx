/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import SchoolInstructorProfile from './SchoolInstructorProfile'
import { t } from 'i18next';
import { useEffect } from 'react';
import useSchoolInstructorStore, { schoolInstructorsClassroomIndex } from '../../../../App/Stores/school/schoolInstructorStore';
import SchoolInstructorClassroomTableRow from '../table/SchoolInstructorClassroomTableRow';
import CommonTable2 from '../../../../Components/Table/CommonTable2';
import { useDebounce } from 'use-debounce';
import { useTranslation } from 'react-i18next';

function SchoolInstructorClassRoom() {

    const {
        instructor_classroom_search,
        classroom_take,
        setClassroom_take,
        schoolInstructorsLessonList,
        schoolInstructorDetails,
        setInstructor_classroom_search
    } = useSchoolInstructorStore()

    const { t } = useTranslation();

    const schoolInstructorHeaders = [
        { index: 1, name: t("#") },
        { index: 2, name: t("Title") },
        { index: 3, name: t("Date & time") },
        { index: 4, name: t("Category") },
        { index: 5, name: t("Lesson status") },
        { index: 6, name: t("Payment status") }
    ];

    const [searchValue] = useDebounce(instructor_classroom_search, 500);

    useEffect(() => {
        setClassroom_take(10)
        if (schoolInstructorDetails?.instructor?.id) {
            if (searchValue === "") {
                schoolInstructorsClassroomIndex("", schoolInstructorDetails?.instructor?.id)
            } else {
                schoolInstructorsClassroomIndex("", schoolInstructorDetails?.instructor?.id, searchValue)
            }
        }
    }, [schoolInstructorDetails?.instructor?.id, searchValue])


    return (
        <div>
            <SchoolInstructorProfile />

            <div className='overflow-hidden bg-cBrandColor2 rounded-br10 mt-s24'>
                <CommonTable2
                    headers={schoolInstructorHeaders}
                    tableTitle=""
                    paginationObject={schoolInstructorsLessonList}
                    totalResult={true}
                    showPageCountText={true}
                    showPagination={true}

                    paginationOnClick={async (url) => {
                        if (searchValue === "") {
                            await schoolInstructorsClassroomIndex(url, schoolInstructorDetails?.instructor?.id)
                        } else {
                            await schoolInstructorsClassroomIndex(url, schoolInstructorDetails?.instructor?.id, searchValue)
                        }
                    }}

                    showTakeOption={true}
                    currentTakeAmount={classroom_take}
                    takeOptionOnChange={async (e) => {
                        await setClassroom_take(e);
                        schoolInstructorsClassroomIndex("", schoolInstructorDetails?.instructor?.id)
                    }}

                    showSearchBox={true}
                    withClearSearch={true}
                    searchValue={instructor_classroom_search}
                    onSearchClear={() => setInstructor_classroom_search("")}
                    searchOnChange={(e) => setInstructor_classroom_search(e.target.value)}

                    autoManageRow={true}
                    TableRowComponent={SchoolInstructorClassroomTableRow}
                />
            </div>

        </div>
    )
}

export default SchoolInstructorClassRoom
