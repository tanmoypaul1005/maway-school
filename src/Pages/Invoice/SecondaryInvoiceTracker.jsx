import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useInvoiceStore from '../../App/Stores/InvoiceStore';

function SecondaryInvoiceTracker({ invoiceType }) {

    const { secondaryInvoiceDetailsData } = useInvoiceStore();
    const [trackerData, setTrackerData] = useState([]);

    const { invoice_type } = useParams();

    useEffect(() => {

        setTrackerData([
            // e    requested  
            {
                userType: invoice_type === "admission_invoice" ? "Student" : invoice_type === "instructor_invoice" ? "Instructor" : secondaryInvoiceDetailsData?.role,
                statusType: "requested",
                headerRight: true,
                leftLineActive: true,
                rightLineActive: (secondaryInvoiceDetailsData?.action_dates?.created !== "null" || secondaryInvoiceDetailsData?.action_dates?.rejected !== "null" || secondaryInvoiceDetailsData?.action_dates?.cancelled !== "null") ? true : false,
                isActive: secondaryInvoiceDetailsData?.action_dates?.requested === "null" ? false : true,
                date: secondaryInvoiceDetailsData?.action_dates?.requested ?? "NA",
                isHidden: invoice_type === "instructor_invoice" ? true : false
            },
            // e    created  
            {
                userType: invoice_type === "admission_invoice" ? "school" : invoice_type === "instructor_invoice" ? "Instructor" : "Admin",
                statusType: "created",
                headerRight: true,
                leftLineActive: false,
                rightLineActive: (invoice_type === "admission_invoice" && secondaryInvoiceDetailsData?.action_dates?.accepted !== "null") || secondaryInvoiceDetailsData?.action_dates?.paid1 !== "null" || secondaryInvoiceDetailsData?.action_dates?.rejected !== "null" || secondaryInvoiceDetailsData?.action_dates?.cancelled !== "null" ? true : false,
                isActive: secondaryInvoiceDetailsData?.action_dates?.created === "null" ? false : true,
                date: secondaryInvoiceDetailsData?.action_dates?.created ?? "NA",
                isHidden: ((secondaryInvoiceDetailsData?.action_dates?.cancelled !== "null" && secondaryInvoiceDetailsData?.action_dates?.created === "null") || (secondaryInvoiceDetailsData?.action_dates?.rejected !== "null" && secondaryInvoiceDetailsData?.action_dates?.created === "null")) ? true : false,
            },

            // g    paid 1  
            {
                userType: invoice_type === "admission_invoice" ? "Student" : invoice_type === "instructor_invoice" ? "school" : secondaryInvoiceDetailsData?.role,
                statusType: "paid",
                headerRight: true,
                leftLineActive: false,
                rightLineActive: secondaryInvoiceDetailsData?.action_dates?.accepted !== "null" || secondaryInvoiceDetailsData?.action_dates?.rejected !== "null" || secondaryInvoiceDetailsData?.action_dates?.missing1 !== "null" ? true : false,
                isActive: secondaryInvoiceDetailsData?.action_dates?.paid1 === "null" ? false : true,
                date: secondaryInvoiceDetailsData?.action_dates?.paid1 ?? "NA",
                isHidden: (invoice_type === "admission_invoice" || (secondaryInvoiceDetailsData?.action_dates?.paid1 === "null" && secondaryInvoiceDetailsData?.action_dates?.rejected !== "null") || secondaryInvoiceDetailsData?.action_dates?.cancelled !== "null") ? true : false,
            },

            // p    missing 1  
            {
                userType: invoice_type === "admission_invoice" ? "School" : invoice_type === "instructor_invoice" ? "instructor" : "Admin",
                statusType: "Missing payment",
                headerRight: true,
                leftLineActive: false,
                rightLineActive: secondaryInvoiceDetailsData?.action_dates?.paid2 !== "null" || secondaryInvoiceDetailsData?.action_dates?.rejected !== "null" ? true : false,
                date: secondaryInvoiceDetailsData?.action_dates?.missing1 ?? "NA",
                isActive: secondaryInvoiceDetailsData?.action_dates?.missing1 === "null" ? false : true,
                isHidden: secondaryInvoiceDetailsData?.action_dates?.missing1 === "null" || secondaryInvoiceDetailsData?.action_dates?.cancelled !== "null" ? true : false,
            },

            // g    paid 2  
            {
                userType: invoice_type === "admission_invoice" ? "Student" : invoice_type === "instructor_invoice" ? "school" : secondaryInvoiceDetailsData?.role,
                statusType: "paid",
                headerRight: true,
                leftLineActive: false,
                rightLineActive: secondaryInvoiceDetailsData?.action_dates?.missing2 !== "null" || secondaryInvoiceDetailsData?.action_dates?.rejected !== "null" || secondaryInvoiceDetailsData?.action_dates?.accepted !== "null" ? true : false,
                date: secondaryInvoiceDetailsData?.action_dates?.paid2 ?? "NA",
                isActive: secondaryInvoiceDetailsData?.action_dates?.paid2 === "null" ? false : true,
                isHidden: secondaryInvoiceDetailsData?.action_dates?.missing1 === "null" || secondaryInvoiceDetailsData?.action_dates?.cancelled !== "null" || secondaryInvoiceDetailsData?.action_dates?.paid2 === "null" ? true : false,
            },

            // p    missing 2  
            {
                userType: invoice_type === "admission_invoice" ? "School" : invoice_type === "instructor_invoice" ? "instructor" : "Admin",
                statusType: "missing payment",
                headerRight: (secondaryInvoiceDetailsData?.action_dates?.rejected === "null" && secondaryInvoiceDetailsData?.action_dates?.cancelled === "null") || (secondaryInvoiceDetailsData?.action_dates?.rejected !== "null" && secondaryInvoiceDetailsData?.action_dates?.created !== "null") ? true : false,
                leftLineActive: false,
                rightLineActive: ((secondaryInvoiceDetailsData?.action_dates?.rejected !== "null" && secondaryInvoiceDetailsData?.action_dates?.missing2 !== "null") || (secondaryInvoiceDetailsData?.action_dates?.accepted !== "null" && secondaryInvoiceDetailsData?.action_dates?.missing2 !== "null")) ? true : false,
                isActive: secondaryInvoiceDetailsData?.action_dates?.missing2 === "null" ? false : true,
                isHidden: secondaryInvoiceDetailsData?.action_dates?.missing2 === "null" ? true : false,
                date: secondaryInvoiceDetailsData?.action_dates?.missing2 ?? "NA"
            },

            // l    accepted  
            {
                userType: invoice_type === "admission_invoice" ? "School" : invoice_type === "instructor_invoice" ? "instructor" : "Admin",
                statusType: "accepted",
                headerRight: false,
                leftLineActive: false,
                rightLineActive: false,
                isActive: secondaryInvoiceDetailsData?.action_dates?.accepted === "null" ? false : true,
                isHidden: secondaryInvoiceDetailsData?.action_dates?.cancelled !== "null" ? true : secondaryInvoiceDetailsData?.action_dates?.rejected !== "null" ? true : (secondaryInvoiceDetailsData?.action_dates?.rejected !== "null" && secondaryInvoiceDetailsData?.action_dates?.created !== "null" && secondaryInvoiceDetailsData?.action_dates?.missing2 !== "null") ? true : ((secondaryInvoiceDetailsData?.action_dates?.rejected === "null" && secondaryInvoiceDetailsData?.action_dates?.cancelled === "null") || (secondaryInvoiceDetailsData?.action_dates?.missing2 !== "null" && secondaryInvoiceDetailsData?.action_dates?.accepted === "null")) ? false : false,
                date: secondaryInvoiceDetailsData?.action_dates?.accepted ?? "NA"
            },

            // r    rejected 
            {
                userType: invoice_type === "admission_invoice" ? "School" : invoice_type === "instructor_invoice" ? "school" : "Admin",
                statusType: "rejected",
                headerRight: false,
                leftLineActive: false,
                rightLineActive: false,
                isActive: secondaryInvoiceDetailsData?.action_dates?.rejected !== "null" ? true : false,
                isHidden: secondaryInvoiceDetailsData?.action_dates?.rejected === "null" ? true : false,
                date: secondaryInvoiceDetailsData?.action_dates?.rejected ?? "NA"
            },

            // y    cancelled 
            {
                userType: invoice_type === "admission_invoice" ? "Student" : invoice_type === "instructor_invoice" ? "instructor" : secondaryInvoiceDetailsData?.role,
                statusType: "cancelled",
                headerRight: false,
                leftLineActive: false,
                rightLineActive: false,
                isActive: secondaryInvoiceDetailsData?.action_dates?.cancelled !== "null" ? true : false,
                isHidden: secondaryInvoiceDetailsData?.action_dates?.cancelled === "null" ? true : false,
                date: secondaryInvoiceDetailsData?.action_dates?.cancelled ?? "NA"
            },
        ]);

    }, [secondaryInvoiceDetailsData]);

    return (
        <div>
            <div className="pb-5 font-bold text-fs16">Order status</div>
            <div
                onClick={() => console.log("trackerData", trackerData[0], typeof (trackerData))}
                className={`flex justify-center pt-[36px] h-[115px] _bg-emerald-400 pl-[36px] w-full
                ${secondaryInvoiceDetailsData?.action_dates?.missing2 === "null" ? "pr-[45px]" : "pr-[40px]"}
                ${secondaryInvoiceDetailsData?.action_dates?.rejected !== "null" ? "pr-[45px]" : ""}                
             `}>
                {trackerData.map((item, index) => {
                    return <div key={index} className={`
                    ${item?.isHidden ? "" : item.headerRight ? "w-full" : item.userType ? "w-[0px]" : ""}
                    ${invoiceType === "instructor_invoice" && item.statusType === "requested" ? "hidden" : ""}
                `}>
                        {item?.isHidden ? "" :
                            <div key={index} className="">
                                <div className='flex items-center w-full'>

                                    <div className='relative'>
                                        <div className={`${item.isActive ? "bg-cBrandColor" : "bg-cChipBorder"} h-s16 w-s16 rounded-full`}></div>

                                        {/* top title */}
                                        <div style={{}} className='absolute -top-[36px] left-0 capitalize -translate-x-[52px] w-[120px] text-center text-fs16 font-semibold text-cHighlighted'>{item.userType}</div>

                                        {/* bottom data */}
                                        <div className={`absolute left-0 text-center -bottom-[39px] w-[140px] -translate-x-[62px]`}>
                                            <div className='text-center capitalize text-fs16 font-fw600 text-cHighlighted'>{item.statusType}</div>
                                        </div>
                                        {(item?.date === null || item?.date === "null") ? "" :
                                            <div className="absolute -bottom-[65px] w-[120px] left-0 -translate-x-[52px] text-center">
                                                <div className='text-center text-fs14 text-cHighlighted mt-s5'>{item?.date}</div>
                                            </div>
                                        }

                                    </div>

                                    {item.headerRight ? <div className={`h-s4 w-full ${item.rightLineActive ? "bg-cBrandColor" : "bg-cChipBorder"} `}>
                                    </div> : ""}

                                </div>

                            </div>}

                    </div>
                })}
            </div>
        </div>
    );
};

export default SecondaryInvoiceTracker
