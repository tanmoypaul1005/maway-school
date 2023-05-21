import { t } from 'i18next';
import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import useLayoutStore from '../../App/Stores/LayoutStore';
import { iFilter, iFilterWhite } from '../../App/Utility/source';
import CommonButtonOutlined from '../../Components/Button/CommonButtonOutlined';
import BackLink from '../../Components/Pagination/BackLink';
import InvoiceTableRow from '../../Components/Table/Invoice/InvoiceTableRow';
import useInvoiceStore, { getInvoiceIndex, searchInvoiceList } from './../../App/Stores/InvoiceStore';
import { PageTitle } from './../../App/Utility/UtilityFunctions';
import CommonTable from './../../Components/Table/CommonTable';
import CommonTitle from './../../Components/Title/CommonTitle';

const Invoice = () => {
  const {
    setShowInvoiceFilterModal,
    invoiceIndexData,
    invoiceSearchKey,
    setInvoiceSearchKey,
    filterData,
    resetInvoiceFilterData,
    invoiceType,
    setInvoiceType,
    invoiceUserType,
    setInvoiceUserType,
    invoicePageUrl,
    invoiceFilterActive,
    setInvoicePageUrl
  } = useInvoiceStore();

  // const [invoiceTypeREQ, setInvoiceTypeREQ] = useState();

  const InvoiceHeaders = [
    { index: 1, name: t("#") },
    { index: 2, name: "From" },
    { index: 3, name: "Email" },
    { index: 4, name: "User Type" },
    { index: 5, name: "Created On" },
    { index: 6, name: "Last Action" },
    { index: 7, name: "Status" },
  ];

  const [searchValue] = useDebounce(invoiceSearchKey, 500);

  const { setBarTitle } = useLayoutStore();

  const { invoice_id, instructor_id, school_id, student_id } = useParams();

  const location = useLocation();

  useEffect(() => {
    SmartSearchAllInvoice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, invoiceUserType]);

  const SmartSearchAllInvoice = async () => {
    if (searchValue) {
      await searchInvoiceList("", invoicePageUrl);
    } else if (invoiceUserType === 'system_generated') return;
    else {
      if (invoiceIndexData.current_page) {
        let urlToLoad = invoiceIndexData.path + "?page=" + invoiceIndexData.current_page;
        // console.log("CURRENT PAGE LINK TO LOAD::::::", urlToLoad);
        setInvoiceSearchKey("");
        await getInvoiceIndex(invoiceUserType, urlToLoad, filterData);
      }
      else {
        setInvoiceType(0);
        setInvoiceSearchKey("")
        await getInvoiceIndex(invoiceUserType, "", filterData);
      }
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    PageTitle(t("Orders"));
    setBarTitle("Orders");

    fetchInvoice();

  }, []);


  const fetchInvoice = async () => {
    if (invoiceSearchKey) {
      await searchInvoiceList("", invoicePageUrl)
    } else {
      await getInvoiceIndex(invoiceUserType, invoicePageUrl, filterData);
    }
  }

  //console.log("invoiceUserType", invoiceUserType)

  return (
    <div className='mx-s12 md:mx-s32'>
      <CommonTitle title="Orders">
        {
          location.pathname === `/instructor/details/${instructor_id}/invoice` && <BackLink linksArray={[
            { label: "Instructor", linkTo: "/instructor" },
            { label: "Instructor Details", linkTo: `/instructor/details/${instructor_id}` },
            { label: "Orders", linkTo: `` }
          ]}
          />
        }
        {
          location.pathname === `/school/details/${school_id}/invoice` && <BackLink linksArray={[
            { label: "School", linkTo: "/school" },
            { label: "School Details", linkTo: `/school/details/${invoice_id}` },
            { label: "Orders", linkTo: `` }
          ]}
          />
        }

        {
          location.pathname === `/student/details/${student_id}/invoice` && <BackLink linksArray={[
            { label: "Student ", linkTo: "/student" },
            { label: "Student Details", linkTo: `/student/details/${invoice_id}` },
            { label: "Orders", linkTo: `` }
          ]}
          />
        }
      </CommonTitle>

      <div className='overflow-hidden bg-cBrandColor2 rounded-br20'>
        <CommonTable
          topRightComponent={<TakeItem />}
          headers={InvoiceHeaders}
          tableTitle=""
          showPagination={true}
          showChip={true}
          chipWidth="min-w-[150px]"
          chipArray={[
            {
              title: "All",
              selected: invoiceType === 0 ? true : false,
              action: async () => {
                setInvoiceSearchKey("");
                // console.log("All");
                resetInvoiceFilterData();
                // setInvoiceTypeREQ("all");
                setInvoiceUserType('all')
                setInvoiceType(0);

                await getInvoiceIndex("all", "");
              },
            },
            {
              title: "Admin",
              selected: invoiceType === 1 ? true : false,
              action: async () => {
                setInvoiceSearchKey("");
                // console.log("Admin");
                resetInvoiceFilterData();
                // setInvoiceTypeREQ("admin");
                setInvoiceUserType('admin')
                setInvoiceType(1);

                await getInvoiceIndex("admin", "");
              },
            },
            {
              title: "System generated",
              selected: invoiceType === 3 ? true : false,
              action: async () => {
                setInvoiceSearchKey("");
                // console.log("History");
                resetInvoiceFilterData();
                // setInvoiceTypeREQ("system_generated");
                setInvoiceUserType('system_generated')
                setInvoiceType(3);

                await getInvoiceIndex("system_generated", "");
                // await getInvoiceIndex("system_generated", "");
              },
            },
            {
              title: "History",
              selected: invoiceType === 2 ? true : false,
              action: async () => {
                setInvoiceSearchKey("");
                // console.log("History");
                resetInvoiceFilterData();
                // setInvoiceTypeREQ("history");
                setInvoiceUserType('history')
                setInvoiceType(2);

                await getInvoiceIndex("history", "");
              },
            },
          ]}

          shoSearchBox={true}
          searchValue={invoiceSearchKey}
          withClearSearch={true}
          onSearchClear={() => setInvoiceSearchKey("")}
          searchOnChange={(e) => {
            console.log("SEARCH", e.target.value);
            setInvoiceSearchKey(e.target.value);
            // searchInvoiceList(e.target.value);
          }}

          titleComponent={
            <>
              <CommonButtonOutlined
                iconLeft={iFilterWhite}
                iconLeftHover={iFilter}
                isFilterDot={invoiceFilterActive}
                colorType='primary'
                btnLabel="Filter"
                onClick={() => { setShowInvoiceFilterModal(true) }}
              />
            </>

          }

          autoManageRow={true}
          TableRowComponent={InvoiceTableRow}
          paginationObject={invoiceIndexData}

          paginationOnClick={async (url) => {
            console.log(url);
            setInvoicePageUrl(url);
            if (
              filterData?.search === "" &&
              filterData?.status === -1 &&
              filterData?.license_id === -1 &&
              filterData?.payment_status?.length === 0
            )
              await getInvoiceIndex(invoiceUserType, url);
            else if (searchValue) {
              await searchInvoiceList(searchValue, url);
            } else if (invoiceUserType === 'all') {
              setInvoiceType(0);
              await getInvoiceIndex("all", url, filterData)
            } else if (invoiceUserType === 'admin') {
              setInvoiceType(1);
              await getInvoiceIndex("admin", url, filterData)
            } else if (invoiceUserType === 'system_generated') {
              setInvoiceType(3);
              await getInvoiceIndex("system_generated", url, filterData)
              await getInvoiceIndex("system_generated", url, filterData)
            } else if (invoiceUserType === 'history') {
              setInvoiceType(2);
              await getInvoiceIndex("history", url, filterData)
            }
            else {
            }
          }}

        />
      </div>
    </div>
  );
};

export default Invoice;



const TakeItem = () => {

  const { inVoiceTake, setInVoiceTake, invoiceUserType, invoiceSearchKey, filterData, setInvoicePageUrl } = useInvoiceStore();

  return (
    <div className=''>
      <span className='pr-s10'>Show</span>
      <select
        value={inVoiceTake ? inVoiceTake : 10}
        onChange={async (e) => {
          setInvoicePageUrl("");
          await setInVoiceTake(e.target.value);
          if (invoiceSearchKey) {
            await searchInvoiceList()
          } else {
            await getInvoiceIndex(invoiceUserType, "", filterData);
          }

        }} className='pl-5 font-semibold border-2 h-s30 rounded-br5 select-style space-y-s5 border-cChipBorder'>
        <option
          className='py-s10 text-cHighlightedTexts'
          selected={inVoiceTake === 10}
          value={10}
        >10</option>

        <option
          className='py-s10 text-cHighlightedTexts'
          selected={inVoiceTake === 25}
          value={25}
        >25</option>
        <option
          className='py-s10 text-cHighlightedTexts'
          selected={inVoiceTake === 50}
          value={50}
        >50</option>
        <option
          className='py-s10 text-cMainBlack'
          selected={inVoiceTake === 100}
          value={100}
        >100</option>
      </select>   <span className='pl-s10'>Entries</span>

    </div>
  )
}