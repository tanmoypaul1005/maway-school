import React, { useState } from 'react'
import useInvoiceStore, { changeInvoiceStatus, getSecondaryInvoiceDetails } from '../../App/Stores/InvoiceStore';
import { calculateEndDateCalendar, extractDate } from '../../App/Utility/UtilityFunctions';
import CommonButton from '../../Components/Button/CommonButton';
import CommonInput from '../../Components/Input/CommonInput';
import { incrementDate } from '../../Utility/UtilityFunctions';

const SecondaryInvoiceReply = () => {
    const { secondaryInvoiceDetailsData } = useInvoiceStore();

    let currentDate = new Date();
    const [startDate, setStartDate] = useState(extractDate(currentDate));
    const [endDate, setEndDate] = useState(extractDate(calculateEndDateCalendar(secondaryInvoiceDetailsData?.lisence?.duration / 30, startDate)));
    const [missing, setMissing] = useState(true);
    const [reply, setReply] = useState("");

    const SubmitAction = async () => {
        console.log("taking invoice action..");

        switch (secondaryInvoiceDetailsData?.status) {
            case "requested":
                if (reply) await changeInvoiceStatus(secondaryInvoiceDetailsData?.id, "created", reply);
                await getSecondaryInvoiceDetails(secondaryInvoiceDetailsData?.id, "license_invoice");
                break;

            case "paid1":
                setMissing(true);
                if (reply && startDate && endDate) {
                    await changeInvoiceStatus(secondaryInvoiceDetailsData?.id, "accepted", reply, startDate, endDate);
                    await getSecondaryInvoiceDetails(secondaryInvoiceDetailsData?.id, "license_invoice");
                }
                break;

            case "paid2":
                setMissing(true);
                if (reply && startDate && endDate) {
                    await changeInvoiceStatus(secondaryInvoiceDetailsData?.id, "accepted", reply, startDate, endDate);
                    await getSecondaryInvoiceDetails(secondaryInvoiceDetailsData?.id, "license_invoice");
                }
                break;

            case "missing2":
                setMissing(true);
                if (reply && startDate && endDate) {
                    await changeInvoiceStatus(secondaryInvoiceDetailsData?.id, "accepted", reply, startDate, endDate);
                    await getSecondaryInvoiceDetails(secondaryInvoiceDetailsData?.id, "license_invoice");
                }
                break;

            default:
                break;
        }
    }

    const DeclineAction = async () => {
        console.log("Decline action..");

        switch (secondaryInvoiceDetailsData?.status) {
            case "requested":
                setMissing(false);
                if (reply) {
                    await changeInvoiceStatus(secondaryInvoiceDetailsData?.id, "rejected", reply);
                    await getSecondaryInvoiceDetails(secondaryInvoiceDetailsData?.id, "license_invoice");
                }
                break;

            case "paid1":
                setMissing(false);
                if (reply) {
                    await changeInvoiceStatus(secondaryInvoiceDetailsData?.id, "missing", reply);
                    await getSecondaryInvoiceDetails(secondaryInvoiceDetailsData?.id, "license_invoice");
                    setReply("");
                }
                break;

            case "paid2":
                setMissing(false);
                if (reply) {
                    await changeInvoiceStatus(secondaryInvoiceDetailsData?.id, "missing", reply);
                    await getSecondaryInvoiceDetails(secondaryInvoiceDetailsData?.id, "license_invoice");
                    setReply("");
                }
                break;

            case "missing2":
                setMissing(false);
                if (reply) {
                    await changeInvoiceStatus(secondaryInvoiceDetailsData?.id, "rejected", reply);
                    await getSecondaryInvoiceDetails(secondaryInvoiceDetailsData?.id, "license_invoice");
                    setReply("");
                }
                break;

            default:
                break;
        }
    }

    return (
        <form onSubmit={(e) => e.preventDefault()}>

            {/*e         date section */}
            {(secondaryInvoiceDetailsData?.status === "paid1" || secondaryInvoiceDetailsData?.status === "paid2" || secondaryInvoiceDetailsData?.status === "missing2") ? <div className="flex justify-between space-x-5">
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
                <div onClick={() => console.log("endDate ::: ", endDate)} className="w-full">
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
            </div> : ""}

            <div className="pt-5"></div>
            <CommonInput
                label={"reply to " + secondaryInvoiceDetailsData?.role}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                required={true}
                placeholder='Please write a comment'
                textarea={true}
            />
            <div className="flex justify-between pt-5">
                <CommonButton
                    roundedFull={true}
                    type="submit"
                    colorType="danger"
                    btnLabel={secondaryInvoiceDetailsData?.status === "requested" ? 'Reject' : secondaryInvoiceDetailsData?.status === "paid1" ? "missing payment" : secondaryInvoiceDetailsData?.status === "paid2" ? "missing payment" : "reject"}
                    onClick={DeclineAction}
                />

                <CommonButton
                    roundedFull={true}
                    colorType="primary"
                    btnLabel={secondaryInvoiceDetailsData?.status === "requested" ? "create" : "accept"}
                    type='submit'
                    onClick={SubmitAction}
                />
            </div>
        </form>
    )
}

export default SecondaryInvoiceReply