import React, { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { editGeneralSettingsIndex, getGeneralSettingsIndex } from "../../../App/Stores/SettingsStore";
import CommonButton from "../../../Components/Button/CommonButton";
import CommonInput from "../../../Components/Input/CommonInput";
import Settings from "../Settings";
import useSettingsStore from './../../../App/Stores/SettingsStore';

const Moms = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState();

  const { generalSettingsIndex } = useSettingsStore()

  const min = 0;
  const max = 100;

  const [mpForm, setMpForm] = useState({
    moms: "",
  });
  const handleMpChange = (event) => {
    // const InputNumber = Math.max(
    //   min,
    //   Math.min(max, Number(event.target.value))
    // );
    // setValue(InputNumber);
    setValue(event.target.value);
    const name = event.target.name;
    const value = event.target.value;
    setMpForm({ ...mpForm, [name]: value });
    console.log("value", event.target.value);


  };

  useEffect(() => {
    fetchGeneralSettings()
    setValue(generalSettingsIndex?.moms_percentage)
  }, [generalSettingsIndex?.moms_percentage])

  const fetchGeneralSettings = async () => {
    await getGeneralSettingsIndex()
  }

  //console.log("generalSettingsIndex",generalSettingsIndex)

  return (
    <Settings>
      <div className="text-2xl font-bold mb-5">{t("MOMS")}</div>
      <hr className="mt-s16 mb-s8" />
      <form onSubmit={async (e) => {
        e.preventDefault()
        const data={"percentage":mpForm.moms}
        //console.log("mpForm",data)
        await editGeneralSettingsIndex(data)
        
      }}>
        <div>
          <div>
            <CommonInput
              onChange={handleMpChange}
              value={value}
              name="moms"
              label={t("Set Percentage")}
              placeholder={t("Type Percentage")}
              className2="bg-cBgInputField "
              type="number"
              required={true}
              max_number="100"
            />
          </div>
          <div className="flex flex-row justify-center pt-5">
            <CommonButton
              //colorType="primary"
              type="submit"
              btnLabel="Save"
              roundedFull="true"
              onClick={() => { }}
              colorType={mpForm?.moms ? "primary" : "basic"}
              isDisabled={mpForm?.moms ? false : true}
            />
          </div>
        </div>
      </form>
    </Settings>
  );
};

export default Moms;
