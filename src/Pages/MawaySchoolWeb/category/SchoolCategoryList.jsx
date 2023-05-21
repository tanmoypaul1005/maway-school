/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import SchoolCategoryListTableRow from './table/SchoolCategoryListTableRow';
import { PageTitle } from '../../../Utility/UtilityFunctions';
import useLayoutStore from '../../../App/Stores/LayoutStore';
import useSchoolCategoryStore, { schoolCategoryIndex, searchSchoolCategoryList } from '../../../App/Stores/school/schoolCategoryStore';
import useUtilityStore from '../../../App/Stores/UtilityStore';
import CommonTitle from '../../../Components/Title/CommonTitle';
import CommonTable2 from '../../../Components/Table/CommonTable2';
import { useTranslation } from 'react-i18next';

const SchoolCategoryList = () => {

  const { setSchoolCategorySearchKey, schoolCategorySearchKey, schoolCategoryListAll, setSchoolCategoryPageUrl, schoolCategoryPageUrl } = useSchoolCategoryStore();

  const { setLoadingSearch } = useUtilityStore.getState();

  const { t } = useTranslation();

  const categoryHeaders = [
    { index: 1, name: t("#") },
    { index: 2, name: t("Title") },
    { index: 3, name: t("Package lessons") },
    { index: 4, name: t("Package hours") },
    { index: 5, name: t("Price") },
    { index: 6, name: t("Status") }
  ];

  const { setBarTitle } = useLayoutStore();

  useEffect(() => {
    PageTitle(t("Category"));
    setBarTitle(t("Category"));
  }, [setBarTitle]);


  useEffect(() => {
    if (schoolCategorySearchKey) {
      setLoadingSearch(true);
      setTimeout(() => {
        searchSchoolCategoryList(schoolCategorySearchKey);
        setLoadingSearch(false);
      }, 350);
    } else {
      schoolCategoryIndex(schoolCategoryPageUrl)
    }
  }, [schoolCategorySearchKey]);

  return (
    <div className=''>
      <CommonTitle title={t("Category")}/>
      <div className='overflow-hidden bg-cBrandColor2 rounded-br8'>
        <CommonTable2
          headers={categoryHeaders}
          tableTitle=""
          paginationObject={schoolCategoryListAll}
          totalResult={true}
          showPagination={true}
          showPageCountText={true}

          paginationOnClick={async (url) => {
            setSchoolCategoryPageUrl(url);
            schoolCategoryIndex(url);
          }}

          showSearchBox={true}
          withClearSearch={true}
          searchValue={schoolCategorySearchKey}
          onSearchClear={() => setSchoolCategorySearchKey("")}
          searchOnChange={(e) => setSchoolCategorySearchKey(e.target.value)}

          autoManageRow={true}
          TableRowComponent={SchoolCategoryListTableRow}

        />
      </div>
    </div>
  );
};
export default SchoolCategoryList;

