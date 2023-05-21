import React from 'react'
import useNewInvoiceStore, { updateNewInvoiceStatus } from '../../../../App/Stores/school/NewInvoiceStore';
import CommonButton from '../../../../Components/Button/CommonButton';
import CommonInput from '../../../../Components/Input/CommonInput';
import CommonModal from '../../../../Components/Modal/CommonModal';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const InvoiceAcceptNote = () => {
    const { showInvoiceAcceptModal, setShowInvoiceAcceptModal, invoicePriceChangeFactor, invoiceDetailsData, setInvoicePriceChangeFactor } = useNewInvoiceStore();
    const [commentValue, setCommentValue] = useState("");
    const { invoice_id, invoice_type } = useParams();
    const { t } = useTranslation();
    return (
        <CommonModal
            showModal={showInvoiceAcceptModal}
            setShowModal={setShowInvoiceAcceptModal}
            modalTitle={t("Acceptance note")}
            mainContent={
                <div>
                    <div className="pt-5">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <CommonInput
                                label={t("Acceptance note")}
                                value={commentValue}
                                onChange={(e) => { setCommentValue(e.target.value) }}
                                placeholder={t("Acceptance note")}
                                required={true}
                                textarea={true}
                            />

                            <div className="pt-5 flex justify-center">
                                <CommonButton
                                    roundedFull={false}
                                    onClick={async () => {
                                        console.log(invoice_id, invoice_type, "created", commentValue, "");
                                        if (commentValue) {
                                            let updateSuccess = await updateNewInvoiceStatus(invoice_id, invoice_type, "created", commentValue, invoicePriceChangeFactor !== 100 ? invoiceDetailsData?.price_without_moms : "");
                                            if (updateSuccess) {
                                                setInvoicePriceChangeFactor(100);
                                                setCommentValue("");
                                                setShowInvoiceAcceptModal(false);
                                            }
                                        }
                                    }}
                                    btnLabel={t('submit')}
                                    type='submit'
                                />
                            </div>
                        </form>
                    </div>
                </div>
            }
        />
    )
}

export default InvoiceAcceptNote