import React from 'react'
import CommonButton from '../Button/CommonButton'
import CamIcon from "../../Images/icon/cam.svg";

const InputBox = ({isImage, content}) => {
  
  
  return (
    <>        
        <div className='w-full'>
            {isImage && (                
                <div className='w-16 h-16 rounded-full bg-cNmSelect flex justify-center items-center mb-5 mt-5 mx-auto'>
                    <img src={CamIcon} alt="camera-icon" />
                </div>
            )}
            {content}
        </div>
        <CommonButton width={'mx-auto'} btnLabel="Save" colorType="primary"/>
    </>
  )
}

export default InputBox