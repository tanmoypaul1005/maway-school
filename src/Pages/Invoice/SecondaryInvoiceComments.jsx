import React from 'react';
import { iImageIogo } from '../../App/Utility/source';
import { isNullDirty } from '../../App/Utility/UtilityFunctions';
import Image from '../../Components/Image/Image';

function SecondaryInvoiceComments({

    // g        request         
    requestCommentFrom,
    requestCommentMessage,
    requestCommentDate,

    // b            create      
    createCommentFrom,
    createCommentMessage,
    createCommentDate,

    // e            paid1      
    paid1CommentFrom,
    paid1CommentMessage,
    paid1CommentDate,
    paid1Attachment,

    // p            missing1      
    missing1CommentFrom,
    missing1CommentMessage,
    missing1CommentDate,

    // e            paid2      
    paid2CommentFrom,
    paid2CommentMessage,
    paid2CommentDate,
    paid2Attachment,

    // p            missing2      
    missing2CommentFrom,
    missing2CommentMessage,
    missing2CommentDate,

    // l            accept      
    acceptCommentFrom,
    acceptCommentMessage,
    acceptCommentDate,

    // r            reject      
    rejectCommentFrom,
    rejectCommentMessage,
    rejectCommentDate,

    // y            cancel      
    cancelCommentFrom,
    cancelCommentMessage,
    cancelCommentDate,

}) {

    return (
        <div onClick={() => console.log(arguments)} className='flex flex-col space-y-s10'>

            {/* g        request          */}
            {requestCommentDate ?
                <CommentsOnly
                    commentFrom={requestCommentFrom}
                    commentType={"request"}
                    commentMessage={requestCommentMessage}
                    commentDate={requestCommentDate}
                /> : ""}

            {/* b        create          */}
            {createCommentDate ?
                <CommentReply
                    replyFrom={createCommentFrom}
                    replyType={"create"}
                    replyMessage={createCommentMessage}
                    replyDate={createCommentDate}
                /> : ""}

            {/* e        paid1          */}
            {paid1CommentDate ? <CommentWithAttachment
                commentType="paid1"
                commentFrom={paid1CommentFrom}
                commentMessage={paid1CommentMessage}
                commentDate={paid1CommentDate}
                commentAttachment={paid1Attachment}
            /> : ""}

            {/* p        missing1          */}
            {missing1CommentDate ? <CommentReply
                replyFrom={missing1CommentFrom}
                replyType="missing1"
                replyMessage={missing1CommentMessage}
                replyDate={missing1CommentDate}
            /> : ""}

            {/* e        paid2          */}
            {paid2CommentDate ? <CommentWithAttachment
                commentType="paid2"
                commentFrom={paid2CommentFrom}
                commentMessage={paid2CommentMessage}
                commentDate={paid2CommentDate}
                commentAttachment={paid2Attachment}
            /> : ""}

            {/* p        missing2          */}
            {missing2CommentDate ? <CommentReply
                replyFrom={missing2CommentFrom}
                replyType="missing2"
                replyMessage={missing2CommentMessage}
                replyDate={missing2CommentDate}
            /> : ""}

            {/* e        accept          */}
            {acceptCommentDate ? <CommentReply
                replyType="accept"
                replyFrom={acceptCommentFrom}
                replyMessage={acceptCommentMessage}
                replyDate={acceptCommentDate}
            /> : ""}

            {/* r        reject          */}
            {rejectCommentDate ? <CommentReply
                replyType="reject"
                replyFrom={rejectCommentFrom}
                replyMessage={rejectCommentMessage}
                replyDate={rejectCommentDate}
            /> : ""}

            {/* y        cancel          */}
            {cancelCommentDate ?
                <CommentsOnly
                    commentType={"cancel"}
                    commentFrom={cancelCommentFrom}
                    commentMessage={cancelCommentMessage}
                    commentDate={cancelCommentDate}
                /> : ""}

        </div>
    );
};

export default SecondaryInvoiceComments


const CommentReply = ({ replyFrom, replyType, replyMessage, replyDate }) => {
    return (
        <div className='bg-cSettingsOptionBgColor p-s10 rounded-br10'>
            <div className="flex justify-between">
                <span className='capitalize pb-s10 text-fs14 font-fw600 text-cBlack'> {replyFrom}</span>
                <span className='pb-s10 text-fs12 text-cBlack'>{replyDate}</span>
            </div>
            <div>{isNullDirty(replyMessage) ? <span className='font-semibold text-cIconColor2'>NA</span> : replyMessage}</div>
        </div>
    )
}

const CommentsOnly = ({ commentFrom, commentType, commentMessage, commentDate }) => {
    return (
        <div className='bg-cCommentBG p-s10 rounded-br10'>
            <div className="flex justify-between">
                <span className='capitalize pb-s10 text-fs14 font-fw600 text-cBlack'>{commentFrom}</span>
                <span className='pb-s10 text-fs12 text-cBlack'>{commentDate}</span>
            </div>
            <div>{isNullDirty(commentMessage) ? <span className='font-semibold text-cIconColor2'>NA</span> : commentMessage}</div>
        </div>
    )
}

const CommentWithAttachment = ({ commentFrom, commentType, commentMessage, commentAttachment, commentDate }) => {
    return (
        <div className='bg-cCommentBG p-s10 rounded-br10'>
            <div className="flex justify-between">
                <span className='capitalize pb-s10 text-fs14 font-fw600 text-cBlack'>{commentFrom}</span>
                <span className='pb-s10 text-fs12 text-cBlack'>{commentDate}</span>
            </div>
            <div>{isNullDirty(commentMessage) ? <span className='font-semibold text-cIconColor2'>NA</span> : commentMessage}</div>
            <div className='pt-5'><Image src={commentAttachment} dummyImage={iImageIogo} className="h-[200px] rounded-br5" withPreview={true} /></div>
        </div>
    )
}
