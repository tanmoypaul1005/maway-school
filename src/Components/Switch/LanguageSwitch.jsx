import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import useAuthStore from '../../App/Stores/authStore';
import { changeLanguage } from '../../App/Stores/SettingsStore';

const LanguageSwitch = () => {
    const { isLoggedIn } = useAuthStore();

    // is_on = JP
    const [is_on, setIsOn] = useState(false);
    let currentLang = localStorage.getItem("i18nextLng");

    const LanguageOnChange = (lang) => {
        if (isLoggedIn) changeLanguage(lang);
        i18next.changeLanguage(lang);
    }

    const Toggle = () => {
        setIsOn(!is_on);
        if (currentLang === "en" || currentLang === 'en-GB') LanguageOnChange("ja");
        else LanguageOnChange("en");
    }

    useEffect(() => {
        console.log("currentLang", currentLang);
        if (currentLang === "en" || currentLang === 'en-GB') setIsOn(false);
        else setIsOn(true);
    }, [currentLang])

    return (
        <div onClick={Toggle} className="relative cp select-none font-archivo text-md">
            <div className="flex justify-between items-center px-2 w-[4.5rem] h-7 bg-gray-200 rounded-md">
                <div>EN</div>
                <div>JP</div>
            </div>
            <div className={`${is_on ? 'translate-x-full' : 'translate-x-0'} absolute-start transition ease-in flex justify-between items-center px-2 w-[4.5rem] h-7 bg-[#323232] text-white rounded-md`} style={{ width: `50%` }}>
                <div>{is_on ? 'JP' : 'EN'}</div>
            </div>
        </div>
    );
}

export default LanguageSwitch;