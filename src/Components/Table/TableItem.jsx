import React, { useState } from "react";
import DeleteIcon from "../../Images/icon/delete-red.svg";
import EditIcon from "../../Images/icon/Edit.png";
import DummyImage from "../../Images/dummy-img/alpaca.jpg";
import useStore from "../../App/CustomerStore";
import { MuiCustomSwitch } from "../../App/Stores/UtilityStore";
import CommonEmptyStatus from "../CommonEmptyStatus/CommonEmptyStatus";

// import { BaseUrlSrc } from "../../Utility/url";
// import UpdateTableItem2 from "./UpdateTableItem2";

export default function TableItem({ data = {} }) {
  const [setShowModal] = useState(false);
  const bears = useStore((state) => state.bears);

  return (
    <>
      <tr className="bg-cWhite border-b hover:bg-cSelectedBar">
        <th
          scope="row"
          className="px-s24 py-s16 font-fw500 text-cModalDropBg whitespace-nowrap flex items-center space-x-3"
        >
          <img
            className="w-s24 h-s24 rounded-full"
            alt="logo"
            src={DummyImage}
          // src={BaseUrlSrc + data?.image}
          />
          <span>{data?.name ? data?.name : <CommonEmptyStatus />}</span>
          <h1>{bears} around here ...</h1>
        </th>
        <td className="px-s24 py-s16">
          {data?.license_name ? data?.license_name :  <CommonEmptyStatus />}
        </td>
        <td className="px-s24 py-s16">
          {data?.license_start ? data?.license_start :  <CommonEmptyStatus />}
        </td>
        <td className="px-s24 py-s16">
          {data?.license_end ? data?.license_end :  <CommonEmptyStatus />}
        </td>
        <td className="px-s24 py-s16">
          <span className="text-cPrimary">NA</span>
        </td>
        <td className="px-s24 py-s16">
          <div className="flex space-x-3 items-center justify-end">
            <button
              onClick={() => {
                setShowModal(true);
              }}
            >
              <img src={EditIcon} alt="edit" />
            </button>

            <button
              onClick={() => {
                setShowModal(true);
              }}
            >
              <img src={DeleteIcon} alt="delete" className="w-s17 h-s17" />
            </button>

            <MuiCustomSwitch
              color="secondary"
              // checked={checked}
              onChange={(e) => console.log(e.target.checked)}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
        </td>
      </tr>

      {/* modal */}
      {/* <UpdateTableItem2 showModal={showModal} setShowModal={setShowModal} /> */}
    </>
  );
}