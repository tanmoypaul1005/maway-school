import React from 'react'
import { iEdiItIcon, iCategoryDetail } from './../../App/Utility/source';

function LessonTitle() {
    return (
        <div className='border-2 border-cChipBorder rounded-br10 mb-s10'>
          <div className='p-s12 grid grid-flow-row md:grid-flow-col gap-4'>
        
          <div className='flex'>
          <img src={iCategoryDetail} alt=""></img>
          <span className='text-s14 font-fw600 text-cBlack pl-s10 py-s25'>This is Lesson title</span>
          </div>

          <span className='ml-s40 md:py-s25'>3 hr</span>
          <span className='ml-s40 md:py-s25'>Pending</span>

          <div className='ml-s40 flex md:py-s25'>
          <div className='text-cBrandColor text-fs16 font-fw600 mr-s18'>DKK 500.00</div>
          <img className='w-19 h-s19 mt-s3' src={iEdiItIcon} alt=""/>
          </div> 
          </div>
        </div>
    )
}

export default LessonTitle
