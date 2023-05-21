import React from 'react';
import { iCategory } from '../../App/Utility/source';
import { toHoursAndMinutes } from '../../App/Utility/UtilityFunctions';
import Image from '../Image/Image';

const CommonCategoryDetails = ({
    categoryName,
    totalLesson,
    lessonDuration,
    categoriesImage
}) => {

    //console.log("data?.categories_info?.length", data)

    return (
        <div>
            <div className='flex justify-between'>
                <div className='flex'>
                    <div className='rounded-full w-s88 h-s88 py-s12 pl-s12 pr-s10 bg-cBackgroundAndCategory'>
                        <Image className='h-s55 w-s65' src={categoriesImage} dummyImage={iCategory} isCategoryImage={true} />
                    </div>
                    <div className='ml-s14'>
                        <div className='text-cHighlighted text-fs20 font-fw600'>
                            {categoryName}</div>
                        <div className='text-cTextGray text-fs16 font-fw400 mt-s3'>
                            Lesson: {totalLesson}</div>
                        <div className='text-cTextGray text-fs16 font-fw400'>
                            {
                                typeof lessonDuration === 'string' || lessonDuration instanceof String ? <>{lessonDuration}</>
                                    : toHoursAndMinutes(lessonDuration)
                            }
                        </div>
                    </div>
                </div>

                <div className='flex mt-s40'>

                    {/* todo: after api available */}
                    {/* <img className='cursor-pointer w-s25 h-s25 ml-s25 mr-s6' src={iEdiItIcon} alt="" /> */}
                </div>
            </div>
        </div>
    );
};

export default CommonCategoryDetails;