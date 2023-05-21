import React, { useEffect, useState } from 'react'
import useNewInvoiceStore from '../../../../App/Stores/school/NewInvoiceStore'
import CommonButton from '../../../../Components/Button/CommonButton';
import CommonInput from '../../../../Components/Input/CommonInput';
import CommonModal from '../../../../Components/Modal/CommonModal';
import { Toastr, calculatePercentage, changeValueByPercentage } from '../../../../App/Utility/UtilityFunctions';
import { useTranslation } from 'react-i18next';

const InvoiceUpdatePrice = () => {
    const {
        showInvoiceUpdateModal,
        setShowInvoiceUpdateModal,
        invoiceDetailsData,
        setInvoiceDetailsData,
        setInvoicePriceChangeFactor,
        invoicePriceChangeFactor,
        invoiceDetailsTotalPriceLocal,
        setInvoiceDetailsTotalPriceLocal,
    } = useNewInvoiceStore();
    const [priceValue, setPriceValue] = useState(0);

    const { t } = useTranslation();

    useEffect(() => {
        setPriceValue(parseInt(invoiceDetailsData?.price_without_moms));
    }, [invoiceDetailsData]);

    return (
        <CommonModal
            showModal={showInvoiceUpdateModal}
            setShowModal={setShowInvoiceUpdateModal}
            modalTitle={t("Update price")}
            mainContent={
                <div
                    onClick={() => {
                        console.log('invoicePriceChangeFactor: ', invoicePriceChangeFactor);
                    }}
                >
                    <div className="pt-5">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <CommonInput
                                label={t('updated price (Without MOMS)')}
                                placeholder={t('Write an updated price')}
                                required={true}
                                value={priceValue}
                                max_number={invoiceDetailsData?.price_without_moms}
                                min_number={0}
                                onChange={(e) => {
                                    if (e.target.value > invoiceDetailsData?.price_without_moms) Toastr({ type: 'error', message: 'New price cannot exceed the original price' });
                                    setPriceValue(e.target.value);
                                    setInvoiceDetailsTotalPriceLocal(e.target.value);
                                }}
                                type='number'
                            />

                            <div className="text-cRed text-sm pt-5 space-y-2">
                                <div>{t("*New price cannot exceed the original price")}</div>
                                <div>{t("*Excluding MOMS amount")}</div>
                            </div>


                            <div className="pt-5 flex justify-center">
                                <CommonButton
                                    roundedFull={false}
                                    btnLabel={t('update')}
                                    type='submit'
                                    onClick={() => {
                                        if (priceValue > invoiceDetailsData?.price_without_moms) return Toastr({ type: 'error', message: 'New price cannot exceed the original price' });
                                        console.log('calculatePercentage: ', calculatePercentage(invoiceDetailsData.price_without_moms/*  */, priceValue));
                                        let newPercentage = calculatePercentage(invoiceDetailsData.price_without_moms, parseInt(priceValue));
                                        let newMoms = Math.round(parseInt(priceValue) * (invoiceDetailsData?.moms_percentage / 100));
                                        // let legalMoms = CalculateMomsNew(newPercentage, invoiceDetailsData?.lessons);
                                        let newTotalPrice = Math.round(parseInt(priceValue) + newMoms);
                                        console.log('newMoms: ', newMoms, 'newTotalPrice: ', newTotalPrice, 'newPercentage: ', newPercentage);
                                        // return
                                        setInvoiceDetailsData({ ...invoiceDetailsData, price: newTotalPrice, moms: newMoms });
                                        setInvoicePriceChangeFactor(newPercentage);

                                        setShowInvoiceUpdateModal(false);
                                    }}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            }
        />
    )
}

export default InvoiceUpdatePrice

const CalculateMomsNew = (percentageValue, lessonArray) => {
    let resMoms = 0;
    lessonArray?.map(item => {
        let t_mom = item?.price - item?.price_without_moms
        if (item?.is_moms) return resMoms = resMoms + (t_mom * (percentageValue / 100))
        else return 0
    })
    return Math.round(resMoms);
}