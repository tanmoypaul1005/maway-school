import React from 'react';
import { iEdiItIcon } from '../../../App/Utility/source';
import Carousel from 'react-grid-carousel'
import InstructorCard from '../../Card/InstructorCard';

const InstructorExpertiseArea = ({
    data,
    edit = true,
    title,
    editModal
}) => {

    // dotColorActive ="#795548" dotColorInactive='#ccc'
    //console.log("data",data)
    return (
        <>
            {data?.length > 0 ?
                <div>
                    <div className='flex justify-between mt-s20 md:mt-0'>
                        <span className='text-fs14 font-fw600 py-s20 text-cBlack'>{title}</span>
                        {edit && <img
                            className="cursor-pointer"
                            onClick={() => {
                                editModal();
                            }}
                            src={iEdiItIcon} alt="">
                        </img>}
                    </div>
                    <div className=''>
                        <Carousel dotColorActive="#2257AA" cols={4} rows={1} gap={11} loop
                            responsiveLayout={[
                                {
                                    breakpoint: 1400,
                                    cols: 5
                                },
                                {
                                    breakpoint: 1200,
                                    cols: 3
                                },
                                {
                                    breakpoint: 1100,
                                    cols: 3
                                },
                                {
                                    breakpoint: 990,
                                    cols: 2
                                },
                                {
                                    breakpoint: 400,
                                    cols: 1
                                }
                            ]}
                            mobileBreakpoint={670}
                        >
                            {
                                data?.map((item, index) => (
                                    <Carousel.Item>
                                        <InstructorCard data={item} index={index} key={index} />
                                    </Carousel.Item>
                                ))
                            }
                        </Carousel>
                    </div>
                </div> : ''}
        </>
    );
};

export default InstructorExpertiseArea;