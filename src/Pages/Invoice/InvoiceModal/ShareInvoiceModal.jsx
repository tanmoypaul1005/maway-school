import React from 'react';
import useInvoiceStore, { shareInvoiceDetails } from '../../../App/Stores/InvoiceStore';
import CommonButton from '../../../Components/Button/CommonButton';
import CommonInput from '../../../Components/Input/CommonInput';
import CommonModal from '../../../Components/Modal/CommonModal';
import { checkValidEmail, Toastr } from '../../../Utility/UtilityFunctions';

function ShareInvoiceModal() {
    const {
        showInvoiceShareModal,
        setShowInvoiceShareModal,
        invoiceShareForm,
        setInvoiceShareForm
    } = useInvoiceStore();

    return (
        <>
            <CommonModal
                showModal={showInvoiceShareModal}
                setShowModal={setShowInvoiceShareModal}
                modalTitle="Share order"
                mainContent={
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="py-5">
                            <CommonInput
                                label={"Email"}
                                required={true}
                                withStar={false}
                                type="email"
                                placeholder="Enter a valid email"
                                value={invoiceShareForm?.email ?? ""}
                                onChange={(e) => setInvoiceShareForm({ ...invoiceShareForm, email: e.target.value })}
                            />
                        </div>
                        <div className="flex justify-center">
                            <CommonButton
                                btnLabel='share'
                                type='submit'
                                onClick={async () => {
                                    console.log("invoiceShareForm",invoiceShareForm)
                                    if (checkValidEmail(invoiceShareForm?.email)) {
                                        console.log("SHARE INVOICE: ", invoiceShareForm);
                                        let sendSuccess = await shareInvoiceDetails(invoiceShareForm);
                                        if (sendSuccess) {
                                            // Toastr({ message: ("Invoice Shared Successfully !"), type: "success" });
                                            setShowInvoiceShareModal(false);
                                        }
                                    }
                                }}
                            />
                        </div>
                    </form>
                }
            />
        </>
    )
}

export default ShareInvoiceModal