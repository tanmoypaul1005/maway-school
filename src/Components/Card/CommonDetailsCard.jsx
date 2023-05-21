// import { Switch } from "@mui/material";
import React from "react";
import CommonButton from "../Button/CommonButton";
import CommonButtonOutlined from "../Button/CommonButtonOutlined";
// import FiveStarRating from "../FiveStarRating";
import {
  EmailIconGray,
  LocationIconGray,
  PhoneIconGray,
} from "../Utility/ImageImports";

export default function CommonDetailsCard({
  mainImage,
  name = "Lorem ipsome",
  shopCode = "45sd2f5",
  email,
  phone,
  address,
  ratingAvg,
  totalReview,
  isActive = false,
  onDelete,
  onEdit,
  onDeactivate,
  isCustomer = false,
  styleClass,
}) {
  return (
    <div
      className={`flex items-center justify-between w-full relative ${styleClass}`}
    >
      <div className="flex items-center">
        {/* left part */}
        <div>
          <img
            src={mainImage}
            alt="main-img"
            className="w-s160 h-s160 object-cover rounded-full hover:rounded-br5 hover:drop-shadow-lg duration-500 transition-all"
          />
          {isActive ? (
            <div className="test-fs14 flex justify-center pt-5 text-cSuccess">
              Active
            </div>
          ) : (
            <div className="test-fs14 flex justify-center pt-5 text-cRed">
              Deactivated
            </div>
          )}
        </div>

        {/* mid part */}
        <div className="pl-s80">
          {!isCustomer ? (
            <>
              <div className="flex items-center">
                <div className="pr-5 text-[20px] font-bold">{name}</div>
                {/* <div className="text-cSuccess text-fs14 rounded-full ring-cSuccess ring-1 px-3">
                  {shopCode}
                </div> */}
              </div>

              <div className="flex items-center pt-5 text-cTextShopDetails">
                <div className="pr-[7px]">
                  <img src={EmailIconGray} alt="email" />
                </div>
                <div className="opacity-70 text-fs16 font-medium">{email}</div>
              </div>

              <div className="flex items-center pt-5 text-cTextShopDetails">
                <div className="pr-[7px]">
                  <img src={PhoneIconGray} alt="phone" />
                </div>
                <div className="opacity-70 text-fs16 font-medium">{phone}</div>
              </div>

              <div className="flex items-center pt-5 text-cTextShopDetails">
                <div className="pr-[7px]">
                  <img src={LocationIconGray} alt="location" />
                </div>
                <div className="opacity-70 text-fs16 font-medium">
                  {address}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center text-fs16 font-fw500">
                <div className="text-cIconColor pr-s5">Name:</div>
                <div>{name}</div>
              </div>

              <div className="flex items-center text-fs14 font-fw500 py-5">
                <div className="text-cIconColor pr-s5">Email:</div>
                <div>{email}</div>
              </div>

              <div className="flex items-center text-fs14 font-fw500">
                <div className="text-cIconColor pr-s5">Phone:</div>
                <div>{phone}</div>
              </div>
              {isCustomer ?
                <div className="flex items-center pt-5 text-fs14 font-fw500">
                  <div className="text-cIconColor pr-s5">Address:</div>
                  <div>{address}</div>
                </div> : ""}
            </>
          )}
        </div>
      </div>

      {/* right part */}
      {/*
      <div className="absolute top-0 right-0 pr-s20">
         {isCustomer ? (
          <MuiCustomSwitch checked={isActive} onClick={onDeactivate} color="secondary" />
        ) : (
          ""
        )} 
      </div>
        */}
      <div className={`absolute bottom-0 right-0 ${isCustomer ? "pb-5 pr-5" : "pb-0 pr-0"}`}>
        <div className="flex items-center">
          <CommonButtonOutlined
            colorType="danger"
            btnLabel="delete"
            onClick={onDelete}
          />
          <div className="pl-s30"></div>
          <CommonButton btnLabel="edit" onClick={onEdit} />
        </div>
      </div>
    </div>
  );
}
