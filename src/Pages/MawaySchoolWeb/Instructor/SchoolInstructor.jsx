/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import CommonTitle from '../../../Components/Title/CommonTitle';
import { t } from 'i18next';
import SchoolInstructorTableRow from './table/SchoolInstructorTableRow';
import { useEffect } from 'react';
import useSchoolInstructorStore, { getSchoolInstructorIndex } from '../../../App/Stores/school/schoolInstructorStore';
import useLayoutStore from '../../../App/Stores/LayoutStore';
import { PageTitle } from '../../../Utility/UtilityFunctions';
import { useDebounce } from 'use-debounce';
import CommonTable2 from '../../../Components/Table/CommonTable2';

const SchoolInstructor = () => {

    const { setSchool_instructor_take, school_instructor_take, schoolInstructorList, setSchoolInstructorSearchKey, schoolInstructorSearchKey } = useSchoolInstructorStore();

    const { setBarTitle } = useLayoutStore();

    const schoolInstructorHeaders = [
        { index: 1, name: t("#") },
        { index: 2, name: t("Name") },
        { index: 3, name: t("Email") },
        { index: 4, name: t("Phone") },
        { index: 5, name: t("Status") }
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
        PageTitle("MaWay | Instructor");
        setBarTitle("MaWay | Instructor");
        getSchoolInstructorIndex();
    }, [])

    const [searchValue] = useDebounce(schoolInstructorSearchKey, 500);

    useEffect(() => {
        getSchoolInstructorIndex();
    }, [searchValue])

    return (
        <div className=''>
            <CommonTitle title={t("School instructor")}/>
            <div className='overflow-hidden bg-cBrandColor2 rounded-br8'>
                <CommonTable2
                    headers={schoolInstructorHeaders}
                    tableTitle=""
                    paginationObject={schoolInstructorList}
                    totalResult={true}

                    showPageCountText={true}
                    showPagination={true}

                    paginationOnClick={async (url) => {
                        getSchoolInstructorIndex(url)
                    }}

                    showTakeOption={true}
                    currentTakeAmount={school_instructor_take}
                    takeOptionOnChange={(e) => {
                        setSchool_instructor_take(e);
                        getSchoolInstructorIndex("");
                    }}
                    showSearchBox={true}
                    withClearSearch={true}
                    searchValue={schoolInstructorSearchKey}
                    onSearchClear={() => setSchoolInstructorSearchKey("")}
                    searchOnChange={(e) => setSchoolInstructorSearchKey(e.target.value)}

                    autoManageRow={true}
                    TableRowComponent={SchoolInstructorTableRow}
                />
            </div>
        </div>
    );
};

export default SchoolInstructor;