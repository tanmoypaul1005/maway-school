import React from "react";
import { DownArrowPurple, DownArrowPlaceholder } from "../Utility/ImageImports";

export default function DropDownBtn({
  btnLabel = "something...",
  isBtnActive = false,
  fullRounded = false,
  onClick,  
  fullWidth = false,
  basicColor = false,
  dangerColor = false,
  pendingColor = false,
  successColor = false,
  placeholderShow = false,
  width = "w-w200",
}) {
  return (
    <div
      onClick={onClick}
      className={` flex justify-between items-center 
      ${fullWidth === true ? "w-full" : width
        } px-5 h-s36 bg-white capitalize text-fs14 ring-1       
      ${fullRounded ? "rounded-full" : "rounded-br5"}
      
      ${placeholderShow === true
          ? "text-cInputPlaceholder font-fw400"
          : "font-fw600"
        } 
      ${basicColor === true
          ? "ring-cNmSelect text-cMainBlack"
          : "ring-cBrand text-cBrand "
        } 
      ${!dangerColor === true
          ? "ring-cNmSelect text-cMainBlack"
          : "ring-cRed text-cRed "
        } 
      ${!pendingColor === true
          ? "ring-cNmSelect text-cMainBlack"
          : "ring-cPending text-cPending "
        } 
      ${!successColor === true
          ? "ring-cNmSelect text-cMainBlack"
          : "ring-cSuccess text-cSuccess "
        } 

      `}
    >
      <div className="max-w-[150px] truncate">{btnLabel}</div>
      <div>
        <img
          src={basicColor === true ? DownArrowPlaceholder : DownArrowPurple}
          alt="down-arrow-purple"
          className={`${isBtnActive === true ? "rotate-180" : "rotate-0"
            } transition duration-300`}
        />
      </div>
    </div>
  );
}
