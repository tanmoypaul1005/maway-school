/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import useSchoolStore from '../../App/Stores/SchoolStore';
import { iExpertiseArea1Gray, iExpertiseArea2, iExpertiseArea3Gray } from '../../App/Utility/source';
import { iExpertiseArea1, iExpertiseArea3, iExpertiseArea2Gray } from './../../App/Utility/source';

const InstructorCard = ({
  data,
  click = false,
  width = "w-s170"
}) => {

  const [ExpertiseArea1, setExpertiseArea1] = useState(true)
  const [ExpertiseArea2, setExpertiseArea2] = useState(false)
  const [ExpertiseArea3, setExpertiseArea3] = useState(false)

  const {
    schoolInstructorAppliedCategoriesValue,
    schoolInstructorAppliedCategories,
    setSchoolInstructorAppliedCategoriesValue
  }
    = useSchoolStore();

  let valueData = schoolInstructorAppliedCategories.map(item => {
    return {
      "school_category_id": item?.id, "classroom": 0, "driving": 0,
      "external": 0
    }
  })

  useEffect(() => {
    setSchoolInstructorAppliedCategoriesValue(valueData)
    if (data) {
      setExpertiseArea1(data?.classroom);
      setExpertiseArea2(data?.driving);
      setExpertiseArea3(data?.external);
    }
  }, [data])

  return (
    <>
      {data ? <div className={`${width} h-s115 border-2 border-cChipBorder mb-s20 rounded-br10`}>
        <div className='p-s10'>
          <div className="flex justify-center mb-s10">
            {/* <img className='w-s26 h-s26 mt-s3' src={iBike} alt=""></img> */}
            <span className='flex items-center truncate  sub_title text-cBlack'>
              {data?.category_name ? data?.category_name : data?.category?.name}
            </span>
          </div>

          {click ?
            <div className='flex justify-between'>
              <img
                onClick={() => {
                  setExpertiseArea1(!ExpertiseArea1)
                  schoolInstructorAppliedCategoriesValue.map(item => {
                    if (item?.school_category_id === data?.id) {
                      item.classroom = item.classroom === 1 ? 0 : 1
                    }
                  })
                }}
                className='mr-s6 w-s45 h-s45'
                src={ExpertiseArea1 ? iExpertiseArea1 : iExpertiseArea1Gray}
                alt=""
              />
              <img
                onClick={() => {
                  setExpertiseArea2(!ExpertiseArea2)
                  schoolInstructorAppliedCategoriesValue.map(item => {
                    if (item?.school_category_id === data?.id) {
                      item.driving = item.driving === 1 ? 0 : 1
                    }
                  })
                }}
                className='mr-s6 w-s45 h-s45'
                src={ExpertiseArea2 ? iExpertiseArea2 : iExpertiseArea2Gray}
                alt=""
              />
              <img
                onClick={() => {
                  setExpertiseArea3(!ExpertiseArea3)
                  schoolInstructorAppliedCategoriesValue.map(item => {
                    if (item?.school_category_id === data?.id) {
                      item.external = item.external === 1 ? 0 : 1
                    }
                  })
                }}
                className='mr-s6 w-s45 h-s45'
                src={ExpertiseArea3 ? iExpertiseArea3 : iExpertiseArea3Gray}
                alt=""
              />
            </div>
            :
            <div className='flex justify-between'>
              <img
                className='mr-s6 w-s45 h-s45'
                src={ExpertiseArea1 ? iExpertiseArea1 : iExpertiseArea1Gray}
                alt=""
              />
              <img
                className='mr-s6 w-s45 h-s45'
                src={ExpertiseArea2 ? iExpertiseArea2 : iExpertiseArea2Gray}
                alt=""
              />
              <img
                className='mr-s6 w-s45 h-s45'
                src={ExpertiseArea3 ? iExpertiseArea3 : iExpertiseArea3Gray}
                alt=""
              />
            </div>
          }

        </div>
      </div> : ''}
    </>
  );
};

export default InstructorCard;