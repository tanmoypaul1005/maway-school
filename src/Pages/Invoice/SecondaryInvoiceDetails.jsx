import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import useInvoiceStore, { getSecondaryInvoiceDetails } from '../../App/Stores/InvoiceStore';
import useLayoutStore from '../../App/Stores/LayoutStore';
import { iShareBlue, iShareWhite } from '../../App/Utility/source';
import { dateDiffCalendar, roughLicenseDurationFormatter } from '../../App/Utility/UtilityFunctions';
import CommonButtonOutlined from '../../Components/Button/CommonButtonOutlined';
import LessonsCard from '../../Components/CommonDetailPage/LessonsCard';
import BackLink from '../../Components/Pagination/BackLink';
import CommonTitle from '../../Components/Title/CommonTitle';
import { formatDate, PageTitle } from '../../Utility/UtilityFunctions';
import SecondaryInvoiceComments from './SecondaryInvoiceComments';
import SecondaryInvoiceItem from './SecondaryInvoiceItem';
import SecondaryInvoiceProfile from './SecondaryInvoiceProfile';
import SecondaryInvoiceReply from './SecondaryInvoiceReply';
import SecondaryInvoiceTracker from './SecondaryInvoiceTracker';
import SecondaryStudentLesson from './SecondaryStudentLesson';

function SecondaryInvoiceDetails() {

    const { setBarTitle } = useLayoutStore();

    const { secondaryInvoiceDetailsData, resetInvoiceShareForm, setShowInvoiceShareModal, setInvoiceShareForm, setInvoiceShareID } = useInvoiceStore();

    // p    MAIN COMMENT OBJECT
    const [commentObject, setCommentObject] = useState({
        // g        request         
        requestCommentFrom: "",
        requestCommentMessage: "",
        requestCommentDate: "",

        // b            create      
        createCommentFrom: "",
        createCommentMessage: "",
        createCommentDate: "",

        // e            paid1      
        paid1CommentFrom: "",
        paid1CommentMessage: "",
        paid1CommentDate: "",
        paid1Attachment: "",

        // p            missing1      
        missing1CommentFrom: "",
        missing1CommentMessage: "",
        missing1CommentDate: "",

        // e            paid2      
        paid2CommentFrom: "",
        paid2CommentMessage: "",
        paid2CommentDate: "",
        paid2Attachment: "",

        // p            missing2      
        missing2CommentFrom: "",
        missing2CommentMessage: "",
        missing2CommentDate: "",

        // l            accept      
        acceptCommentFrom: "",
        acceptCommentMessage: "",
        acceptCommentDate: "",

        // r            reject      
        rejectCommentFrom: "",
        rejectCommentMessage: "",
        rejectCommentDate: "",

        // y            cancel      
        cancelCommentFrom: "",
        cancelCommentMessage: "",
        cancelCommentDate: "",
    });

    const [liDuration, setLiDuration] = useState(0);
    const [basicUserData, setBasicUserData] = useState({
        cvr: 0,
        email: "NA",
        image: "NA",
        name: "NA",
        phone: "NA",
        joined: "NA",
        profileLink: "NA",
    });
    const [backLinkArray, setBackLinkArray] = useState([]);


    const { invoice_id, instructor_id, student_id, school_id, school_user_id, instructor_user_id, invoice_type } = useParams();

    const location = useLocation();

    useEffect(() => {
        FetchInvoiceData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoice_id])

    const FetchInvoiceData = async () => {
        // get invoice details data
        await getSecondaryInvoiceDetails(invoice_id, invoice_type);
    }

    useEffect(() => {
        PageTitle(t("Order Details"));
        setBarTitle("Order Details");
        resetInvoiceShareForm();
        window.scrollTo(0, 0);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        setLiDuration(dateDiffCalendar(secondaryInvoiceDetailsData?.purchase_lisence?.start_time ?? new Date(), secondaryInvoiceDetailsData?.purchase_lisence?.end_time));
    }, [secondaryInvoiceDetailsData])

    useEffect(() => {
        switch (location.pathname) {

            // e         for instructor         
            case `/instructor/details/${instructor_id}/invoice/${instructor_user_id}/details/${invoice_id}/${invoice_type}`:
                setBackLinkArray([
                    { label: "Instructor ", linkTo: "/instructor" },
                    { label: "Instructor Details", linkTo: `/instructor/details/${instructor_id}` },
                    { label: "Orders", linkTo: `/instructor/details/${instructor_id}/invoice/${instructor_user_id}` },
                    { label: "Order Details", linkTo: `` }
                ]);

                if (invoice_type === "instructor_invoice") {
                    // p        for instructor -> school       
                    // setShowLessonPanel(true);
                    setBasicUserData({
                        email: secondaryInvoiceDetailsData?.school_email,
                        image: secondaryInvoiceDetailsData?.school_image,
                        name: secondaryInvoiceDetailsData?.school_name,
                        phone: secondaryInvoiceDetailsData?.school_phone,
                        joined: secondaryInvoiceDetailsData?.school_joined_date,
                        profileLink: "/school/details/" + secondaryInvoiceDetailsData?.school_id,
                    });

                    //  r           set invoice comments        
                    setCommentObject({
                        // g        request         
                        requestCommentFrom: "",
                        requestCommentMessage: "",
                        requestCommentDate: "",

                        // b            create      
                        createCommentFrom: "instructor comment",
                        createCommentMessage: secondaryInvoiceDetailsData?.instructor_note === "null" || secondaryInvoiceDetailsData?.instructor_note === null ? "" : secondaryInvoiceDetailsData?.instructor_note,
                        createCommentDate: secondaryInvoiceDetailsData?.action_dates?.created === "null" || secondaryInvoiceDetailsData?.action_dates?.created === null ? "" : secondaryInvoiceDetailsData?.action_dates?.created,

                        // e            paid1      
                        paid1CommentFrom: "school comment",
                        paid1CommentMessage: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.payment_details : "",

                        paid1CommentDate: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.created_at_formated ?? "" : "",

                        paid1Attachment: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.attachment : "",


                        // p            missing1      
                        missing1CommentFrom: "instructor comment",
                        missing1CommentMessage:
                            secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ?
                                (secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.reply === "null" || secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.reply === null) ? ""
                                    : secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.reply
                                : "",
                        missing1CommentDate:
                            secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ?
                                (secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.reply === "null" || secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.reply === null) ? ""
                                    : secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.updated_at_formated
                                : "",
                        // e            paid2      
                        paid2CommentFrom: "school comment",
                        paid2CommentMessage: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.payment_details : "",
                        paid2CommentDate: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.created_at_formated ?? "" : "",
                        paid2Attachment: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.attachment : "",

                        // p            missing2      
                        missing2CommentFrom: "instructor comment",
                        missing2CommentMessage:
                            secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ?
                                (secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.reply === "null" || secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.reply === null) ? ""
                                    : secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.reply
                                : "",

                        missing2CommentDate:
                            secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ?
                                (secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.reply === "null" || secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.reply === null) ? ""
                                    : secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.updated_at_formated
                                : "",

                        // l            accept      
                        acceptCommentFrom: "school comment",
                        acceptCommentMessage: secondaryInvoiceDetailsData?.a_r_c_note,
                        acceptCommentDate:
                            secondaryInvoiceDetailsData?.action_dates?.accepted === "null" || secondaryInvoiceDetailsData?.action_dates?.accepted === null ? ""
                                : secondaryInvoiceDetailsData?.action_dates?.accepted,

                        // r            reject      
                        rejectCommentFrom: "school comment",
                        rejectCommentMessage: secondaryInvoiceDetailsData?.a_r_c_note,
                        rejectCommentDate:
                            secondaryInvoiceDetailsData?.action_dates?.rejected === "null" || secondaryInvoiceDetailsData?.action_dates?.rejected === null ? ""
                                : secondaryInvoiceDetailsData?.action_dates?.rejected,


                        // y            cancel      
                        cancelCommentFrom: "instructor comment",
                        cancelCommentMessage: secondaryInvoiceDetailsData?.a_r_c_note,
                        cancelCommentDate:
                            secondaryInvoiceDetailsData?.action_dates?.cancelled === "null" || secondaryInvoiceDetailsData?.action_dates?.cancelled === null ? ""
                                : secondaryInvoiceDetailsData?.action_dates?.cancelled,
                    });

                } else if (invoice_type === "license_invoice") {
                    // p        for instructor -> admin       
                    // setShowLessonPanel(false);
                    setBasicUserData({
                        cvr: secondaryInvoiceDetailsData?.cvr,
                        email: secondaryInvoiceDetailsData?.email,
                        image: secondaryInvoiceDetailsData?.image,
                        name: secondaryInvoiceDetailsData?.user_name,
                        phone: secondaryInvoiceDetailsData?.phone,
                        joined: secondaryInvoiceDetailsData?.user_joined_date,
                        profileLink: "/instructor/details/" + secondaryInvoiceDetailsData?.scl_ins_id,
                    });

                    //  r           set invoice comments        
                    setCommentObject({
                        // g        request         
                        requestCommentFrom: "instructor comment",
                        requestCommentMessage: secondaryInvoiceDetailsData?.request_comment === "null" || secondaryInvoiceDetailsData?.request_comment === null ? "" : secondaryInvoiceDetailsData?.request_comment,
                        requestCommentDate: secondaryInvoiceDetailsData?.action_dates?.requested === "null" || secondaryInvoiceDetailsData?.action_dates?.requested === null ? "" : secondaryInvoiceDetailsData?.action_dates?.requested,

                        // b            create      
                        createCommentFrom: "admin comment",
                        createCommentMessage: secondaryInvoiceDetailsData?.invoice_comment === "null" || secondaryInvoiceDetailsData?.invoice_comment === null ? "" : secondaryInvoiceDetailsData?.invoice_comment,
                        createCommentDate: secondaryInvoiceDetailsData?.action_dates?.created === "null" || secondaryInvoiceDetailsData?.action_dates?.created === null ? "" : secondaryInvoiceDetailsData?.action_dates?.created,

                        // e            paid1      
                        paid1CommentFrom: "instructor comment",
                        paid1CommentMessage: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.payment_details : "",

                        paid1CommentDate: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.created_at_formated ?? "" : "",

                        paid1Attachment: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.attachment : "",


                        // p            missing1      
                        missing1CommentFrom: "admin comment",
                        missing1CommentMessage:
                            secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ?
                                (secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.reply === "null" || secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.reply === null) ? ""
                                    : secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.reply
                                : "",
                        missing1CommentDate:
                            secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ?
                                (secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.reply === "null" || secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.reply === null) ? ""
                                    : secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.updated_at_formated
                                : "",
                        // e            paid2      
                        paid2CommentFrom: "instructor comment",
                        paid2CommentMessage: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.payment_details : "",
                        paid2CommentDate: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.created_at_formated ?? "" : "",
                        paid2Attachment: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.attachment : "",

                        // p            missing2      
                        missing2CommentFrom: "admin comment",
                        missing2CommentMessage:
                            secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ?
                                (secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.reply === "null" || secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.reply === null) ? ""
                                    : secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.reply
                                : "",

                        missing2CommentDate:
                            secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ?
                                (secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.reply === "null" || secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.reply === null) ? ""
                                    : secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.updated_at_formated
                                : "",

                        // l            accept      
                        acceptCommentFrom: "admin comment",
                        acceptCommentMessage: secondaryInvoiceDetailsData?.a_r_c_note,
                        acceptCommentDate:
                            secondaryInvoiceDetailsData?.action_dates?.accepted === "null" || secondaryInvoiceDetailsData?.action_dates?.accepted === null ? ""
                                : secondaryInvoiceDetailsData?.action_dates?.accepted,

                        // r            reject      
                        rejectCommentFrom: "admin comment",
                        rejectCommentMessage: secondaryInvoiceDetailsData?.a_r_c_note,
                        rejectCommentDate:
                            secondaryInvoiceDetailsData?.action_dates?.rejected === "null" || secondaryInvoiceDetailsData?.action_dates?.rejected === null ? ""
                                : secondaryInvoiceDetailsData?.action_dates?.rejected,


                        // y            cancel      
                        cancelCommentFrom: "instructor comment",
                        cancelCommentMessage: secondaryInvoiceDetailsData?.a_r_c_note,
                        cancelCommentDate:
                            secondaryInvoiceDetailsData?.action_dates?.cancelled === "null" || secondaryInvoiceDetailsData?.action_dates?.cancelled === null ? ""
                                : secondaryInvoiceDetailsData?.action_dates?.cancelled,
                    });

                }
                break;

            // b           for school           
            case `/school/details/${school_id}/invoice/${school_user_id}/details/${invoice_id}/${invoice_type}`:
                setBackLinkArray([
                    { label: "School ", linkTo: "/school" },
                    { label: "School profile", linkTo: `/school/details/${school_id}` },
                    { label: "Orders", linkTo: `/school/details/${school_id}/invoice/${school_user_id}` },
                    { label: "Order Details", linkTo: `` }
                ]);

                if (invoice_type === "admission_invoice") {
                    // p        for student -> school       
                    // setShowLessonPanel(true);
                    setBasicUserData({
                        email: secondaryInvoiceDetailsData?.student_email,
                        image: secondaryInvoiceDetailsData?.student_photo,
                        name: secondaryInvoiceDetailsData?.student_name,
                        phone: secondaryInvoiceDetailsData?.student_phone === "null" ? "NA" : secondaryInvoiceDetailsData?.student_phone,
                        joined: secondaryInvoiceDetailsData?.student_joined_date,
                        profileLink: "/student/details/" + secondaryInvoiceDetailsData?.student_id,
                    });

                    //  r           set invoice comments        
                    setCommentObject({
                        // g        request         
                        requestCommentFrom: "student comment",
                        requestCommentMessage: secondaryInvoiceDetailsData?.student_note === "null" || secondaryInvoiceDetailsData?.student_note === null ? "" : secondaryInvoiceDetailsData?.student_note,
                        requestCommentDate: secondaryInvoiceDetailsData?.action_dates?.requested === "null" || secondaryInvoiceDetailsData?.action_dates?.requested === null ? "" : secondaryInvoiceDetailsData?.action_dates?.requested,

                        // b            create      
                        createCommentFrom: "school comment",
                        createCommentMessage: secondaryInvoiceDetailsData?.invoice_note === "null" || secondaryInvoiceDetailsData?.invoice_note === null ? "" : secondaryInvoiceDetailsData?.invoice_note,
                        createCommentDate: secondaryInvoiceDetailsData?.action_dates?.created === "null" || secondaryInvoiceDetailsData?.action_dates?.created === null ? "" : secondaryInvoiceDetailsData?.action_dates?.created,

                        // e            paid1      
                        paid1CommentFrom: "student comment",
                        paid1CommentMessage: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.payment_details : "",

                        paid1CommentDate: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.created_at_formated ?? "" : "",

                        paid1Attachment: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.attachment : "",


                        // p            missing1      
                        missing1CommentFrom: "school comment",
                        missing1CommentMessage:
                            secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ?
                                (secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.reply === "null" || secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.reply === null) ? ""
                                    : secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.reply
                                : "",
                        missing1CommentDate:
                            secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ?
                                (secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.reply === "null" || secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.reply === null) ? ""
                                    : secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.updated_at_formated
                                : "",
                        // e            paid2      
                        paid2CommentFrom: "student comment",
                        paid2CommentMessage: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.payment_details : "",
                        paid2CommentDate: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.created_at_formated ?? "" : "",
                        paid2Attachment: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.attachment : "",

                        // p            missing2      
                        missing2CommentFrom: "school comment",
                        missing2CommentMessage:
                            secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ?
                                (secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.reply === "null" || secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.reply === null) ? ""
                                    : secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.reply
                                : "",

                        missing2CommentDate:
                            secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ?
                                (secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.reply === "null" || secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.reply === null) ? ""
                                    : secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.updated_at_formated
                                : "",

                        // l            accept      
                        acceptCommentFrom: "school comment",
                        acceptCommentMessage: secondaryInvoiceDetailsData?.a_r_c_note,
                        acceptCommentDate:
                            secondaryInvoiceDetailsData?.action_dates?.accepted === "null" || secondaryInvoiceDetailsData?.action_dates?.accepted === null ? ""
                                : secondaryInvoiceDetailsData?.action_dates?.accepted,

                        // r            reject      
                        rejectCommentFrom: "school comment",
                        rejectCommentMessage: secondaryInvoiceDetailsData?.a_r_c_note,
                        rejectCommentDate:
                            secondaryInvoiceDetailsData?.action_dates?.rejected === "null" || secondaryInvoiceDetailsData?.action_dates?.rejected === null ? ""
                                : secondaryInvoiceDetailsData?.action_dates?.rejected,


                        // y            cancel      
                        cancelCommentFrom: "student comment",
                        cancelCommentMessage: secondaryInvoiceDetailsData?.a_r_c_note,
                        cancelCommentDate:
                            secondaryInvoiceDetailsData?.action_dates?.cancelled === "null" || secondaryInvoiceDetailsData?.action_dates?.cancelled === null ? ""
                                : secondaryInvoiceDetailsData?.action_dates?.cancelled,
                    });

                }
                else if (invoice_type === "instructor_invoice") {
                    // p        for instructor -> school       
                    // setShowLessonPanel(true);
                    setBasicUserData({
                        email: secondaryInvoiceDetailsData?.instructor_email,
                        image: secondaryInvoiceDetailsData?.instructor_photo,
                        name: secondaryInvoiceDetailsData?.instructor_name,
                        phone: secondaryInvoiceDetailsData?.instructor_phone,
                        joined: secondaryInvoiceDetailsData?.instructor_joined_date,
                        profileLink: "/instructor/details/" + secondaryInvoiceDetailsData?.instructor_id,
                    });

                    //  r           set invoice comments        
                    setCommentObject({
                        // g        request         
                        requestCommentFrom: "",
                        requestCommentMessage: "",
                        requestCommentDate: "",

                        // b            create      
                        createCommentFrom: "instructor comment",
                        createCommentMessage: secondaryInvoiceDetailsData?.instructor_note === "null" || secondaryInvoiceDetailsData?.instructor_note === null ? "" : secondaryInvoiceDetailsData?.instructor_note,
                        createCommentDate: secondaryInvoiceDetailsData?.action_dates?.created === "null" || secondaryInvoiceDetailsData?.action_dates?.created === null ? "" : secondaryInvoiceDetailsData?.action_dates?.created,

                        // e            paid1      
                        paid1CommentFrom: "school comment",
                        paid1CommentMessage: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.payment_details : "",

                        paid1CommentDate: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.created_at_formated ?? "" : "",

                        paid1Attachment: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.attachment : "",


                        // p            missing1      
                        missing1CommentFrom: "instructor comment",
                        missing1CommentMessage:
                            secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ?
                                (secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.reply === "null" || secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.reply === null) ? ""
                                    : secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.reply
                                : "",
                        missing1CommentDate:
                            secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ?
                                (secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.reply === "null" || secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.reply === null) ? ""
                                    : secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.updated_at_formated
                                : "",
                        // e            paid2      
                        paid2CommentFrom: "school comment",
                        paid2CommentMessage: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.payment_details : "",
                        paid2CommentDate: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.created_at_formated ?? "" : "",
                        paid2Attachment: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.attachment : "",

                        // p            missing2      
                        missing2CommentFrom: "instructor comment",
                        missing2CommentMessage:
                            secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ?
                                (secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.reply === "null" || secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.reply === null) ? ""
                                    : secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.reply
                                : "",

                        missing2CommentDate:
                            secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ?
                                (secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.reply === "null" || secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.reply === null) ? ""
                                    : secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.updated_at_formated
                                : "",

                        // l            accept      
                        acceptCommentFrom: "school comment",
                        acceptCommentMessage: secondaryInvoiceDetailsData?.a_r_c_note,
                        acceptCommentDate:
                            secondaryInvoiceDetailsData?.action_dates?.accepted === "null" || secondaryInvoiceDetailsData?.action_dates?.accepted === null ? ""
                                : secondaryInvoiceDetailsData?.action_dates?.accepted,

                        // r            reject      
                        rejectCommentFrom: "school comment",
                        rejectCommentMessage: secondaryInvoiceDetailsData?.a_r_c_note,
                        rejectCommentDate:
                            secondaryInvoiceDetailsData?.action_dates?.rejected === "null" || secondaryInvoiceDetailsData?.action_dates?.rejected === null ? ""
                                : secondaryInvoiceDetailsData?.action_dates?.rejected,


                        // y            cancel      
                        cancelCommentFrom: "instructor comment",
                        cancelCommentMessage: secondaryInvoiceDetailsData?.a_r_c_note,
                        cancelCommentDate:
                            secondaryInvoiceDetailsData?.action_dates?.cancelled === "null" || secondaryInvoiceDetailsData?.action_dates?.cancelled === null ? ""
                                : secondaryInvoiceDetailsData?.action_dates?.cancelled,
                    });

                } else if (invoice_type === "license_invoice") {
                    // p        for school -> admin       
                    // setShowLessonPanel(false);
                    setBasicUserData({
                        cvr: secondaryInvoiceDetailsData?.cvr,
                        email: secondaryInvoiceDetailsData?.email,
                        image: secondaryInvoiceDetailsData?.image,
                        name: secondaryInvoiceDetailsData?.user_name,
                        phone: secondaryInvoiceDetailsData?.phone,
                        joined: secondaryInvoiceDetailsData?.user_joined_date,
                        profileLink: "/school/details/" + secondaryInvoiceDetailsData?.scl_ins_id,
                    });

                    //  r           set invoice comments        
                    setCommentObject({
                        // g        request         
                        requestCommentFrom: "school comment",
                        requestCommentMessage: secondaryInvoiceDetailsData?.request_comment === "null" || secondaryInvoiceDetailsData?.request_comment === null ? "" : secondaryInvoiceDetailsData?.request_comment,
                        requestCommentDate: secondaryInvoiceDetailsData?.action_dates?.requested === "null" || secondaryInvoiceDetailsData?.action_dates?.requested === null ? "" : secondaryInvoiceDetailsData?.action_dates?.requested,

                        // b            create      
                        createCommentFrom: "admin comment",
                        createCommentMessage: secondaryInvoiceDetailsData?.invoice_comment === "null" || secondaryInvoiceDetailsData?.invoice_comment === null ? "" : secondaryInvoiceDetailsData?.invoice_comment,
                        createCommentDate: secondaryInvoiceDetailsData?.action_dates?.created === "null" || secondaryInvoiceDetailsData?.action_dates?.created === null ? "" : secondaryInvoiceDetailsData?.action_dates?.created,

                        // e            paid1      
                        paid1CommentFrom: "school comment",
                        paid1CommentMessage: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.payment_details : "",

                        paid1CommentDate: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.created_at_formated ?? "" : "",

                        paid1Attachment: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.attachment : "",


                        // p            missing1      
                        missing1CommentFrom: "admin comment",
                        missing1CommentMessage:
                            secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ?
                                (secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.reply === "null" || secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.reply === null) ? ""
                                    : secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.reply
                                : "",
                        missing1CommentDate:
                            secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ?
                                (secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.reply === "null" || secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.reply === null) ? ""
                                    : secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.updated_at_formated
                                : "",
                        // e            paid2      
                        paid2CommentFrom: "school comment",
                        paid2CommentMessage: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.payment_details : "",
                        paid2CommentDate: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.created_at_formated ?? "" : "",
                        paid2Attachment: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.attachment : "",

                        // p            missing2      
                        missing2CommentFrom: "admin comment",
                        missing2CommentMessage:
                            secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ?
                                (secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.reply === "null" || secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.reply === null) ? ""
                                    : secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.reply
                                : "",

                        missing2CommentDate:
                            secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ?
                                (secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.reply === "null" || secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.reply === null) ? ""
                                    : secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.updated_at_formated
                                : "",

                        // l            accept      
                        acceptCommentFrom: "admin comment",
                        acceptCommentMessage: secondaryInvoiceDetailsData?.a_r_c_note,
                        acceptCommentDate:
                            secondaryInvoiceDetailsData?.action_dates?.accepted === "null" || secondaryInvoiceDetailsData?.action_dates?.accepted === null ? ""
                                : secondaryInvoiceDetailsData?.action_dates?.accepted,

                        // r            reject      
                        rejectCommentFrom: "admin comment",
                        rejectCommentMessage: secondaryInvoiceDetailsData?.a_r_c_note,
                        rejectCommentDate:
                            secondaryInvoiceDetailsData?.action_dates?.rejected === "null" || secondaryInvoiceDetailsData?.action_dates?.rejected === null ? ""
                                : secondaryInvoiceDetailsData?.action_dates?.rejected,


                        // y            cancel      
                        cancelCommentFrom: "school comment",
                        cancelCommentMessage: secondaryInvoiceDetailsData?.a_r_c_note,
                        cancelCommentDate:
                            secondaryInvoiceDetailsData?.action_dates?.cancelled === "null" || secondaryInvoiceDetailsData?.action_dates?.cancelled === null ? ""
                                : secondaryInvoiceDetailsData?.action_dates?.cancelled,
                    });

                }
                break;

            // e        for student only
            case `/student/details/${student_id}/invoice/details/${invoice_id}/${invoice_type}`:
                setBackLinkArray([
                    { label: "Student ", linkTo: "/student" },
                    { label: "Student profile", linkTo: `/student/details/${student_id}` },
                    { label: "Orders", linkTo: `/student/details/${student_id}/invoice` },
                    { label: "Order Details", linkTo: `` }
                ]);

                if (invoice_type === "admission_invoice") {
                    // p        for student -> school       
                    // setShowLessonPanel(true);
                    setBasicUserData({
                        email: secondaryInvoiceDetailsData?.school_email,
                        image: secondaryInvoiceDetailsData?.school_image,
                        name: secondaryInvoiceDetailsData?.school_name,
                        phone: secondaryInvoiceDetailsData?.school_phone,
                        joined: secondaryInvoiceDetailsData?.school_joined_date,
                        profileLink: "/school/details/" + secondaryInvoiceDetailsData?.school_id,
                    });

                    //  r           set invoice comments        
                    setCommentObject({
                        // g        request         
                        requestCommentFrom: "student comment",
                        requestCommentMessage: secondaryInvoiceDetailsData?.student_note === "null" || secondaryInvoiceDetailsData?.student_note === null ? "" : secondaryInvoiceDetailsData?.student_note,
                        requestCommentDate: secondaryInvoiceDetailsData?.action_dates?.requested === "null" || secondaryInvoiceDetailsData?.action_dates?.requested === null ? "" : secondaryInvoiceDetailsData?.action_dates?.requested,

                        // b            create      
                        createCommentFrom: "school comment",
                        createCommentMessage: secondaryInvoiceDetailsData?.invoice_note === "null" || secondaryInvoiceDetailsData?.invoice_note === null ? "" : secondaryInvoiceDetailsData?.invoice_note,
                        createCommentDate: secondaryInvoiceDetailsData?.action_dates?.created === "null" || secondaryInvoiceDetailsData?.action_dates?.created === null ? "" : secondaryInvoiceDetailsData?.action_dates?.created,

                        // e            paid1      
                        paid1CommentFrom: "student comment",
                        paid1CommentMessage: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.payment_details : "",

                        paid1CommentDate: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.created_at_formated ?? "" : "",

                        paid1Attachment: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.attachment : "",


                        // p            missing1      
                        missing1CommentFrom: "school comment",
                        missing1CommentMessage:
                            secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ?
                                (secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.reply === "null" || secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.reply === null) ? ""
                                    : secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.reply
                                : "",
                        missing1CommentDate:
                            secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ?
                                (secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.reply === "null" || secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.reply === null) ? ""
                                    : secondaryInvoiceDetailsData?.invoice_attachments?.[0]?.updated_at_formated
                                : "",
                        // e            paid2      
                        paid2CommentFrom: "student comment",
                        paid2CommentMessage: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.payment_details : "",
                        paid2CommentDate: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.created_at_formated ?? "" : "",
                        paid2Attachment: secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ? secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.attachment : "",

                        // p            missing2      
                        missing2CommentFrom: "school comment",
                        missing2CommentMessage:
                            secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ?
                                (secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.reply === "null" || secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.reply === null) ? ""
                                    : secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.reply
                                : "",

                        missing2CommentDate:
                            secondaryInvoiceDetailsData?.invoice_attachments?.length > 0 ?
                                (secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.reply === "null" || secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.reply === null) ? ""
                                    : secondaryInvoiceDetailsData?.invoice_attachments?.[1]?.updated_at_formated
                                : "",

                        // l            accept      
                        acceptCommentFrom: "school comment",
                        acceptCommentMessage: secondaryInvoiceDetailsData?.a_r_c_note,
                        acceptCommentDate:
                            secondaryInvoiceDetailsData?.action_dates?.accepted === "null" || secondaryInvoiceDetailsData?.action_dates?.accepted === null ? ""
                                : secondaryInvoiceDetailsData?.action_dates?.accepted,

                        // r            reject      
                        rejectCommentFrom: "school comment",
                        rejectCommentMessage: secondaryInvoiceDetailsData?.a_r_c_note,
                        rejectCommentDate:
                            secondaryInvoiceDetailsData?.action_dates?.rejected === "null" || secondaryInvoiceDetailsData?.action_dates?.rejected === null ? ""
                                : secondaryInvoiceDetailsData?.action_dates?.rejected,


                        // y            cancel      
                        cancelCommentFrom: "student comment",
                        cancelCommentMessage: secondaryInvoiceDetailsData?.a_r_c_note,
                        cancelCommentDate:
                            secondaryInvoiceDetailsData?.action_dates?.cancelled === "null" || secondaryInvoiceDetailsData?.action_dates?.cancelled === null ? ""
                                : secondaryInvoiceDetailsData?.action_dates?.cancelled,
                    });
                }
                break;

            default:
                break;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname, secondaryInvoiceDetailsData]);

    return (
        <div>
            <div>
                <div className="mx-s12 md:mx-s32">
                    <div className="flex justify-between items-baseline">
                        <CommonTitle title="Order Details" onClick={() => console.log("secondaryInvoiceDetailsData:::", secondaryInvoiceDetailsData, "____LOCATION::: ", location.pathname)}>
                            <BackLink linksArray={backLinkArray} />
                        </ CommonTitle >

                        {/* y:       invoice share         */}
                        <CommonButtonOutlined
                            btnLabel='share order'
                            onClick={() => {
                                // resetInvoiceShareForm();
                                setShowInvoiceShareModal(true);
                                setInvoiceShareForm({
                                    id: secondaryInvoiceDetailsData?.id,
                                    user_id: school_user_id ? parseInt(school_user_id) : invoice_type === "license_invoice" ? instructor_user_id : secondaryInvoiceDetailsData?.instructor_info?.user_id ? parseInt(secondaryInvoiceDetailsData?.instructor_info?.user_id) : parseInt(secondaryInvoiceDetailsData?.student_info?.user_id),
                                    role: school_user_id ? "school" : secondaryInvoiceDetailsData?.instructor_info?.user_id ? "instructor" : instructor_user_id ? "instructor" : "student",
                                    type: invoice_type === "license_invoice" ? "admin_invoice" : invoice_type,
                                })
                                // console.log("data:::", secondaryInvoiceDetailsData);
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
                            <SecondaryInvoiceProfile
                                cvr={basicUserData.cvr}
                                email={basicUserData.email}
                                name={basicUserData.name}
                                image={basicUserData.image}
                                phone={basicUserData.phone}
                                joined={basicUserData.joined}
                                profile_link={basicUserData.profileLink}
                            />
                            <div className='my-5 w-full bg-cBackgroundAndCategory h-s1'></div>

                            <SecondaryInvoiceTracker invoiceType={invoice_type} />

                            <div className='mt-5 mb-0 w-full lg:mt-5 lg:my-5 bg-cBackgroundAndCategory h-s1'></div>

                            <div className="flex flex justify-between flex-col-reverse  pb-5 space-y-5 h-full lg:flex-row">
                                <div className='pr-5 w-full max-w-[700px]'>
                                    <div>
                                        <div className='text-fs16 font-fw600 text-cBlack pb-s10'>Comments</div>
                                        <SecondaryInvoiceComments
                                            // g        request    }
                                            requestCommentFrom={commentObject.requestCommentFrom}
                                            requestCommentMessage={commentObject.requestCommentMessage}
                                            requestCommentDate={commentObject.requestCommentDate}

                                            // b            create  
                                            createCommentFrom={commentObject.createCommentFrom}
                                            createCommentMessage={commentObject.createCommentMessage}
                                            createCommentDate={commentObject.createCommentDate}

                                            // e            paid1 
                                            paid1CommentFrom={commentObject.paid1CommentFrom}
                                            paid1CommentMessage={commentObject.paid1CommentMessage}
                                            paid1CommentDate={commentObject.paid1CommentDate}
                                            paid1Attachment={commentObject.paid1Attachment}

                                            // p            missing1 
                                            missing1CommentFrom={commentObject.missing1CommentFrom}
                                            missing1CommentMessage={commentObject.missing1CommentMessage}
                                            missing1CommentDate={commentObject.missing1CommentDate}

                                            // e            paid2 
                                            paid2CommentFrom={commentObject.paid2CommentFrom}
                                            paid2CommentMessage={commentObject.paid2CommentMessage}
                                            paid2CommentDate={commentObject.paid2CommentDate}
                                            paid2Attachment={commentObject.paid2Attachment}

                                            // p            missing2 
                                            missing2CommentFrom={commentObject.missing2CommentFrom}
                                            missing2CommentMessage={commentObject.missing2CommentMessage}
                                            missing2CommentDate={commentObject.missing2CommentDate}

                                            // l            accept 
                                            acceptCommentFrom={commentObject.acceptCommentFrom}
                                            acceptCommentMessage={commentObject.acceptCommentMessage}
                                            acceptCommentDate={commentObject.acceptCommentDate}

                                            // r            reject 
                                            rejectCommentFrom={commentObject.rejectCommentFrom}
                                            rejectCommentMessage={commentObject.rejectCommentMessage}
                                            rejectCommentDate={commentObject.rejectCommentDate}

                                            // y            cancel 
                                            cancelCommentFrom={commentObject.cancelCommentFrom}
                                            cancelCommentMessage={commentObject.cancelCommentMessage}
                                            cancelCommentDate={commentObject.cancelCommentDate}
                                        />
                                    </div>


                                    <div className='pt-5'>
                                        {
                                            invoice_type === "license_invoice" && (secondaryInvoiceDetailsData?.status === "requested" || secondaryInvoiceDetailsData?.status === "paid1" || secondaryInvoiceDetailsData?.status === "paid2" || secondaryInvoiceDetailsData?.status === "missing2") ? <SecondaryInvoiceReply /> : ""
                                        }
                                    </div>
                                </div>

                                <div className='mr-5 max-h-full w-s1 bg-cBackgroundAndCategory'>
                                </div>

                                {/* b       lesson details */}
                                {invoice_type === "license_invoice" ?
                                    <div>
                                        {/* p       license details     */}
                                        <div className="text-fs16 font-fw600 pb-s15">
                                            License Details
                                        </div>
                                        <LessonsCard
                                            showFullDetails={true}
                                            title={secondaryInvoiceDetailsData?.lisence_title}
                                            packageDuration={roughLicenseDurationFormatter(secondaryInvoiceDetailsData?.duration_in_days)}
                                            price={secondaryInvoiceDetailsData?.price}
                                            momsValue={secondaryInvoiceDetailsData?.moms}
                                            includedMoms={true}
                                            startDate={secondaryInvoiceDetailsData?.purchase_lisence?.start_time ? formatDate(secondaryInvoiceDetailsData?.purchase_lisence?.start_time) : "NA"}
                                            endDate={secondaryInvoiceDetailsData?.purchase_lisence?.end_time ? formatDate(secondaryInvoiceDetailsData?.purchase_lisence?.end_time) : "NA"}
                                            purchaseDuration={liDuration ? liDuration : "NA"}
                                            licenseDetails={secondaryInvoiceDetailsData?.lisence?.details}
                                            status={secondaryInvoiceDetailsData?.status}
                                        />
                                    </div>
                                    : invoice_type === "instructor_invoice" ?
                                        <SecondaryInvoiceItem
                                            // e        instructor lessons card     
                                            classroom_lessons={secondaryInvoiceDetailsData?.ceds?.classroom_total_duration}
                                            driving_lessons={secondaryInvoiceDetailsData?.ceds?.driving_total_duration}
                                            external_lessons={secondaryInvoiceDetailsData?.ceds?.external_total_count}
                                            start_date={secondaryInvoiceDetailsData?.start_date}
                                            end_date={secondaryInvoiceDetailsData?.end_date}

                                            moms_amount={secondaryInvoiceDetailsData?.moms}
                                            total_price={secondaryInvoiceDetailsData?.amount}
                                        />
                                        : invoice_type === "admission_invoice" ?
                                            // l        student lessons card        
                                            <SecondaryStudentLesson />
                                            : "INVALID INVOICE TYPE"
                                }


                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    );
};

export default SecondaryInvoiceDetails


