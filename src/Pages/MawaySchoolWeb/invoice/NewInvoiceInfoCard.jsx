import React from 'react'
import { iDlPdfIcon, iEditPrice } from '../../../App/Utility/source'
import NewTextButton from '../../../Components/Button/NewTextButton'
import { BaseUrlSrc } from '../../../App/Utility/Url'
import { useTranslation } from 'react-i18next'

const NewInvoiceInfoCard = ({
    title = "Invoice Items (25 Mar, 2022 - 07 Jun, 2022)",
    content = [
        { clickable: false, label: "Classroom Lessons", value: "01:00" },
        { clickable: false, label: "Classroom Lessons", value: "01:00" },
        { clickable: false, label: "Classroom Lessons", value: "01:00" },
    ],
    momsTitle = 'MOMS',
    momsValue = '350',
    totalValue = "1250",

    withPdfDlButton = false,
    pdfDownloadLink = "",

    editableTotalPrice = false,
    OnEditTotalPrice = () => { },
}) => {

    const { t } = useTranslation();

    return (
        <div
            onClick={() => { console.log("data content: ", content); }}
            className='w-full text-sm'>
            <div className="flex items-center justify-between w-full pb-s8">
                <div className='text-left w-full sub_title text-cBlack'>{title}</div>
                {withPdfDlButton && pdfDownloadLink !== "" ?
                    <a
                        href={BaseUrlSrc + pdfDownloadLink}
                        download="Example-PDF-document"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <NewTextButton
                            iconLeft={iDlPdfIcon}
                            width='w-[140px]'
                            btnLabel={t('Download PDF')}
                            withBg={false}
                        />
                    </a> : ""}
            </div>
            <div className='bg-cBackgroundAndCategory p-s16 rounded-lg'>
                <div className='space-y-1'>
                    {
                        content?.map((item, index) =>
                            <DataRow clickable={item?.clickable} onClick={item?.onClick} label={item?.label} value={item?.value} key={index} />
                        )
                    }
                </div>

                <div className="pt-s8"></div>
                <div className="bg-cChipBorder h-s1 px-s16"></div>
                <div className="pb-s8"></div>

                <div className="text-cGray small_body_text flex items-center justify-between">
                    <div>{momsTitle}</div>
                    <div>{"DKK " + momsValue?.toLocaleString("da-DK")}</div>
                </div>

                <div className="text-cBrandColor pt-s4 important_text flex items-center justify-between">
                    <div>{t("Total")}</div>
                    <div className="flex items-center space-x-4">
                        <div>{"DKK " + totalValue?.toLocaleString("da-DK")}</div>
                        {editableTotalPrice ? <img onClick={OnEditTotalPrice} src={iEditPrice} alt="" className='cursor-pointer' /> : ""}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewInvoiceInfoCard

function DataRow({
    label = "NA",
    value = "NA",
    onClick = () => { },
    clickable = false
}) {
    return (
        <div onClick={onClick} className={`${label === "hours" ? 'text-fs14 leading-[21px] font-fw400 text-cGray' : "important_text "} flex items-center justify-between capitalize ${clickable ? "text-cBrandColor cursor-pointer" : "text-cBlack"} `}>
            <div className='capitalize-first'>{label}</div>
            <div>{value}</div>
        </div>
    )
}
