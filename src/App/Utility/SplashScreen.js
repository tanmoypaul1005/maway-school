import React, { useEffect, useState } from 'react';
import { iLogo2 } from "../../app/utility/imageImports";

export default function SplashScreen() {

    const [textBottom, setTextBottom] = useState('scale-0')
    const [loadingBarW, setLoadingBarW] = useState('w-0')
    const [logoW, setLogoW] = useState('w-0')
    const [bubbleS, setBubbleS] = useState('scale-0')
    const [bubbleOpacity, setBubbleOpacity] = useState('opacity-60')

    useEffect(() => {
        setTimeout(() => setLoadingBarW('w-[0%]'), 300);
        setTimeout(() => setLoadingBarW('w-[50%]'), 1200);
        setTimeout(() => setLoadingBarW('w-[75%]'), 1500);
        setTimeout(() => setLoadingBarW('w-[90%]'), 2100);
        setTimeout(() => setLoadingBarW('w-[100%]'), 2500);

        setTimeout(() => setLogoW('w-[50%]'), 1500);
        setTimeout(() => setLogoW('w-full'), 2100);

        setTimeout(() => setTextBottom('scale-80'), 1500);
        setTimeout(() => setTextBottom('scale-150'), 2100);


        setTimeout(() => setBubbleS('scale-150'), 2100);
        setTimeout(() => setBubbleOpacity('opacity-0'), 2100);

        return () => {
            setLoadingBarW('w-0');
            setTextBottom('scale-0');
            setLogoW('w-0');
            setBubbleS('scale-0');
            setBubbleOpacity('opacity-50');
        }
    }, [])

    return (
        <div
            className="fixed inset-0 flex items-center justify-center w-full h-full transition-opacity duration-300 bg-white"
            style={{ zIndex: "1000" }}
        >
            <div className="flex-col w-96">
                <div className='mx-16 mb-8'>
                    <div className='flex items-center justify-center'>
                        <img className={`transition-all ease-out duration-[1200ms] my-5 z-50 relative ${logoW}`} src={iLogo2} alt="limadi" />
                        <div className={`transition-all ease-out duration-[1200ms] bg-cBrand absolute rounded-full w-[30vw] h-[30vw] ${bubbleS} ${bubbleOpacity}`}></div>
                    </div>
                </div>

                <div className="relative z-50 h-1 max-w-xl overflow-hidden rounded-full">
                    <div className="absolute w-full h-full bg-gray-200"></div>
                    <div id="bar" className={`transition-all ease-out duration-1000 h-full bg-cBrand relative ${loadingBarW}`}></div>
                </div>

                {/* <div className={`pt-10 text-3xl text-center w-full text-cBrand font-bold transition-all ease-out duration-[1200ms] ${textBottom}`}>
                    CUSTOMER
                </div> */}

            </div>
        </div>
    )
}