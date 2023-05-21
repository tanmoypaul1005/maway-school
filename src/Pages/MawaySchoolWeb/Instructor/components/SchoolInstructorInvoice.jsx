/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import SchoolInstructorProfile from './SchoolInstructorProfile'
import SchoolInstructorInvoiceTableRow from '../table/SchoolInstructorInvoiceTableRow';
import { useEffect } from 'react';
import useSchoolInstructorStore, { schoolInstructorsInvoiceIndex } from '../../../../App/Stores/school/schoolInstructorStore';
import CommonTable2 from '../../../../Components/Table/CommonTable2';
import { useDebounce } from 'use-debounce';
import { useTranslation } from 'react-i18next';

function SchoolInstructorInvoice() {

    const {
        setInstructor_invoice_search,
        setInvoice_take, invoice_take,
        schoolInstructorsInvoiceList,
        schoolInstructorDetails,
        instructor_invoice_search
    } = useSchoolInstructorStore();

    const { t } = useTranslation();

    const schoolInstructorHeaders = [
        { index: 1, name: t("#") },
        { index: 2, name: t("Order ID") },
        { index: 3, name: t("Date & time") },
        { index: 4, name: t("Due date") },
        { index: 5, name: t("Amount") },
        { index: 6, name: t("Status") }
    ];

    const [searchValue] = useDebounce(instructor_invoice_search, 500);

    useEffect(() => {
        setInvoice_take(10);
        if (schoolInstructorDetails?.instructor?.id) {
            if (searchValue === "") {
                schoolInstructorsInvoiceIndex("", schoolInstructorDetails?.instructor?.id);
            } else {
                schoolInstructorsInvoiceIndex("", schoolInstructorDetails?.instructor?.id, searchValue)
            }
        }
    }, [schoolInstructorDetails?.instructor?.id, searchValue]);

    return (
        <div>
            <SchoolInstructorProfile />

            <div className='overflow-hidden bg-cBrandColor2 rounded-br10 mt-s24'>
                <CommonTable2
                    headers={schoolInstructorHeaders}
                    tableTitle=""
                    paginationObject={schoolInstructorsInvoiceList}
                    totalResult={true}
                    showPageCountText={true}
                    showPagination={true}

                    paginationOnClick={async (url) => {
                        if (schoolInstructorDetails?.instructor?.id) {
                            if (searchValue === "") {
                                schoolInstructorsInvoiceIndex(url, schoolInstructorDetails?.instructor?.id);
                            } else {
                                schoolInstructorsInvoiceIndex(url, schoolInstructorDetails?.instructor?.id, searchValue)
                            }
                        }
                    }}

                    showSearchBox={true}
                    withClearSearch={true}
                    searchValue={instructor_invoice_search}
                    onSearchClear={() => setInstructor_invoice_search("")}
                    searchOnChange={(e) => setInstructor_invoice_search(e.target.value)}

                    showTakeOption={true}
                    currentTakeAmount={invoice_take}
                    takeOptionOnChange={(e) => {
                        setInvoice_take(e);
                        schoolInstructorsInvoiceIndex("", schoolInstructorDetails?.instructor?.id)
                    }}

                    autoManageRow={true}
                    TableRowComponent={SchoolInstructorInvoiceTableRow}
                />
            </div>

        </div>
    )
}

export default SchoolInstructorInvoice
