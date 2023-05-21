import React from "react";
import EditIcon from "../../Images/icon/edit.svg";
import DeleteIcon from "../../Images/icon/delete-red.svg";
// import GiftCard1 from "../../Images/dummy-img/giftcard1.jpeg";
import { useNavigate } from "react-router-dom";
import useGiftCardStore, {
  getCardOrderList,
  getGiftCardsDetails,
} from "../../App/Stores/GiftCardStore";
import { BaseUrlSrc } from "../../App/Utility/Url";
import { useTranslation } from "react-i18next";

export default function Card({ data }) {
  const { t } = useTranslation();

  const {
    setShowDeleteModal,
    setShowEditModal,
    setSelectedCardID,
    setGiftCardDelBody,
  } = useGiftCardStore();

  const HandleOnclick = async () => {
    setSelectedCardID(data?.id);
    localStorage.setItem("cardID", data?.id);

    // blue: api calls
    await getGiftCardsDetails(data?.id);
    let orderListSuccess = await getCardOrderList("all orders", "", data.id);
    if (orderListSuccess) {
      navigateTo("/gift-card-details");
    }
  };

  const navigateTo = useNavigate();

  return (
    <>
      <div className="w-full bg-cWhite p-s12 rounded-br10 shadow-sm cursor-pointer ring-[1px] ring-cNmSelect">
        <img
          onClick={() => HandleOnclick()}
          className="w-full h-s130 object-cover rounded-br10 mx-auto ring-[1px] ring-cNmSelect"
          src={data?.image ? BaseUrlSrc + "/" + data?.image : ""}
          alt="card-cover-icon"
        />

        <div className="mt-s10">
          <h1 onClick={() => HandleOnclick()} className="text-s20 font-fw600">
            {data?.name ? data?.name : "Card Name"}
          </h1>
          <div className="flex items-center justify-between">
            <h3 onClick={() => HandleOnclick()} className="text-s16 font-fw500">
              {t("Price")} {data?.price ? data?.price : "Price"}
            </h3>
            <div className="flex items-center space-x-3">
              <button
                onClick={async () => {
                  await getGiftCardsDetails(data?.id);
                  setShowEditModal(true);
                }}
              >
                <img src={EditIcon} alt="edit-icon" />
              </button>
              <button
                onClick={() => {
                  console.log("id and shop id:::", data?.id, data?.shop_id);
                  setGiftCardDelBody({ id: data?.id, shop_id: data?.shop_id });
                  setShowDeleteModal(true);
                }}
              >
                <img src={DeleteIcon} alt="delete-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
