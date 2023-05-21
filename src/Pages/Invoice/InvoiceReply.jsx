import React, { useState } from 'react';
import useInvoiceStore, { changeInvoiceStatus } from '../../App/Stores/InvoiceStore';
import { calculateEndDateCalendar, extractDate } from '../../App/Utility/UtilityFunctions';
import CommonButton from '../../Components/Button/CommonButton';
import CommonInput from '../../Components/Input/CommonInput';
import { incrementDate } from '../../Utility/UtilityFunctions';

function InvoiceReply() {
    const { invoiceDetailsData } = useInvoiceStore();

    return (
        <div className='pb-5'>
            {/* b:      create */}
            {((invoiceDetailsData?.action_dates?.rejected === "null" && invoiceDetailsData?.action_dates?.cancelled === "null") && invoiceDetailsData?.action_dates?.created === "null" && invoiceDetailsData?.action_dates?.accepted === "null") ? <RequestActionReply /> : ""}

            {/* b:      accept/missing paid1 */}
            {
                ((invoiceDetailsData?.action_dates?.paid1 !== "null")
                    && (invoiceDetailsData?.action_dates?.missing1 === "null") && invoiceDetailsData?.action_dates?.accepted === "null")
                    ? <PaidOneActionReply /> : ""
            }

            {/* b:      accept/missing paid2 */}
            {
                (invoiceDetailsData?.action_dates?.paid2 !== "null" && invoiceDetailsData?.action_dates?.accepted === "null" && invoiceDetailsData?.action_dates?.missing2 === "null") ? <PaidTwoActionReply /> : ""
            }

            {/* b          missing2 FINAL ACTION */}
            {
                invoiceDetailsData?.action_dates?.missing2 !== "null" && invoiceDetailsData?.action_dates?.rejected === "null" && invoiceDetailsData?.action_dates?.accepted === "null" ? <MissingTwoActionReply /> : ""
            }

            {/* r: testing only */}
            {/* <PaidOneActionReply />
            <PaidTwoActionReply /> */}

        </div>
    )
}

export default InvoiceReply

const RequestActionReply = () => {
    const { invoiceDetailsData } = useInvoiceStore();
    const [reply, setReply] = useState("");
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <CommonInput
                label={"reply to " + invoiceDetailsData?.role}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                required={true}
                placeholder='Write a comment'
                textarea={true}
            />
            <div className="flex justify-between pt-5">
                <CommonButton
                    roundedFull={true}
                    colorType="danger"
                    btnLabel='Reject'
                    onClick={async () => { if (reply) await changeInvoiceStatus(invoiceDetailsData?.id, "rejected", reply) }}
                />

                <CommonButton
                    roundedFull={true}
                    colorType="primary"
                    btnLabel='create'
                    onClick={async () => { if (reply) await changeInvoiceStatus(invoiceDetailsData?.id, "created", reply) }}
                    type='submit'
                />
            </div>
        </form>
    )
}

const PaidOneActionReply = () => {
    let currentDate = new Date();
    const { invoiceDetailsData } = useInvoiceStore();
    const [reply, setReply] = useState("");
    const [startDate, setStartDate] = useState(extractDate(currentDate));
    const [endDate, setEndDate] = useState(extractDate(calculateEndDateCalendar(invoiceDetailsData?.lisence?.duration / 30, startDate)));
    const [missing, setMissing] = useState(true);

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex justify-between space-x-5">
                <div className="w-full">
                    <CommonInput
                        label={"Start Date"}
                        type="date"
                        required={missing ? true : false}
                        value={startDate}
                        onChange={(e) => {
                            console.log(e.target.value);
                            if (endDate < e.target.value) {
                                setStartDate(e.target.value);
                                setEndDate("");
                            }
                            else {
                                setStartDate(e.target.value);
                            }
                        }}
                    />
                </div>
                <div className="w-full">
                    <CommonInput
                        label={"End Date"}
                        type="date"
                        required={missing ? true : false}
                        value={endDate}
                        startDate={startDate}
                        onChange={(e) => {
                            console.log(e.target.value);
                            setEndDate(e.target.value);
                        }}
                    />
                </div>
            </div>

            <div className="pt-5"></div>
            <CommonInput
                label={"reply to " + invoiceDetailsData?.role}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                required={true}
                placeholder='Please write a comment'
                textarea={true}
            />
            <div className="flex justify-between pt-5">
                <CommonButton
                    roundedFull={true}
                    colorType="danger"
                    btnLabel='missing payment'
                    width='w-[180px]'
                    onClick={() => {
                        setMissing(false);
                        if (reply) changeInvoiceStatus(invoiceDetailsData?.id, "missing", reply)
                    }}
                />

                <CommonButton
                    roundedFull={true}
                    colorType="primary"
                    btnLabel='accept'
                    onClick={() => {
                        setMissing(true);
                        if (reply && startDate && endDate) changeInvoiceStatus(invoiceDetailsData?.id, "accepted", reply, startDate, endDate)
                    }}
                />
            </div>
        </form>
    )
}



const PaidTwoActionReply = () => {
    let currentDate = new Date();
    const { invoiceDetailsData } = useInvoiceStore();
    const [reply, setReply] = useState("");
    const [startDate, setStartDate] = useState(extractDate(currentDate));
    const [endDate, setEndDate] = useState(extractDate(calculateEndDateCalendar(invoiceDetailsData?.lisence?.duration / 30, startDate)));
    const [missing, setMissing] = useState(true);

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex justify-between space-x-5">
                <div className="w-full">
                    <CommonInput
                        label={"Start Date"}
                        type="date"
                        required={missing ? true : false}
                        value={startDate}
                        onChange={(e) => {
                            console.log(e.target.value);
                            if (endDate < e.target.value) {
                                setStartDate(e.target.value);
                                setEndDate("");
                            }
                            else {
                                setStartDate(e.target.value);
                            }
                        }}
                    />
                </div>
                <div className="w-full">
                    <CommonInput
                        label={"End Date"}
                        type="date"
                        required={missing ? true : false}
                        value={endDate}
                        startDate={startDate}
                        onChange={(e) => {
                            console.log(e.target.value);
                            setEndDate(e.target.value);
                        }}
                    />
                </div>
            </div>

            <div className="pt-5"></div>
            <CommonInput
                label={"reply to " + invoiceDetailsData?.role}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                required={true}
                placeholder='Please write a comment'
                textarea={true}
            />
            <div className="flex justify-between pt-5">
                <CommonButton
                    roundedFull={true}
                    colorType="danger"
                    btnLabel='missing payment'
                    width='w-[180px]'
                    onClick={() => {
                        setMissing(false);
                        if (reply) changeInvoiceStatus(invoiceDetailsData?.id, "missing", reply)
                    }}
                />

                <CommonButton
                    roundedFull={true}
                    colorType="primary"
                    btnLabel='accept'
                    onClick={() => {
                        setMissing(true);
                        if (reply && startDate && endDate) changeInvoiceStatus(invoiceDetailsData?.id, "accepted", reply, startDate, endDate)
                    }}
                />
            </div>
        </form>
    )
}


const MissingTwoActionReply = () => {
    let currentDate = new Date();
    const { invoiceDetailsData } = useInvoiceStore();
    const [reply, setReply] = useState("");
    const [startDate, setStartDate] = useState(extractDate(currentDate));
    const [endDate, setEndDate] = useState(extractDate(calculateEndDateCalendar(invoiceDetailsData?.lisence?.duration / 30, startDate)));
    const [missing, setMissing] = useState(true);

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex justify-between space-x-5">
                <div className="w-full">
                    <CommonInput
                        label={"Start Date"}
                        type="date"
                        required={missing ? true : false}
                        value={startDate}
                        onChange={(e) => {
                            console.log(e.target.value);
                            if (endDate < e.target.value) {
                                setStartDate(e.target.value);
                                setEndDate("");
                            }
                            else {
                                setStartDate(e.target.value);
                            }
                        }}
                    />
                </div>
                <div className="w-full">
                    <CommonInput
                        label={"End Date"}
                        type="date"
                        required={missing ? true : false}
                        value={endDate}
                        startDate={startDate}
                        onChange={(e) => {
                            console.log(e.target.value);
                            setEndDate(e.target.value);
                        }}
                    />
                </div>
            </div>

            <div className="pt-5"></div>
            <CommonInput
                label={"reply to " + invoiceDetailsData?.role}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                required={true}
                placeholder='Please write a comment'
                textarea={true}
            />
            <div className="flex justify-between pt-5">
                <CommonButton
                    roundedFull={true}
                    colorType="danger"
                    btnLabel='Reject'
                    onClick={() => {
                        setMissing(false);
                        if (reply) changeInvoiceStatus(invoiceDetailsData?.id, "rejected", reply)
                    }}
                />

                <CommonButton
                    roundedFull={true}
                    colorType="primary"
                    btnLabel='accept'
                    onClick={() => {
                        setMissing(true);
                        if (reply && startDate && endDate) changeInvoiceStatus(invoiceDetailsData?.id, "accepted", reply, startDate, endDate)
                    }}
                />
            </div>
        </form>
    )
}
