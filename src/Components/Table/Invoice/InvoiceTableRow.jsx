import { Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useInvoiceStore from '../../../App/Stores/InvoiceStore';
import { iRightArrow } from '../../../App/Utility/source';
import { dateDiffCalendar, formatDate } from '../../../App/Utility/UtilityFunctions';
import CommonEmptyStatus from '../../CommonEmptyStatus/CommonEmptyStatus';
import Image from '../../Image/Image';
import useUtilityStore from '../../../App/Stores/UtilityStore';

const InvoiceTableRow = ({ data, index }) => {
  const { invoiceUserType, setInvoiceActionDates, } = useInvoiceStore();
  const { loggedUser } = useUtilityStore();
  const [invoiceStatus, setInvoiceStatus] = useState("accepted");
  // const [invoiceStatusColor, setInvoiceStatusColor] = useState("text-c");
  // const [] = useState({});
  const [invoiceLastAction, setInvoiceLastAction] = useState("");

  const navigate = useNavigate();

  const location = useLocation();

  const { id, instructor_id, school_id, student_id } = useParams();

  const invoiceClick = () => {
    if (location.pathname === `/student/details/${student_id}/invoice`) {
      navigate(`/student/details/${student_id}/invoice/${data?.id}`)
    } else if (location.pathname === `/instructor/details/${instructor_id}/invoice`) {
      navigate(`/instructor/details/${instructor_id}/invoice/${data?.id}`)
    } else if (location.pathname === `/school/details/${school_id}/invoice`) {
      navigate(`/school/details/${school_id}/invoice/${data?.id}`)
    }
    else if (invoiceUserType === "system_generated") navigate("/invoice/details/" + data?.id + "/system_generated")
    else navigate("/invoice/details/" + data?.id)
  }

  useEffect(() => {

    if (data?.action_dates) {
      // console.log("DATES", data?.id, JSON.parse(data?.action_dates))
      setInvoiceActionDates(JSON.parse(data?.action_dates))

      switch (data?.status) {
        case "generated":
          setInvoiceStatus("generated");
          if (data?.action_dates) setInvoiceLastAction(JSON.parse(data?.action_dates).generated);
          break;
        case "paid":
          setInvoiceStatus("paid");
          if (data?.action_dates) setInvoiceLastAction(JSON.parse(data?.action_dates).paid);
          break;
        case "accepted":
          setInvoiceStatus("accepted");
          if (data?.action_dates) setInvoiceLastAction(JSON.parse(data?.action_dates).accepted);
          break;
        case "rejected":
          setInvoiceStatus("rejected");
          if (data?.action_dates) setInvoiceLastAction(JSON.parse(data?.action_dates).rejected);
          break;
        case "cancelled":
          setInvoiceStatus("cancelled");
          if (data?.action_dates) setInvoiceLastAction(JSON.parse(data?.action_dates).cancelled);
          break;
        case "created":
          setInvoiceStatus("created");
          if (data?.action_dates) setInvoiceLastAction(JSON.parse(data?.action_dates).created);
          break;
        case "requested":
          setInvoiceStatus("requested");
          if (data?.action_dates) setInvoiceLastAction(JSON.parse(data?.action_dates).requested);
          break;
        case "expired":
          setInvoiceStatus("expired");
          if (data?.action_dates) { JSON.parse(data?.action_dates).expired === "null" ? setInvoiceLastAction(data?.update_date) : setInvoiceLastAction(JSON.parse(data?.action_dates).expired); }
          break;
        case "paid1":
          setInvoiceStatus("paid");
          if (data?.action_dates) setInvoiceLastAction(JSON.parse(data?.action_dates).paid1);
          break;
        case "paid2":
          setInvoiceStatus("paid");
          if (data?.action_dates) setInvoiceLastAction(JSON.parse(data?.action_dates).paid2);
          break;
        case "missing1":
          setInvoiceStatus("missing payment");
          if (data?.action_dates) setInvoiceLastAction(JSON.parse(data?.action_dates).missing1);
          break;
        case "missing2":
          setInvoiceStatus("missing payment");
          if (data?.action_dates) setInvoiceLastAction(JSON.parse(data?.action_dates).missing2);
          break;

        default:
          setInvoiceLastAction("");
          break;
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // console.log("invoiceLastAction",differenceInDaysDate(new Date((invoiceLastAction))))

  return (
    <>
      <tr
        onClick={() => { invoiceClick() }}
        className={`border-b border-collapse cursor-pointer border-cNmSelect hover:bg-cGridView`} >
        <th className='px-s10 font-normal text-center border-r py-s10'>
          <span className=''>{index}</span>
        </th>

        {/* name with image */}
        <td className='border-r-[1px] px-s10 min-w-[180px] 2xl:min-w-[250px]'>
          <span className='flex items-center py-s10'>
            <span className='min-w-[50px]'>
              <Image cursorPointerClass="cursor-pointer" className='rounded-full w-w44 h-h44 grow-0' src={data?.user?.image} alt="" />
            </span>
            <Tooltip title={invoiceUserType === "system_generated" ? `${data?.school_name}` : data?.user?.name ?? ""}>
              <div className='font-fw600 ml-s5 text-cMainBlack lg:text-fs14 sm:text-fs12 max-w-[130px] 2xl:max-w-[200px] truncate'>
                {invoiceUserType === "system_generated" ? `${data?.school_name}` : data?.user?.name ?? <CommonEmptyStatus />}
              </div>
            </Tooltip>
          </span>
        </td>

        {/* email address */}
        <td className='p-s10 border-r-[1px] text-fs14 text-center text-cTextBody 
        min-w-[150px] max-w-[150px]
        2xl:min-w-[200px] 2xl:max-w-[200px]
        '>
          <Tooltip title={invoiceUserType === "system_generated" ? `${data?.school_email}` : data?.user?.email ?? ""}>
            <div className='truncate'>
              {invoiceUserType === "system_generated" ? `${data?.school_email}` : data?.user?.email ?? <CommonEmptyStatus />}
            </div>
          </Tooltip>
        </td>

        {/* user type  */}
        <td className='py-s10 border-r-[1px] px-s10 text-fs14 font-fw400 text-center min-w-[120px] text-cTextBody capitalize'>
          {invoiceUserType === "system_generated" ? `School` : data?.user?.role ?? <CommonEmptyStatus />}
        </td>

        {/* create date */}
        <td className='py-s10 border-r-[1px] px-s10 text-fs14 font-fw400 text-center min-w-[120px] text-cTextBody'>
          {data?.created_at === "null" ? <CommonEmptyStatus /> : formatDate(data?.created_at)}
        </td>

        <td className='p-s10 border-r-[1px] text-center min-w-[180px]'>
          {/* <span className='text-fs14 font-fw500 text-cMainBlack'>{formatDate(invoiceLastAction)}</span> <br></br> */}
          <span className='capitalize text-cImportantText test-fs12 font-fw400'>
            {invoiceLastAction ?
              <div className='font-fw400 text-cImportantText text-fs12'>
                {dateDiffCalendar(new Date(invoiceLastAction), new Date(), true)}{" ago"}
              </div> : <CommonEmptyStatus />}
          </span>
        </td>

        {/* status of the invoice */}
        <td className='p-s10 border-r-[1px] text-fs14 text-cTextBody relative min-w-[160px]'>
          <div className="flex items-center justify-center space-x-2.5">
            <div className='text-center capitalize text-cImportantText text-fs14'>{invoiceStatus}</div>
            <img className="" src={iRightArrow} alt="" />
          </div>
        </td>

      </tr>
    </>
  )
}


export default InvoiceTableRow;