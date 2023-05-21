import React from 'react'
import InvoiceProfile from './InvoiceProfile';
import CommonTitle from '../Title/CommonTitle';
import InvoiceLicense from './InvoiceLicense';
import InvoiceComment from './InvoiceComment';
import InvoiceStatus from './InvoiceStatus';

function CommonInvoicesDetails2() {
    return (
        <div className="mx-s12 md:mx-s32">
            <CommonTitle title="Invoice Details" />
            <div className="bg-cBrandColor2 rounded-br20">
                <div className="rounded-lg bg-cBrandColor2 px-s20 py-s20">
                    <InvoiceProfile />
                    <div className="grid grid-flow-row my-s30 mr-s24 sm:grid-flow-row lg:grid-flow-col">
                        <div className="w-full sm:col-span-12 lg:pr-s50">
                            <InvoiceStatus />
                            <InvoiceComment />
                        </div>
                        <InvoiceLicense />
                    </div>
                </div>
                <div className="px-1 pt-s1">
                    <hr />
                </div>
            </div>
        </div>
    )
}

export default CommonInvoicesDetails2
