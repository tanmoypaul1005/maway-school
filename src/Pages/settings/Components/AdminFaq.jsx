import React from "react";
import { useEffect } from "react";
import useSettingsStore, { getFaList } from "../../../App/Stores/SettingsStore";
import { iAddItem } from "../../../App/Utility/source";
import CommonButton from "../../../Components/Button/CommonButton";
import Settings from "../Settings";
import FaqList from "./FaqList";

const AdminFaq = () => {

  const { setShowAddFaqModal, faqListAll } = useSettingsStore();


  useEffect(() => {
    fetchCategoryData()
  }, []);

  const fetchCategoryData = async () => {
    await getFaList();
  }

  return (
    <Settings>
      <div className="flex justify-between items-center mb-s23">

        <div>
          <h1 className="font-semibold text-fs18">
            Frequently Asked Questions(FAQ)
          </h1>
        </div>

          <div className="flex gap-3">
          <div>
            <CommonButton
              colorType="primary"
              btnLabel="Add FAQ"
              roundedFull="true"
              onClick={() => {
                setShowAddFaqModal(true);
              }}
              icon={
                <div className="mr-s5">
                  <img className="w-s20 h-s15" src={iAddItem} alt="" />
                </div>
              }
            />
          </div>
        </div>

      </div>
      <hr className="my-s15" />
      {
        faqListAll?.data?.length > 0 ? (
          faqListAll?.data?.map((item, index) => (
            <FaqList data={item} key={index} />
          ))
        ) : <span className="my-s20">No FAQ Found</span>
      }
    </Settings>
  );
};

export default AdminFaq;
