import React from 'react'
import CommonEmptyStatus from '../../../../Components/CommonEmptyStatus/CommonEmptyStatus';
import { iDrivingCard, iExternalCard, iSchoolClassroomLesson } from '../../../../App/Utility/source';
import useSchoolCategoryStore, { getSchoolCategoryLessonShow } from '../../../../App/Stores/school/schoolCategoryStore';
import { Tooltip } from '@mui/material';
import { valueCheck } from '../../../../Utility/UtilityFunctions';

const SchoolCategoryListLessonTableRow = ({ data, index }) => {

  const { setShowEditCategoryListLessonModal } = useSchoolCategoryStore();

  return (
    <>
      <tr onClick={async () => {
        await getSchoolCategoryLessonShow(data?.id);
        setShowEditCategoryListLessonModal(true)
      }}
        className={`border-b cursor-pointer border-collapse border-cNmSelect`} >
        <th className='font-normal py-s10 border-r m-2 text-center'>
          <span className='mr-s12 dm:mrs12 md:mr-0'>{index}</span>
        </th>

        <td className='border-r-[1px] text-center p-s10 min-w-[200px] max-w-[200px] truncate'>
          <div className='flex items-center sm:flex-col md:flex-row'>
            <div className='min-w-[40px] max-w-[40px]'>
              <img className='w-s38 h-s38 grow-0'
                src={data?.lesson_type === 'driving' && iDrivingCard || data?.lesson_type === 'external' && iExternalCard || data?.lesson_type === 'classroom' && iSchoolClassroomLesson} alt="" />
            </div>
            <div className='capitalize items-center ml-s8 body_text text-cGray truncate' >
              {data?.lesson_name ?
                <Tooltip title={data?.lesson_name}>
                  <span className='truncate'>{valueCheck(data?.lesson_name)} </span>
                </Tooltip>
                : <CommonEmptyStatus />}
            </div>
          </div>
        </td>

        <td className='p-s10 border-r-[1px] text-center max-w-[100px] min-w-[100px] body_text text-cGray'>
          {data?.duration_title ? data?.duration_title : <CommonEmptyStatus />}
        </td>

        <td className='p-s10 border-r-[1px] text-center body_text text-cGray max-w-[100px] min-w-[100px]'>
          {data?.is_mandatory ? 'Yes' : 'No'}
        </td>

        <td className='p-s10 border-r-[1px] text-center max-w-[100px] min-w-[100px] body_text text-cGray'>
          {data?.price ? `DKK ${data?.price?.toLocaleString("da-DK")}` : <CommonEmptyStatus />}
        </td>

      </tr>
    </>
  )
}

export default SchoolCategoryListLessonTableRow;