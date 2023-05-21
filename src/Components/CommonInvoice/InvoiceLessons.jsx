import React from 'react';

const InvoiceLessons = ({ title, time }) => {
    return (
        <div>
        <div className='flex justify-between capitalize text-fs14 text-cHighlighted font-fw500'>
            <div className='capitalize'>{title}</div>
            <div>{time}</div>
        </div>

        <div className="px-1 border-t-2 my-s10 border-cChipBorder"></div>
        </div>
    );
};

export default InvoiceLessons;