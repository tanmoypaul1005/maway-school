import React from 'react';
import InvoiceStatusTracker from './../InvoiceStatusTracker/InvoiceStatusTracker';

const InvoiceStatus = () => {

    return (

        <div>
            <div className="leading-6 text-fs16 font-fw600 text-cHighlighted mb-s15">Order status</div>
            <InvoiceStatusTracker />
        </div>

    );
};

export default InvoiceStatus;