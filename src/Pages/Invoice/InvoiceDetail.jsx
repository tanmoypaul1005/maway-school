import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useInvoiceStore, { getInvoiceDetails } from '../../App/Stores/InvoiceStore.js';
import useLayoutStore from '../../App/Stores/LayoutStore.js';
import { iShareBlue, iShareWhite } from '../../App/Utility/source.js';
import { dateDiffCalendar, PageTitle, roughLicenseDurationFormatter } from '../../App/Utility/UtilityFunctions.js';
import CommonButtonOutlined from '../../Components/Button/CommonButtonOutlined.jsx';
import LessonsCard from '../../Components/CommonDetailPage/LessonsCard.jsx';
import InvoiceComment2 from '../../Components/CommonInvoice/InvoiceComment2';
import InvoiceProfile from '../../Components/CommonInvoice/InvoiceProfile';
import InvoiceStatus from '../../Components/CommonInvoice/InvoiceStatus';
import BackLink from '../../Components/Pagination/BackLink';
import CommonTitle from '../../Components/Title/CommonTitle';
import { formatDate } from '../../Utility/UtilityFunctions.js';
import InvoiceReply from './InvoiceReply.jsx';
import NewInvoiceInfoCard from '../MawaySchoolWeb/invoice/NewInvoiceInfoCard.jsx';
import NewInvoiceCommentArea from '../MawaySchoolWeb/invoice/NewInvoiceCommentArea.jsx';

const InvoiceSchoolDetail = () => {

    const { setBarTitle } = useLayoutStore();

    const { invoiceDetailsData, setShowInvoiceShareModal, setInvoiceShareID, setInvoiceShareForm, resetInvoiceShareForm } = useInvoiceStore();

    const [liDuration, setLiDuration] = useState(0);

    const { invoice_id, instructor_id, student_id, school_id, school_user_id, invoice_type } = useParams();

    const location = useLocation();

    useEffect(() => {
        FetchInvoiceDetails();
    }, [invoice_id])

    const FetchInvoiceDetails = async () => {
        // get invoice details data
        await getInvoiceDetails(invoice_id, invoice_type);
    }

    useEffect(() => {
        PageTitle(t("Order Details"));
        setBarTitle("Order Details");
        resetInvoiceShareForm();
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
        setLiDuration(dateDiffCalendar(invoiceDetailsData?.purchase_lisence?.start_time ?? new Date(), invoiceDetailsData?.purchase_lisence?.end_time));
    }, [invoiceDetailsData])

    // console.log("invoice_type",invoice_type)

    return (
        <div>
            <div>
                <div className="mx-s12 md:mx-s32">
                    <div className="flex justify-between items-baseline">
                        <CommonTitle title="Order Details" onClick={() => console.log("invoiceDetailsData:::", invoiceDetailsData)}>
                            {
                                location.pathname === `/invoice/details/${invoice_id}` && <BackLink linksArray={[
                                    { label: "Orders", linkTo: "/invoice" },
                                    { label: "Order Details", linkTo: "" }
                                ]} />
                            }
                            {
                                location.pathname === `/invoice/details/${invoice_id}/${invoice_type}` && <BackLink linksArray={[
                                    { label: "Orders", linkTo: "/invoice" },
                                    { label: "Order Details", linkTo: "" }
                                ]} />
                            }
                            {
                                location.pathname === `/instructor/details/${instructor_id}/invoice/${invoice_id}` && <BackLink linksArray={[
                                    { label: "Instructor ", linkTo: "/instructor" },
                                    { label: "Instructor Details", linkTo: `/instructor/details/${instructor_id}` },
                                    { label: "Orders", linkTo: `/instructor/details/${instructor_id}/invoice` },
                                    { label: "Order Details", linkTo: `` }
                                ]}
                                />
                            }
                            {
                                location.pathname === `/student/details/${student_id}/invoice/${invoice_id}` && <BackLink linksArray={[
                                    { label: "Student", linkTo: "/student" },
                                    { label: "Student Details", linkTo: `/student/details/${student_id}` },
                                    { label: "Orders", linkTo: `/student/details/${student_id}/invoice` },
                                    { label: "Order Details", linkTo: `` }
                                ]}
                                />
                            }

                            {
                                location.pathname === `/school/details/${school_id}/invoice/${school_user_id}/details/${invoice_id}` && <BackLink linksArray={[
                                    { label: "School ", linkTo: "/school" },
                                    { label: "School profile", linkTo: `/school/details/${school_id}` },
                                    { label: "Orders", linkTo: `/school/details/${school_id}/invoice/${school_user_id}` },
                                    { label: "Order Details", linkTo: `` }
                                ]}
                                />
                            }
                        </ CommonTitle >

                        <CommonButtonOutlined
                            btnLabel='share order'
                            onClick={() => {
                                // resetInvoiceShareForm();
                                setShowInvoiceShareModal(true);
                                setInvoiceShareForm({
                                    id: invoiceDetailsData?.id,
                                    user_id: invoice_type === "system_generated" && invoiceDetailsData?.school_info?.user_id || invoiceDetailsData?.purchase_lisence?.user_id,
                                    role: invoice_type === "system_generated" && "school" || invoiceDetailsData?.role,
                                    type: invoice_type === "system_generated" && "freepay_school" || "admin_invoice",
                                })
                                console.log("data:::", invoiceDetailsData);
                                setInvoiceShareID(invoice_id);
                            }}
                            width={"w-[180px]"}
                            colorType='primary'
                            iconRight={iShareBlue}
                            iconRightHover={iShareWhite}
                        />
                    </div>

                    {/* B:      main details part */}
                    <div className="bg-cBrandColor2 rounded-br20">
                        <div className="rounded-lg bg-cBrandColor2 px-s20 pt-s20">
                            {/* G:      profile details */}
                            <InvoiceProfile />

                            <div className='my-5 w-full bg-cBackgroundAndCategory h-s1'></div>

                            <InvoiceStatus />

                            <div className='my-5 w-full bg-cBackgroundAndCategory h-s1'></div>

                            <div className="pb-5 space-y-5 xl:flex xl:flex-row-reverse xl:justify-between xl:space-y-0">
                                {invoice_type === "system_generated" ?
                                    <div className='w-full max-w-[400px] min-w-[350px]'>
                                        <NewInvoiceInfoCard
                                            title={"Payment Details"}

                                            content={[
                                                {
                                                    label: "Invoice ID",
                                                    value: invoiceDetailsData?.invoice_id ?? "NA"
                                                },
                                                {
                                                    label: "Total student payment",
                                                    value: invoiceDetailsData?.amount ? "DKK " + invoiceDetailsData?.amount : "DKK 0"
                                                },
                                            ]}
                                            momsTitle={"Transaction fee ( 1% of " + invoiceDetailsData?.amount + " )"}
                                            momsValue={invoiceDetailsData?.transaction_fee}
                                            totalValue={invoiceDetailsData?.total_amount}
                                            withPdfDlButton= {true}
                                            pdfDownloadLink={invoiceDetailsData?.transaction_pdf}

                                        // withPdfDlButton={invoiceInfoCardData?.withPdfDlButton}
                                        // editableTotalPrice={invoiceInfoCardData?.editableTotalPrice}

                                        // OnEditTotalPrice={() => setShowInvoiceUpdateModal(true)}
                                        />
                                    </div>
                                    :
                                    <div>
                                        <div className="text-fs16 font-fw600 pb-s15">
                                            License Details
                                        </div>
                                        <LessonsCard
                                            showFullDetails={true}
                                            title={invoiceDetailsData?.lisence_title}
                                            status={invoiceDetailsData?.status}
                                            packageDuration={roughLicenseDurationFormatter(invoiceDetailsData?.duration_in_days)}
                                            price={invoiceDetailsData?.price}
                                            momsValue={invoiceDetailsData?.moms}
                                            includedMoms={true}
                                            startDate={invoiceDetailsData?.purchase_lisence?.start_time ? formatDate(invoiceDetailsData?.purchase_lisence?.start_time) : "NA"}
                                            endDate={invoiceDetailsData?.purchase_lisence?.end_time ? formatDate(invoiceDetailsData?.purchase_lisence?.end_time) : "NA"}
                                            purchaseDuration={liDuration ? liDuration : "NA"}
                                            licenseDetails={invoiceDetailsData?.lisence?.details}
                                        />
                                    </div>}

                                <div className='flex flex-col max-h-[5220px] w-s1 bg-cBackgroundAndCategory mx-5'></div>

                                <div className='pr-5 w-full max-w-[700px]'>
                                    {
                                        invoice_type === "system_generated" ?
                                            <NewInvoiceCommentArea />
                                            : <>
                                                <InvoiceComment2 />
                                                <div className='my-s20'></div>
                                                <InvoiceReply />
                                            </>
                                    }
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    );
};

export default InvoiceSchoolDetail;