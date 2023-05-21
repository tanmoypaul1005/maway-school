import React from 'react';
import { NavLink } from 'react-router-dom';
import CommonCard from '../../Card/CommonCard';

const InstructorAdditionalInfo = () => {
    return (
        <>
        <div className="py-s20 px-1">
        <hr />
        </div>

        <span className='text-fs14 font-fw600 py-s20 text-cBlack'>Aditional Informations</span>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-5 px-0 pt-s20">
          <CommonCard title={'Schools'} note={'550 Students, 5 Inactive'} />
          <CommonCard title={'Invoices'} note={'5 Invoices'} />
          <CommonCard title={'Upcoming'}  note={'5 lessons'} />
          <CommonCard title={'Driving'} note={'2 Pending'} />
          <CommonCard title={'Classroom'} note={'5 Pending'} />
          <CommonCard title={'External'}  note={'5 Pending'} />
          <NavLink to="/license/history"><CommonCard title={'License History'} note={'3 License'} /></NavLink>
        </div>
        </>
    );
};

export default InstructorAdditionalInfo;