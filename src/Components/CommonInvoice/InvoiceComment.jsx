import React from 'react';
import CommonInput from './../Input/CommonInput';
import CommonButton from './../Button/CommonButton';

const InvoiceComment = () => {
    return (
        <div className="mt-s40 mx-s10 w-s300 sm:w-full lg:w-full">
        <div className="text-fs16 font-fw600 text-cHighlighted mb-s15">Comment</div>
        <div>
            <div className="flex justify-between"> 
            <span className="text-fs14 font-fw600 text-cHighlighted">School Comment</span>
            <span className="text-cTextGray text-fs14 font-fw400">12 Nov, 2022</span>
            </div>
            <span className="font-fw600 text-fs14 text-cTextGray">Hi there.We are Denmark Driving School. We are teaching students and helping them for driving license. To make it more official and authentic, we want to join with your system. Please accept our request to work with you.Pleaes give us some discount so we can start soon! Best regards, Denmark Driving School</span>
        </div>

        <div className="mt-s20">
        <span className="font-fw600 text-fs16 text-cHighlighted mb-s5">Reply to School</span>
        <CommonInput type="text" textarea = "true"/>
        <div className="flex justify-between mt-s20">

        <CommonButton btnLabel="Reject" colorType="warning" roundedFull="true" />
      
        <CommonButton btnLabel="Create Invoice" colorType="primary" roundedFull="true" />
        </div>
        </div>
       
    </div>
    );
};

export default InvoiceComment;