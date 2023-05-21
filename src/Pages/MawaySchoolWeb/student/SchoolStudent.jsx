/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useEffect } from 'react';
import useSchoolStudentStore, { getSchoolStudentIndex } from '../../../App/Stores/school/schoolStudentStore';
import CommonTitle from '../../../Components/Title/CommonTitle';
import SchoolStudentListTableRow from './table/SchoolStudentListTableRow';
import { PageTitle } from '../../../App/Utility/UtilityFunctions';
import CommonTable2 from '../../../Components/Table/CommonTable2';
import { useDebounce } from 'use-debounce';
import { useTranslation } from 'react-i18next';
import useLayoutStore from '../../../App/Stores/LayoutStore';

const SchoolStudent = () => {

    const {
        schoolStudentList,
        setSchoolStudentPageUrl,
        schoolStudentPageUrl,
        SchoolStudentIndexTakeAmount,
        setSchoolStudentIndexTakeAmount,
        setSchoolStudentSearch,
        schoolStudentSearch
    } = useSchoolStudentStore();

    const { t } = useTranslation();

    const classHeaders = [
        { index: 1, name: "#" },
        { index: 2, name: t("Name") },
        { index: 3, name: t("Category") },
        { index: 4, name: t("Amount") },
        { index: 5, name: t("Remaining") },
        { index: 6, name: t("Status") },
    ];

    const [searchValue] = useDebounce(schoolStudentSearch, 500);

    useEffect(() => {
        if (searchValue === "") {
            getSchoolStudentIndex(schoolStudentPageUrl, SchoolStudentIndexTakeAmount);
        } else {
            getSchoolStudentIndex("", SchoolStudentIndexTakeAmount, searchValue);
        }
    }, [searchValue]);

    const { setBarTitle } = useLayoutStore();

    useEffect(() => {
        window.scrollTo(0, 0);
        PageTitle(t("Student"));
        setBarTitle(t("Student"));
    }, []);

    return (
        <div>
            <CommonTitle title={t("Student")} />

            <CommonTable2
                headers={classHeaders}
                tableTitle=""

                showPageCountText={true}
                showPagination={true}

                TableRowComponent={SchoolStudentListTableRow}
                paginationOnClick={async (url) => {
                    await setSchoolStudentPageUrl(url);

                    if (searchValue === "") {
                        getSchoolStudentIndex(url, SchoolStudentIndexTakeAmount);
                    } else {
                        getSchoolStudentIndex(url, SchoolStudentIndexTakeAmount, searchValue);
                    }
                }}

                paginationObject={schoolStudentList}
                autoManageRow={true}

                showTakeOption={true}
                currentTakeAmount={SchoolStudentIndexTakeAmount}
                takeOptionOnChange={(takeAmount) => {
                    getSchoolStudentIndex("", takeAmount);
                    setSchoolStudentIndexTakeAmount(takeAmount);
                }}

                showSearchBox={true}
                searchValue={schoolStudentSearch}
                withClearSearch={true}
                onSearchClear={() => setSchoolStudentSearch("")}
                searchOnChange={(e) => setSchoolStudentSearch(e.target.value)}

            />
        </div>
    );
};

export default SchoolStudent;