import React, { useState } from "react";
import { iProfile } from "../../../App/Utility/source";
import useCategoryStore from './../../../App/Stores/CategoryStore';
import GreenSwitch from './../../Switch/GreenSwitch';
import { iEdiItIcon } from './../../../App/Utility/source';

const InstructorProfile = () => {

    const { setShowInstructorEditModal } = useCategoryStore();

    const [enabled, setEnabled] = useState(true)

    return (
        <>
            <div className="bg-cBackgroundAndCategory rounded-br10 py-s20 px-s20 h-s200 md:h-s330 flex justify-between">
                <div>
                    <div className="flex">
                        <div className="">
                            <img className="w-s88 h-s88 rounded-full mb-s18" src={iProfile} alt="" />
                            <div className="ml-s22">
                                <GreenSwitch enabled={enabled} setEnabled={setEnabled} />
                                <div className={`${enabled ? 'text-cPassed' : 'text-cFailed'} mt-s5 text-fs14 font-fw400`}>{enabled ? 'Active' : 'Deactivate'} </div>
                            </div>
                        </div>

                        <div className="ml-s15 mt-25 ">

                            <div className="font-fw600 text-fs24 text-cHighlighted mb-s2 leading-9">Maruf Mawla</div>
                            <div className="font-fw500 text-fs12 text-cImportantText leading-3 mb-s6">drivingschool@gmail.com</div>
                            <div className="font-fw500 text-fs12 text-cImportantText leading-3 pb-s6">+44 000 000000</div>
                            <div className="font-fw500 text-fs12 text-cImportantText leading-3 mb-s6">joined:5 jun 2022</div>
                        </div>

                    </div>
                </div>
                <div><img className="cursor-pointer" onClick={() => { setShowInstructorEditModal(true) }} src={iEdiItIcon} alt=""></img></div>
            </div>
        </>
    );
};

export default InstructorProfile;
