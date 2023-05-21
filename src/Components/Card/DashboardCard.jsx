import React from "react";
import { useState } from "react";

const DashboardCard = ({ title, number, onClick, note }) => {
  const [color, setColor] = useState("text-cHighlighted");
  const [color2, setColor2] = useState("text-cImportantText");
  return (
    <div
      onClick={onClick}
      onMouseOver={() => {
        setColor("text-cLessImportant");
        setColor2("text-cLessImportant");
      }}
      onMouseOut={() => {
        setColor("text-cHighlighted");
        setColor2("text-cImportantText");
      }}
      className="flex relative flex-col justify-center items-center h-40 bg-white border cursor-pointer shadow-cShopItem border-cChipBorder rounded-br10 hover:bg-cBrandColor hover:border-cBrandColor lg:h-44"
    >
      {title && number ? <div className=""></div> : ""}
      <div className={`text-fs40 font-fw600 py-s15 ${color}`}>{number}</div>
      {/* {number && ( */}
      {/* )} */}
      {title && (
        <div
          className={`text-fs16 ${note && "h-12"} h-h24 font-fw600  ${color2}`}
        >
          {title}
        </div>
      )}
      {note && (
        <div className={`text-fs12 h-h12 font-fw400 ${color2}`}>{note}</div>
      )}
    </div>
  );
};

export default DashboardCard;
// sm:h-36 w-44 lg:w-60
