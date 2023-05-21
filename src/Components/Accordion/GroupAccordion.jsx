import React, { useEffect, useState } from 'react'
import { DownArrowPlaceholder } from '../Utility/ImageImports';

export default function GroupAccordion({
    accordion_type = "independent",
    customOnClick,
    className = "",
    classNameHeader = "",
    isInitOpen = false,
    setForceOpenClose,
    header = "",
    headerIconsArea,
    body = "",
    footer,
}) {
    // ! isInitOpen = "Decides whether SidebarAccordion should be opened initially"
    // ! accordion_type = independent --> can open multiple accordion at a time
    // ! accordion_type = dependent --> can open only one accordion at a time

    const [isOpen, setIsOpen] = useState(isInitOpen);

    useEffect(() => {
        if (accordion_type === "dependent") {
            // ! If accordion_type is dependent --> control accordion with isInitOpen prop
            setIsOpen(isInitOpen);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInitOpen]);

    const onClick = () => {
        setIsOpen(!isOpen);
        customOnClick && customOnClick();
    };

    useEffect(() => {
        if (setForceOpenClose) {
            console.log("OPEN ? CLOSE ::: ", setForceOpenClose);
        }
    }, [setForceOpenClose])

    return (
        <div className={`bg-white z-40 text-fs16 border text-cMainBlack border-cNmSelect rounded-br10 ${className}`}>
            <div className={`flex justify-between items-center w-full cursor-pointer ${isOpen ? "border-b" : "border-0"} font-fw600`} >
                <div onClick={onClick} className='z-40 p-5 w-full'>
                    {header}
                </div>

                <div className='flex items-center justify-end'>
                    {headerIconsArea ?
                        <div className='mr-s15'>
                            {headerIconsArea}
                        </div>
                        : ""
                    }
                    <div onClick={onClick} className="w-s15 mr-s15">
                        <img
                            src={DownArrowPlaceholder}
                            alt="down-arrow-placeholder"
                            className={`${isOpen ? "rotate-180 transform" : ""} h-s15 w-s15 mr-5  transition-transform duration-300`}
                        />
                    </div>
                </div>
            </div>
            <div className={`overflow-y-auto transition-all duration-500 ${!isOpen ? "max-h-0" : "max-h-[20vh] py-s10"} px-5`}>
                {body}
            </div>
            {footer && isOpen ? <>
                <div className="w-full bg-cNmSelect h-[1px]"></div>
                <div className=''>
                    {footer}
                </div>
            </> : ""}
        </div>
    );
};